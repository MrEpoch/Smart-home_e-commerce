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
            body: JSON.stringify(form)
        });
        const login_data = await login_response.json();
        cookies().set("refresh_token", login_data.token)
        
        redirect("/userpage");
    } catch (e) {
        console.log(e);
    }
}

export async function SignUp(form: any): Promise<void> {
    try {
        console.log(form);
        const signup_response = await fetch('http://165.232.120.122/server-normal/normal-signup/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        });
        const signup_data = await signup_response.json();
        cookies().set("refresh_token", signup_data.token)

        redirect("/userpage");
    } catch (e) {
        console.log(e);
    }
}
