import { redirect } from "@sveltejs/kit";

export const actions = {
    login_acc: async ({ cookies, url }) => {
        cookies.set('token', "test");
        throw redirect(303, url.searchParams.get("redirectTo") ?? "/");
    }
}
