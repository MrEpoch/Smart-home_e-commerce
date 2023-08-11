import { Request, Response, Router } from "express";
import { getProduct, getProducts } from "../handlers/products";
import { get_user } from "../handlers/user";

const router = Router();

router.get("/account", get_user);

export default router;
