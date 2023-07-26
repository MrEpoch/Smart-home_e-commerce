import { redirect } from "@sveltejs/kit";
import type { Cookies } from "@sveltejs/kit";

export function load({ cookies, url }: { cookies: Cookies; url: URL }) {
    if (!cookies.get("token")) {
        throw redirect(303, `/login?redirectTo=${url.pathname}`);
    }
}
