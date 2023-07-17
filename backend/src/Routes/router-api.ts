import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { handleError } from "../modules/middleware";

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

export default router;
