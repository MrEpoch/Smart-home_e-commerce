import { cookies } from "next/headers"
import { redirect } from "next/navigation";
import { getAccount } from "@/lib/api";

export async function checkAuth() {
    const refresh_token = cookies().get("refresh_token");
    if (!refresh_token) redirect("/login");
}

export default async function Page() {
    const account = await getAccount();
    console.log(account);

    return (
        <div className="text-center container text-lg-start">
            <h1>User page</h1>
            <p>Hello {account.email}</p>
        </div>
    )
}
