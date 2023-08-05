import { NextFunction, Response } from "express";
import { validationResult } from "express-validator";

export const handleError = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(404).json({ errors: errors.array() });
  } else {
    next();
  }
};

export const product_case_error = (err, res: Response, next: NextFunction) => {
  switch (err) {
    case err.name === "TokenExpiredError":
      res.status(401).json(err.name);
      break;
    case err.name === "JsonWebTokenError":
      res.status(401).json(err.name);
      break;
    case err.name === "ValidationError":
      break;
    case err.name === "getProductsErr":
      break;
    case err.name === "getProductErr":
      break;
    case err.name === "createProductErr":
      break;
    case err.name === "updateProductErr":
      break;
    case err.name === "deleteProductErr":
      break;
    case err.name === "getOrdersErr":
      break;
    case err.name === "getOrderErr":
      break;
    case err.name === "UnauthorizedError":
      break;
  }
    res.status(500);
    res.send({ name: "serverErr" });
};
