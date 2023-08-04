import axios from "axios";


export async function load ({ cookies }) {
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
        return {
            products: res.data
    }}
    catch (e) {
        console.log(e);
    }
}

export const actions = {
    create: async ({ cookies, request }) => {
        try {
            const data = await request.formData();
            const token = cookies.get('token')

            const image_name = crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
            data.set('image', data.get('image'), image_name + '.' + data.get('image').name.split('.').pop());
            const formData = new FormData();
            formData.append('image', data.get('image'));

            const acc_token = await axios.get('http://165.232.120.122/server-admin/admin-token', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const url = 'http://165.232.120.122/server-admin/admin-api/';
            await axios.post(url + 'upload-img', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${acc_token.data.ACCESS_TOKEN}`,
                }
            })
            await axios.post(url, {
                name: data.get('name'),
                price: data.get('price'),
                image: data.get('image').name,
                description: data.get('description'),
                long_description: data.get('long_description'),
                stripeId: data.get('stripeId')
            }, {
                headers: {
                    'Authorization': `Bearer ${acc_token.data.ACCESS_TOKEN}`
                }
            })
            return;
        } catch (error) {
            console.log(error)
        }
    },

    delete: async ({ cookies, request }) => {
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
    }
}
