import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { handleError } from "../modules/middleware";
import { create_admin_user } from "../handlers/user";

const router = Router();

router.get("/", (req: Request , res: Response) => {
    res.send("Hello World!");
});

router.post("/", body("name").isString(), handleError, (req: Request , res: Response) => {
    res.send("Hello World!");
});

router.delete("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

router.put("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

router.post('/signup', 
    body('username').isString().isLength({ min: 0, max: 30}),
    body('email').isEmail(),
    body('password').isString().isLength({ min: 1 })
,handleError, create_admin_user);

export default router;
