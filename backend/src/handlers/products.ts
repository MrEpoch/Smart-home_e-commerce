import { Request, Response } from "express";
import prisma from "../db";
import path from "path";
import fs from "fs";


export const allSandwiches = async (
  req: Request,
  res: Response,
) => {
  try {
    const products = await prisma.product.findMany({
        skip: req.query.skip,
        take: req.query.take,
    });
    if (products.length === 0) { 
        res.json([]);
        return;
    };
    res.json(products);
  } catch (e) {
    console.log(e);
    res.status(401);
    res.send({ name: "getProductsErr" });
    return;
  }
};

export const getSandwich = async (
  req: Request,
  res: Response,
) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: req.params.id,
      },
    });
    res.json(product);
  } catch (e) {
    console.log(e);
    res.status(401);
    res.send({ message: "getProductErr" });
    return;
  }
};

export const create_product = async (
  req: any,
  res: Response,
) => {
  try {
    const url = req.protocol + "://" + req.get("host");
    const filtered_path = req.body.image.toLowerCase().split(" ").join("-");
    
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        long_description: req.body.long_description,
        price: req.body.price,
        stripeProductId: req.body.stripeId,
        image: url + "/uploads/" + filtered_path,
      },
    });
    res.json(product);
  } catch (e) {
    console.log(e);
    res.status(401);
    res.send({ name: "createProductErr" });
    return;
  }
};

export const update_product = async (
  req: Request,
  res: Response,
) => {
  try {
    const url = req.protocol + "://" + req.get("host");
    const filtered_path = req.body.image.toLowerCase().split(" ").join("-");
    const product = await prisma.product.update({
      where: {
        id: req.params.id,
      },
      data: {
        name: req.body.name,
        description: req.body.description,
        long_description: req.body.long_description,
        price: req.body.price,
        image: url + "/uploads/" + filtered_path,
      },
    });

    fs.unlink(
        path.join(__dirname, "../../uploads/" + req.body.oldImage),
        (err) => {
            if (err) {
                console.log(err);
            }
        }
    );

    res.json(product);
  } catch (e) {
    console.log(e);
    res.status(401);
    res.send({ name: "updateProductErr"});
    return;
  }
};

export const update_product_noImage = async (
    req: Request,
    res: Response,
) => {
    try {
        const product = await prisma.product.update({
            where: {
                id: req.params.id,
            },
            data: {
                name: req.body.name,
                description: req.body.description,
                long_description: req.body.long_description,
                price: req.body.price,
            },
        });
        res.json(product);
    } catch (e) {
        console.log(e);
        res.status(401);
        res.send({ name: "updateProductErr" });
        return;
    }
};

export const delete_product = async (
  req: Request,
  res: Response,
) => {
  try {
    const product = await prisma.product.delete({
      where: {
        id: req.params.id,
      },
    });
    res.json(product);
  } catch (e) {
    console.log(e);
    res.status(401);
    res.send({ name: "deleteProductErr"});
    return;
  }
}
