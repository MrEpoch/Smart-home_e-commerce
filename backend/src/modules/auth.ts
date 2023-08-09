import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import prisma from "../db";
import { create_ACCESS_JWT } from "./tokens";

export const comparePasswords = async (
  password: string,
  hashedPassword: string,
) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export interface RequestWithUser extends Request {
  user: any;
}

export const protect_admin_api_route = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = bearer_check(req.headers.authorization, res);
    const user = await jwt.verify(token, process.env.ACCESS_ADMIN_SECRET);
    req.user = user;
    next();
    return;
  } catch (e) {
    if (!res.headersSent) {
        res.status(401).send(e);
    }
    console.log(e);
    return;
  }
};

export const protect_normal_api_route = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = bearer_check(req.headers.authorization, res);
    const user = await jwt.verify(token, process.env.ACCESS_NORMAL_SECRET);
    req.user = user;
    next();
    return;
  } catch (e) {
    console.log(e);
    if (!res.headersSent) {
        res.status(401).send(e);
    }
    return;
  }
};

export const protect_upload_api_route = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const token = bearer_check(req.headers.authorization, res);
        await jwt.verify(token, process.env.UPLOAD_SECRET);
        next()
        return;
    } catch (e) {
        console.log(e);
        if (!res.headersSent) {
            res.status(500).send(e);
        }
        return;
    }
};

export const create_access_admin = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
      const token = bearer_check(req.headers.authorization, res);
      await access_give(
        res,
        process.env.ACCESS_ADMIN_SECRET,
        token,
        process.env.REFRESH_ADMIN_SECRET,
      );
      return;
  } catch (e) {
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal server error", data: e });
    }
    console.log(e);
    return;
  }
};

export const create_access_normal = async (req: Request, res: Response): Promise<void> => {
  try {
      const token = bearer_check(req.headers.authorization, res);
      await access_give(
        res,
        process.env.ACCESS_NORMAL_SECRET,
        token,
        process.env.REFRESH_NORMAL_SECRET,
      );
      return;
  } catch (e) {
    if (!res.headersSent) {
        res.status(500).json({ message: "Internal server error", data: e });
    }
    console.log(e);
    return;
  }
};

export const create_upload_token = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = bearer_check(req.headers.authorization, res);
        await access_give(
            res,
            process.env.UPLOAD_SECRET,
            token,
            process.env.ACCESS_ADMIN_SECRET,
            "3h",
            false
        );
        return;
    } catch (e) {
        if (!res.headersSent) {
            res.status(500).json({ message: "Internal server error", data: e });
        }
        console.log(e);
        return;
    }
}

async function access_give(
  res: Response,
  secret: string,
  token: string,
  salt: string,
  expiration: string = "3m",
  refresh: boolean = true
): Promise<void> {
  try {
    const user = jwt.verify(token, salt);
    if (refresh) {  
        const database_check = await prisma.refresh_token.findUnique({
          where: {
            token: token,
          },
        });
        if (!database_check) {
          res.status(401).send({
            name: "NotFoundToken",
            message:
              "Token was not found but it true, which is weird, cause it means someone has salt",
          });
          return;
        } else if (!database_check.valid) {
          res.status(401).send({ name: "TokenExpiredError" });
          return;
        }
    }

    const ACCESS_TOKEN = await create_ACCESS_JWT(
      {
        id: user.id,
        email: user.email,
      },
      secret,
      expiration,
    );
    res.status(200).send({ ACCESS_TOKEN });
    return;
  } catch (e) {
    switch (e.name) {
      case "TokenExpiredError":
        res.status(401).send(e.name);
        return;
      case "JsonWebTokenError":
        res.status(401).send(e.name);
        return;
    }
    res.status(401).send({ message: "Not authorized for connection" });
    return;
  }
}
function bearer_check(bearer: string, res: Response): string {
  try {  
      if (!bearer) {
        res.status(401).send({
          name: "UnauthorizedError",
        });
        return;
      }

      const [, token] = bearer.split(" ");

      if (!token) {
        res.status(401).json({ name: "UnauthorizedError" });
        return;
      }
      return token;
  } catch (e) {
    console.log(e);
    res.status(401).json({ name: "UnauthorizedError" });
    return;
  }
}
