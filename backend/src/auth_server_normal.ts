// VERIFIED

import express from "express";
import router from "./Routes/router-normal_api";
import cors from "cors";
import { log_in_normal, create_normal_user } from "./handlers/user";
import {
  create_access_normal,
  protect_normal_api_route as protectRoute,
} from "./modules/auth";
import { body } from "express-validator";
import { handleError } from "./modules/middleware";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.post(
  "/server-normal/normal-login",
  body("email").isEmail(),
  body("password").isString().isLength({ min: 8 }),
  handleError,
  log_in_normal,
);

app.post(
    "/server-normal/normal-signup",
(req, res, next) => {
    next();
},

  body("email").isEmail(),
  body("firstName").isString().isLength({ min: 1 }),
  body("lastName").isString().isLength({ min: 1 }),
  body("password").isString().isLength({ min: 8 }),
  handleError,
  create_normal_user,
);

app.get("/server-normal/normal-token", create_access_normal);

app.use("/server-normal/normal-api", protectRoute, router);

export default app;
