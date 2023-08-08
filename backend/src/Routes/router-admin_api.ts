import { Router, Request } from "express";
import { body } from "express-validator";
import { handleError } from "../modules/middleware";
import { create_admin_user, get_admin } from "../handlers/user";
import {
  create_product,
  delete_product,
  getProduct,
  getProducts,
  update_product,
} from "../handlers/products";
import { create_upload_token } from "../modules/auth";

const router = Router();


router.get("/", getProducts);
router.get("/:id", getProduct);
router.get("/account", get_admin);

router.post("/", create_product);

router.delete("/:id", delete_product);

router.put("/:id", update_product);

router.post(
  "/signup",
  body("firstName").isString().isLength({ min: 1 }),
  body("lastName").isString().isLength({ min: 1 }),
  body("email").isEmail(),
  body("password").isString().isLength({ min: 8 }),
  handleError,
  create_admin_user,
);

router.get("/upload-token", create_upload_token); 


export default router;
