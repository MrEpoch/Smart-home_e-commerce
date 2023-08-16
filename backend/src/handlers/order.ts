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


async function mapOverOrders(orders: any) {
    const ordersWithProducts = await Promise.all(
        orders.map(async (order: any) => {
            const product = await prisma.product.findUnique({
                where: {
                    id: order.id,
                },
            });
            return product;
        }),
    );
    return ordersWithProducts;
}


export const createOrder = async (
    req: any,
    res: Response,
    next: NextFunction,
) => {
    try {
    const orders_client = req.body.order;
    const items_count = orders_client.length;
    console.log(orders_client);
    console.log(req.body.order);
    const pure_product = await mapOverOrders(orders_client);
    const orders = orders_client.map((item: any) => {
        const product = pure_product.find((product: any) => product.id === item.id);
        if (!product) {
            res.status(401).json({ name: "createOrderErr" });
            return;
        }
        return {
            price: product.stripeProductId,
            quantity: item.quantity,
        };
    });

    console.log(orders);

    const session = await stripe.checkout.sessions.create(
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

    const order = await prisma.order.create({
        data: {
           address: req.body.address,
           country: req.body.country,
           email: req.body.email,
           city: req.body.city,
           phone: req.body.phone,
           postalCode: req.body.postalCode,
           orderItems: {
               create: pure_product.map((item) => {
                   return {
                        Product: {
                            connect: {
                                id: item.id,
                            },
                        },
                        quantity: parseInt(req.body.order.find(
                            (orderItem: any) => orderItem.id === item.id,
                        ).quantity)
                   };
               }),
            }
        },
    });

    if (req.user) {
        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                belongsToId: req.user.id,
            },
        });
    }

        res.json({ url: session.url });
    } catch (e) {
        console.log(e);
        if (!res.headersSent) {
            res.status(401).json({ name: "createOrderErr" });
        }    
        return;
    }
    }

