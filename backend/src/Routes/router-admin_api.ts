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
import multer, { Multer } from "multer";
import path from "path";

const router = Router();

declare global {
    namespace Express {
        interface Request {
            file: Multer.File;
        }
    }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Generate a unique filename with a timestamp and the original file extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB file size limit (adjust as needed)
  },
  fileFilter: function (req, file, cb) {
    // Check if the uploaded file is an image (you can add more checks here)
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed.'));
    }
  },
});

router.get("/", getProducts);
router.get("/:id", getProduct);
router.get("/account", get_admin);

router.post("/", create_product);
router.post("/upload-img", upload.single("image"), (req, res) => {
  try {
    
    if (!req.file) {
      res.status(400).send("No file uploaded.");
      return;
    }

    res.status(200).json({ message: "image uploaded successfully" });
    return;
  } catch (error) {
      if (!res.headersSent) {
          res.status(500).json({ message: "error uploading image", data: error });
      }
      console.log(error);
      return;
  }
});

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

export default router;
