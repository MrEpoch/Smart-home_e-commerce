import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LayoutAuth({ children }: { children: React.ReactNode }) {
    const refresh_token = cookies().get("refresh_token");
    
    if (refresh_token) {
        return (
            <>
                {children}
            </>
        )
    } else {
        return redirect("/login");
    }
}
