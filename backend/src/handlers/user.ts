import { NextFunction, Request, Response } from "express";
import prisma from "../db";
import { createJWT, hashPassword, comparePasswords } from "../modules/auth";

export const create_normal_user = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const valid = await creation_check(req, res);
        if (!valid) return;
        const user = await prisma.user.create({
            data: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: await hashPassword(req.body.password),
            }
        });
        const token = await createJWT(user);
        res.json({ token });
    } catch (e) {
        e.type = "signUp";
        next(e);
    } 
};

export const create_admin_user = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
            }
        });
        const token = await createJWT(user);
        res.json({ token });
    } catch (e) {
        e.type = "signUp";
        next(e);
    }
};

export const signIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email,
            }
        });

        if (!user) {
            res.status(401);
            res.json({ message: "Invalid email" });
            return;
        }

        const isValid = await comparePasswords(req.body.password, user.password);

        if (!isValid) {
            res.status(401);
            res.json({ message: "Invalid password" });
            return;
        }

        const token = await createJWT(user);
        res.json({ token });
    } catch (e) {
        e.type = "signIn";
        next(e);
    }
};

const creation_check = async (req: Request, res: Response): Promise<boolean> => {
    try {
        const userCheck = await prisma.user.findUnique({
                where: {
                    username: req.body.username,
                }
            });

            const emailCheck = await prisma.user.findUnique({
                where: {
                    email: req.body.email,
                }
            });

            if (emailCheck) {
                res.status(409);
                res.json({ message: "Email already exists" });
                return false;
            } else if (userCheck) {
                res.status(409);
                res.json({ message: "Username already exists" });
                return false;
            }
    } catch (e) {
        e.type = "creation_check";
        res.status(500);
        res.json({ message: "Internal server error" });
        return false;
    }
    return true;
};

