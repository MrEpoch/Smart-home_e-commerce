// VERIFIED

import express from "express";
import cors from "cors";
import morgan from "morgan";
import { getProduct, getProducts, getProductsCount } from "./handlers/products";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/server/data", getProducts);
app.get("/server/data/:id", getProduct);
app.get("/server/data/length", getProductsCount);

export default app;
