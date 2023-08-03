import { NextFunction, Response } from "express";
import prisma from "../db";

export const getOrders = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        belongsToId: req.user.id,
      },
    });
    res.json(orders);
  } catch (e) {
    console.log(e);
    res.status(401);
    res.send({ name: "getOrdersErr" });
    return;
  }
};

export const getOrder = async (req: any, res: Response, next: NextFunction) => {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: req.params.id,
      },
    });
    res.json(order);
  } catch (e) {
    console.log(e);
    res.status(401);
    res.send({ name: "getOrderErr" });
    return;
  }
};
