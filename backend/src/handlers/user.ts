import { NextFunction, Request, Response } from "express";
import prisma from "../db";
import { hashPassword, comparePasswords } from "../modules/auth";
import { create_REFRESH_JWT } from "../modules/tokens";

export const get_user = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await prisma.user.findMany({
      where: {
        id: req.body.id,
        role: "user",
      },
    });
    if (!user) {
      res.status(401).json({ message: "Invalid email" });
      return;
    }
    res.status(200).json(user);
    return;
  } catch (e) {
    e.type = "getAccount";
    next(e);
    return;
  }
};

export const get_admin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await prisma.user.findMany({
      where: {
        id: req.body.id,
        role: "admin",
      },
    });
    if (!user) {
      res.status(401).json({ message: "Invalid email" });
      return;
    }
    res.status(200).json(user);
    return;
  } catch (e) {
    e.type = "getAccount";
    next(e);
    return;
  }
};

export const create_normal_user = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const valid = await creation_check(req, res);
    if (!valid) return;
    const user = await prisma.user.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: await hashPassword(req.body.password),
      },
    });
    const token = await create_REFRESH_JWT(
      user,
      process.env.REFRESH_NORMAL_SECRET as string,
    );
    res.status(200).json({ token });
    return;
  } catch (e) {
    console.log(e);
    e.type = "signUp";
    if (!res.headersSent) {
        res.status(500).json({ message: "Internal server error", data: e });
    }
    return;
  }
};

export const create_admin_user = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const valid = await creation_check(req, res);
    if (!valid) return;
    const user = await prisma.user.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: await hashPassword(req.body.password),
        role: "admin",
      },
    });
    const token = await create_REFRESH_JWT(
      user,
      process.env.REFRESH_ADMIN_SECRET as string,
    );
    res.status(200).json({ token });
    return;
  } catch (e) {
    e.type = "signUp";
    if (!res.headersSent) {
        res.status(500).json({ message: "Internal server error", data: e });
    }
    return;
  }
};

export const log_in_normal = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await log_in_details(
      req,
      res,
      next,
      process.env.REFRESH_NORMAL_SECRET as string,
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

export const log_in_admin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
      await log_in_details(
        req,
        res,
        next,
        process.env.REFRESH_ADMIN_SECRET as string,
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

const log_in_details = async (
  req: Request,
  res: Response,
  next: NextFunction,
  salt: string,
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      res.status(401).json({ message: "Invalid email" });
      return;
    }

    const isValid = await comparePasswords(req.body.password, user.password);

    if (!isValid) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    const token = await create_REFRESH_JWT(user, salt);
    res.status(200).json({ token });
    return;
  } catch (e) {
    e.type = "signIn";
    next(e);
    return;
  }
};
const creation_check = async (
  req: Request,
  res: Response,
): Promise<boolean> => {
  try {
    const emailCheck = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (emailCheck) {
      res.status(409).json({ message: "Email already exists" });
      return false;
    }
  } catch (e) {
    e.type = "creation_check";
    res.status(500).json({ message: "Internal server error" });
    return false;
  }
  return true;
};
