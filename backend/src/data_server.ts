// VERIFIED

import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { getProduct, getProducts, getProductsCount } from "./handlers/products";
import { protect_upload_api_route } from "./modules/auth";
import { upload } from "./handlers/image_upload";
import { Multer } from "multer";

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

app.get("/server/data", getProducts);
app.get("/server/data/:id", getProduct);
app.get("/server/data/length", getProductsCount);



export default app;
