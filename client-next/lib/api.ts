'use server';
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function addToCart(product: any) {
        const check_cookie = cookies().get("cart");
        product.quantity = 1;
         if (!check_cookie) {
           cookies().set("cart", JSON.stringify([product]));  
           revalidatePath("/");
           revalidatePath("/shop");
           return [product];
         } else {
             let cart = JSON.parse(check_cookie?.value);
             const check_cart = cart.find((item: any) => item.id === product.id);
             if (check_cart) {
                 check_cart.quantity += 1;
                 cart = [...cart.filter((item: any) => item.id !== product.id), check_cart];
             } else {
                 cart.push(product);
             }    
             cookies().set("cart", JSON.stringify(cart));
             revalidatePath("/");
             revalidatePath("/shop");
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

export async function getAccount() {
    const refresh_token = cookies().get("refresh_token")?.value;
    if (!refresh_token) redirect("/login");
    const access_token = await fetch("http://165.232.120.122/server-normal/normal-token", {
        headers: {
            "Authorization": `Bearer ${refresh_token}`
        },
    });
    if (!access_token.ok) redirect("/");

    const token = await access_token.json();

    const account = await fetch("http://165.232.120.122/server-normal/normal-api/account", {
        headers: {
            "Authorization": `Bearer ${token.ACCESS_TOKEN}`
        }
    });

    if (!account.ok) redirect("/");

    const data = await account.json();
    return data;
}
