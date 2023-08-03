import express from "express";
import cors from "cors";
import morgan from "morgan";
import { getProduct, getProducts } from "./handlers/products";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/server/data", getProducts);
app.get("/server/data/:id", getProduct);

export default app;
