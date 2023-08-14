import { NextFunction, Response } from "express";
import prisma from "../db";
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

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

export const createOrder = async (
    req: any,
    res: Response,
    next: NextFunction,
) => {
    try {
    const items_count = req.body.order.length;
    const orders = [];
    const pure_product = [];

    for (let i = 0; i < items_count; i++) {
        const product = await prisma.product.findUnique({
            where: {
                id: req.body.order[i].id,
            },
        });
        if (!product) {
            res.status(401).json({ name: "createOrderErr" });
            return;
        }
        orders.push({
            price: product.stripeProductId,
            quantity: req.body.order[i].quantity,
        });
        pure_product.push(product);
    }

    await stripe.checkout.sessions.create(
      {
        line_items: orders,
        mode: "payment",
        success_url: "http://localhost:5173/payment/success",
        cancel_url: "http://localhost:5173/payment/cancel",
      },
      {
        apiKey: process.env.STRIPE_SECRET_KEY,
      },
    );
    
        const newArr = pure_product.map((item) => {
            return await prisma.orderItem.create({});
        });

    const order = await prisma.order.create({
        data: {
           orderItems: pure_product,
           address: req.body.address,
           city: req.body.city,
           phone: req.body.phone,
           postalCode: req.body.postalCode,
           belongsToId: req.user.id,
        },
    });
    res.json({ order });
    } catch (e) {
        console.log(e);
        if (!res.headersSent) {
            res.status(401).json({ name: "createOrderErr" });
        }    
        return;
    }
    }

