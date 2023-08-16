'use server';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCart } from "./api";

export async function LogIn(form: any): Promise<void> {
    let isError = false;
    try {
        const login_response = await fetch('http://165.232.120.122/server-normal/normal-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: form.get("email"),
                password: form.get("password")
            })
        });
        const login_data = await login_response.json();
        cookies().set({
            name: "refresh_token", 
            value: login_data.token,
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true
        })    
    } catch (e) {
        console.log(e);
        isError = true;
        return redirect("/");
    }
    return !isError && redirect("/userpage");
}

export async function SignUp(form: any): Promise<void> {
    let isError = false;
    try {
        const signup_response = await fetch('http://165.232.120.122/server-normal/normal-signup/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: form.get("firstName"),
                lastName: form.get("lastName"),
                email: form.get("email"),
                password: form.get("password")
            })
        });
        const signup_data = await signup_response.json();
        cookies().set({
            name: "refresh_token", 
            value: signup_data.token,
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true
        })
    } catch (e) {
        console.log(e);
        isError = true;
        return redirect("/");
    }
    return !isError && redirect("/userpage");
}

export async function Payment(form: any): Promise<void | string> {
    let isError = false;
    let path = "";
    try {
        const cookie = await getCart();
        console.log(cookie);
        const payment_data = await fetch('http://165.232.120.122/server/data/payment/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                country: form.get("country"),
                city: form.get("city"),
                postalCode: form.get("postalcode"),
                address: form.get("address"),
                order: cookie,
                phone: form.get("phone"),
                email: form.get("email"),
            })
        });
        const data = await payment_data.json();
        path = data.url;
    } catch (e) {
        console.log(e);
        return redirect("/");
    }

    return path;
}

