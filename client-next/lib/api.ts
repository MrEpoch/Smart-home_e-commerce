'use server';
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function addToCart(product: any) {
        const check_cookie = cookies().get("cart");
        product.quantity = 1;
         if (!check_cookie) {
           cookies().set("cart", JSON.stringify([product]));
           revalidatePath("/*");
           return [product];
         } else {
             let cart = JSON.parse(check_cookie?.value);
             console.log(cart);
             const check_cart = cart.find((item: any) => item.id === product.id);
             if (check_cart) {
                 check_cart.quantity += 1;
                 cart = [...cart.filter((item: any) => item.id !== product.id), check_cart];
             } else {
                 cart.push(product);
             }    
             cookies().set("cart", JSON.stringify(cart));
             revalidatePath("/*");
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
