'use server';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function LogIn(form: any): Promise<void> {
    try {
        const formData = new FormData();
        formData.append("firstName", form.firstName);
        const login_response = await fetch('http://165.232.120.122/server-normal/normal-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: form.email,
                password: form.password
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
        
        redirect("/userpage");
    } catch (e) {
        console.log(e);
    }
}

export async function SignUp(form: any): Promise<void> {
    try {
        'use server';
        const signup_response = await fetch('http://localhost:3248/server-normal/normal-signup/', {
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
        redirect("/userpage");
    } catch (e) {
        console.log(e);
    }
}
