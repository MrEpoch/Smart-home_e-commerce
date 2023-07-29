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
) => {
  const token = bearer_check(req.headers.authorization, res);
  try {
    const user = await jwt.verify(token, process.env.ACCESS_ADMIN_SECRET);
    req.user = user;
    console.log("It went through");
    next();
  } catch (e) {
    res.status(401);
    res.send(e);
    return;
  }
};

export const protect_normal_api_route = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  const token = bearer_check(req.headers.authorization, res);
  try {
    const user = await jwt.verify(token, process.env.ACCESS_NORMAL_SECRET);
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    res.status(401);
    res.send(e);
    return;
  }
};

export const create_access_admin = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const token = bearer_check(req.headers.authorization, res);
  await access_give(
    res,
    process.env.ACCESS_ADMIN_SECRET,
    token,
    process.env.REFRESH_ADMIN_SECRET,
  );
  return;
};

export const create_access_normal = async (req: Request, res: Response) => {
  const token = bearer_check(req.headers.authorization, res);
  await access_give(
    res,
    process.env.ACCESS_NORMAL_SECRET,
    token,
    process.env.REFRESH_NORMAL_SECRET,
  );
  return;
};

async function access_give(
  res: Response,
  secret: string,
  token: string,
  salt: string,
): Promise<void> {
  try {
    const user = jwt.verify(token, salt);
    const database_check = await prisma.refresh_token.findUnique({
      where: {
        token: token,
      },
    });

    if (!database_check) {
      res.status(401);
      res.send({
        name: "NotFoundToken",
        message:
          "Token was not found but it true, which is weird, cause it means someone has salt",
      });
      return;
    }

    if (database_check.valid === false) {
      res.status(401);
      res.send({ name: "TokenExpiredError" });
      return;
    }

    const ACCESS_TOKEN = await create_ACCESS_JWT(
      {
        id: user.id,
        name: user.name,
      },
      secret,
    );

    res.status(200);
    res.send({ ACCESS_TOKEN });
    return;
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
function bearer_check(bearer: string, res: Response): string {
  if (!bearer) {
    res.status(401);
    res.send({
      name: "UnauthorizedError",
    });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    res.json({ name: "UnauthorizedError" });
    return;
  }
  return token;
}
