import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";

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
    const bearer = req.headers.authorization;
    
    if (!bearer) {
        res.status(401);
        res.send({ message: "You are not authorized to access this part of the site."});
        return;
    }

    const [, token] = bearer.split(" ");

    if (!token) {
        res.status(401);
        res.json({ message: "Invalid token for connection"});
        return;
    }

    try {
        const user = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (e) {
        console.log(e);
        res.status(401);
        res.send({ message: "Not authorized for connection" });
        return;
    }
};

export const protect_normal_api_route = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;
    
    if (!bearer) {
        res.status(401);
        res.send({ message: "You are not authorized to access this part of the site."});
        return;
    }

    const [, token] = bearer.split(" ");

    if (!token) {
        res.status(401);
        res.json({ message: "Invalid token for connection"});
        return;
    }

    try {
        const user = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (e) {
        console.log(e);
        res.status(401);
        res.send({ message: "Not authorized for connection" });
        return;
    }
};

export const protect_data_route = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;
    
    if (!bearer) {
        res.status(401);
        res.send({ message: "You are not authorized to access this part of the site."});
        return;
    }

    const [, token] = bearer.split(" ");

    if (!token) {
        res.status(401);
        res.json({ message: "Invalid token for connection"});
        return;
    }

    try {
        const user = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (e) {
        console.log(e);
        res.status(401);
        res.send({ message: "Not authorized for connection" });
        return;
    }
};

