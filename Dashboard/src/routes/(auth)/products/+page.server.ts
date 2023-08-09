import type { Cookies } from "@sveltejs/kit";
import axios from "axios";

export async function load ({ cookies }: { cookies: Cookies }) {
    try {
        const token_r = cookies.get('token');
        const token = await axios.get('http://165.232.120.122/server-admin/admin-token', {
            headers: {
                'Authorization': `Bearer ${token_r}`
            }
        })
        const url = 'http://165.232.120.122/server-admin/admin-api/';
        const res = await axios.get(url + "?take=5&skip=0", {
            headers: {
                'Authorization': `Bearer ${token.data.ACCESS_TOKEN}`
            }
        })
        const upload_token = await axios.get(url + 'uploadToken/', {
            headers: {
                'Authorization': `Bearer ${token.data.ACCESS_TOKEN}`
            }
        });

        console.log(upload_token.data)
        return {
            products: res.data,
            token: upload_token.data,
            image_name: crypto.getRandomValues(new Uint32Array(1))[0].toString(16)
        }
    }
    catch (e: any) {
        if (e.response.data && (e.response.data.name === "TokenExpiredError" || e.response.data.name === "JsonWebTokenError")) cookies.delete('token');
        console.log(e);
    }
}

export const actions = {
    create: async ({ cookies, request }: { cookies: Cookies, request: Request }) => {
        try {
            const data = await request.formData();
            const token = cookies.get('token')

            const token_data = await fetch('http://165.232.120.122/server-admin/admin-token', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const acc_token = await token_data.json();

            const url = 'http://165.232.120.122/server-admin/admin-api/';
            await axios.post(url, {
                name: data.get('name'),
                price: data.get('price'),
                image: data.get('image_name'),
                description: data.get('description'),
                long_description: data.get('long_description'),
                stripeId: data.get('stripeId')
            }, {
                headers: {
                    'Authorization': `Bearer ${acc_token.ACCESS_TOKEN}`
                }
            });

            return;
        } catch (error) {
            console.log(error)
            return;
        }
    },

    delete: async ({ cookies, request }: { cookies: Cookies, request: Request }) => {
        try {
            const data = await request.formData();
            const token = cookies.get('token')
            const acc_token = await axios.get('http://165.232.120.122/server-admin/admin-token', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const url = 'http://165.232.120.122/server-admin/admin-api/';
            const dataDelete = await axios.delete(url + data.get('id'), {
                headers: {
                    'Authorization': `Bearer ${acc_token.data.ACCESS_TOKEN}`
                }
            })
            return;
        } catch (e) {
            console.log(e);
        }
    },

    upload: async ({ cookies, request }) => {
        try {
            const data = await request.formData();
            const token = await cookies.get('token')

            
        } catch (e) {
            console.log(e);
        }
    },
}
