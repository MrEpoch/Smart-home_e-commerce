import { cookies } from "next/headers"
import { redirect } from "next/navigation";

async function getAccount() {
    const refresh_token = cookies().get("refresh_token");
    if (!refresh_token) redirect("/login");
    const access_token = await fetch("http://165.232.120.122/server-normal/normal-token", {
        headers: {
            "Authorization": `Bearer ${refresh_token}`
        },
    });

    const token = access_token;

    const account = await fetch("http://165.232.120.122/server-normal/normal-api/account", {
        headers: {
            "Authorization": `Bearer ${token.ACCESS_TOKEN}`
        }
    });

    const data = await account.json();
    return data;
}

export async function checkAuth() {
    const refresh_token = cookies().get("refresh_token");
    if (!refresh_token) redirect("/login");
}

export default async function Page() {
    await checkAuth();
    const account = await getAccount();

    return (
        <div className="text-center container text-lg-start">
            <h1>User page</h1>
        </div>
    )
}
