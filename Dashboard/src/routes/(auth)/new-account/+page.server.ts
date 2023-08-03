import { redirect } from "@sveltejs/kit";
import axios from "axios";

export const actions = {
    default: async ({ cookies, url, request }) => {
        const data = await request.formData();
        const token = cookies.get("token");
        const acc_token = await axios.get("http://165.232.120.122/server-admin/admin-token", {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        await axios.post("http://165.232.120.122/server-admin/signup", {
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            password: data.get("password"),
            email: data.get("email"),
        },{
            headers: {
                'Authorization': `Bearer ${acc_token.data.ACCESS_TOKEN}`,
                "Content-Type": "application/json",
            },
        });
        throw redirect(303, "/");
    }
}
