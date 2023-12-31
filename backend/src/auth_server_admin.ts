// VERIFIED

import express from "express";
import router from "./Routes/router-admin_api";
import cors from "cors";
import { log_in_admin } from "./handlers/user";
import {
  create_access_admin,
  protect_admin_api_route as protectRoute,
} from "./modules/auth";
import { body } from "express-validator";
import { handleError } from "./modules/middleware";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan("dev"));

app.post(
  "/server-admin/login",
  body("email").isString().isEmail(),
  body("password").isString().isLength({ min: 8 }),
  handleError,
  log_in_admin,
);

app.get("/server-admin/admin-token", create_access_admin);

app.use("/uploads", express.static("uploads"));
app.use("/server-admin/admin-api", protectRoute, router);

export default app;
