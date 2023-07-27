import { redirect } from "@sveltejs/kit";

export const actions = {
    login_acc: async ({ cookies, url, request }) => {
        const data = await request.formData();
        const response = await fetch("http://localhost:3249/server/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: data.get("email"),
                password: data.get("password"),
            }),
        });
        const json = await response.json();
        console.log(json);
        cookies.set('token', json.token);
        throw redirect(303, url.searchParams.get("redirectTo") ?? "/");
    }
}
