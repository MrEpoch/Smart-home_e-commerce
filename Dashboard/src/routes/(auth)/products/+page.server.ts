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
        console.log(res.data);
        return {
            products: res.data
    }}
    catch (e: any) {
        if (e.response.data && (e.response.data.name === "TokenExpiredError" || e.response.data.name === "JsonWebTokenError")) cookies.delete('token');
        console.log(e);
    }
}

export const actions = {
    create: async ({ cookies, request }) => {
        try {
            const data = await request.formData();
            const token = await cookies.get('token')
            const image_file = await data.get('image');

            if (!image_file) throw new Error('Image is required');

            const image_name = crypto.getRandomValues(new Uint32Array(1))[0].toString(16);            
            const image_ext = image_file.name.split('.').pop();
            const unique_image_name = `${image_name}.${image_ext}`;
            data.set('image', image_file, unique_image_name);
            const formData = new FormData();
            formData.append('image', image_file, unique_image_name);

            const acc_token = await axios.get('http://165.232.120.122/server-admin/admin-token', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const url = 'http://165.232.120.122/server-admin/admin-api/';
            console.log("before upload", formData.get('image'), acc_token.data.ACCESS_TOKEN);
            const imgUpload = await fetch('http://165.232.120.122/server-admin/admin-api/upload-img', {
                method: "POST",
                body: formData,
                headers: {
                    'Authorization': `Bearer ${await acc_token.data.ACCESS_TOKEN}`,
                }
            })
            await axios.post(url, {
                name: data.get('name'),
                price: data.get('price'),
                image: unique_image_name,
                description: data.get('description'),
                long_description: data.get('long_description'),
                stripeId: data.get('stripeId')
            }, {
                headers: {
                    'Authorization': `Bearer ${acc_token.data.ACCESS_TOKEN}`
                }
            });
            
            console.log("after upload", imgUpload);

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
