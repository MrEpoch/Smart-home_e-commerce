import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import prisma from "../db";
import { create_ACCESS_JWT } from "./tokens";

export const comparePasswords = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword);
};

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
};

export const createJWT = async (user: any) => {
    const token = await jwt.sign(
        {
            id: user.id,
            username: user.username,
        },
        process.env.JWT_SECRET,
    );
    return token;
};

export interface RequestWithUser extends Request {
    user: any;
}

export const protect_admin_api_route = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const token = bearer_check(req.headers.authorization, res);
    
    try {
        const user = await jwt.verify(token, process.env.REFRESH_ADMIN_SECRET);
        req.user = user;
        next();
    } catch (e) {
        res.status(401);
        res.send(e);
        return;
    }
};

export const protect_normal_api_route = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const token = bearer_check(req.headers.authorization, res);

    try {
        const user = await jwt.verify(token, process.env.REFRESH_NORMAL_SECRET);
        req.user = user;
        next();
    } catch (e) {
        console.log(e);
        res.status(401);
        res.send(e);
        return;
    }
};

export const create_access_admin = async (req: Request, res: Response): Promise<void> => {

  const token = bearer_check(req.headers.authorization, res);
  
  await access_give(res, process.env.ACCESS_TOKEN_SECRET_ADMIN, token);
  return;
}

export const create_access_normal = async (req: Request, res: Response) => {
  const token = bearer_check(req.headers.authorization, res);

  await access_give(res, process.env.ACCESS_TOKEN_SECRET_NORMAL, token);
  return;
}

async function access_give (res: Response, secret: string, token: string): Promise<void> {
    try {
        const user = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const database_check = await prisma.refresh_token.findUnique({
          where: {
            token: token,
          },
        });

        if (!database_check) {
          res.status(401);
          res.send({ message: "Not authorized for connection" });
          return;
        }

        if (database_check.valid === false) {
          prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              banned: true,
            },
          });

          res.status(401);
          res.send({ message: "You are banned because of invalid token" });
          return;
        }

        const ACCESS_TOKEN = await create_ACCESS_JWT({
          id: user.id,
          name: user.name,
        }, secret);
        
        res.status(200);
        res.send({ ACCESS_TOKEN });
      } catch (e) {
            switch (e.name) {
                case "TokenExpiredError":
                    res.status(401);
                    res.send(e.name);
                    break;
                case "JsonWebTokenError":
                    res.status(401);
                    res.send(e.name);
                    break;
            }
            res.status(401);
            res.send({ message: "Not authorized for connection" });
            return;
        }
}
function bearer_check (bearer: string, res: Response): string {

  if (!bearer) {
    res.status(401);
    res.send({
      message: "You are not authorized to access this part of the site.",
    });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    res.json({ message: "Invalid token for connection" });
    return;
  }

  return token;
}
