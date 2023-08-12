'use server';
import { cookies } from "next/headers";

export async function addToCart(product: any) {
         const check_cookie = cookies().get("cart");
         if (!check_cookie) {
           cookies().set("cart", JSON.stringify([product]));
         } else {
             const cart = JSON.parse(check_cookie?.value);
             cart.push(product);
             cookies().set("cart", JSON.stringify(cart));
             return cart;
        }
}

export async function getCart() {
    const check_cookie = cookies().get("cart");
    if (!check_cookie) {
        return [];
    } else {
        return JSON.parse(check_cookie?.value);
    }
}

export async function removeFromCart(product: any) {
    const check_cookie = cookies().get("cart");
    if (!check_cookie) {
        return [];
    } else {
        const cart = JSON.parse(check_cookie?.value);
        const newCart = cart.filter((item: any) => item.id !== product.id);
        cookies().set("cart", JSON.stringify(newCart));
        return newCart;
    }
}
