// VERIFIED

import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { getProduct, getProducts, getProductsCount, getProductsForSearch } from "./handlers/products";
import { protect_upload_api_route } from "./modules/auth";
import { upload } from "./handlers/image_upload";
import { Multer } from "multer";
import { createOrder, getOrder, getOrders } from "./handlers/order";
import { body } from "express-validator";
import { countries } from "./countries";

declare global {
    namespace Express {
        interface Request {
            file: Multer.File;
        }
    }
}
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.post("/server/data/upload-img", protect_upload_api_route, upload.single("image"), (req: Request, res: Response) => {
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
app.get("/server/data/productSearch", getProductsForSearch);

app.get("/server/data", getProducts);
app.get("/server/data/product/:id", getProduct);
app.get("/server/data/length", getProductsCount);

app.post("/server/data/payment", 
    body("email").isString().isEmail(),
    body("country").isString().isIn(countries),
    body("city").isString(),
    body("address").isString(),
    body("postalCode").isString(),
    body("phone").isString(),
    body("order").isArray()
,createOrder);
app.get("/server/data/payment", getOrders);
app.get("/server/data/payment/:id", getOrder);

export default app;
