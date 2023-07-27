import { Router } from "express";
import { body } from "express-validator";
import { handleError } from "../modules/middleware";
import { create_admin_user, get_admin } from "../handlers/user";
import { create_product, delete_product, getProduct, getProducts, update_product } from "../handlers/products";
import { upload } from "../handlers/image_upload";

const router = Router();


router.get("/", getProducts);
router.get("/:id", getProduct);

router.get("/account", get_admin);

router.post("/", create_product);
router.post("/upload", upload.single("image"));

router.delete("/:id", delete_product);

router.put("/:id", update_product);

router.post('/signup', 
    body('username').isString().isLength({ min: 0, max: 30}),
    body('email').isEmail(),
    body('password').isString().isLength({ min: 1 })
,handleError, create_admin_user);

export default router;
