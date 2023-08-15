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
        
        return redirect("/userpage");
    } catch (e) {
        console.log(e);
        return redirect("/");
    }
}

export async function SignUp(form: any): Promise<void> {
    try {
        'use server';
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
        return redirect("/userpage");
    } catch (e) {
        console.log(e);
        return redirect("/");
    }
}

export async function Payment(form: any): Promise<void> {
    try {
        const cookie = cookies().get("cart")?.value;
        if (form.get("orders").length <= 0) return redirect("/") 
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
        console.log(payment_data);
        return redirect("/");
    } catch (e) {
        console.log(e);
        return redirect("/");
    }
}

