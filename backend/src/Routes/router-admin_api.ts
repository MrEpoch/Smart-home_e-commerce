import { Router, Request } from "express";
import { body } from "express-validator";
import { handleError } from "../modules/middleware";
import { create_admin_user, get_admin } from "../handlers/user";
import { create_product, delete_product, getProduct, getProducts, update_product } from "../handlers/products";
import multer from "multer";

const router = Router();

export const storage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    try {
      cb(null, "uploads/");
    } catch (e) {  
        console.log(e);
        return cb(new Error("Only .png, .jpg and .jpeg format allowed!"), null);
    }
  },
  filename: function (
    req: Request,
    file,
    cb: (error: Error | null, filename: string) => void,
  ) {
    try {
        console.log(file, "2");
        const file_name = file.originalname.toLowerCase().split(" ").join("-");
        cb(null, file_name);
    } catch (e) {  
        console.log(e);
        return cb(new Error("Only .png, .jpg and .jpeg format allowed!"), null);
    }
  },
});

export const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      console.log(file, "3");
      cb(null, true);
    } else {  
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router.get("/", getProducts);
router.get("/:id", getProduct);

router.get("/account", get_admin);

router.post("/", create_product);
router.post("/upload-img", upload.single("image"), (req, res, next) => {
    console.log("moved to end");
    res.status(201);
    res.json("Image uploaded successfully!");
});

router.delete("/:id", delete_product);

router.put("/:id", update_product);

router.post('/signup', 
    body('username').isString().isLength({ min: 0, max: 30}),
    body('email').isEmail(),
    body('password').isString().isLength({ min: 1 })
,handleError, create_admin_user);

export default router;
