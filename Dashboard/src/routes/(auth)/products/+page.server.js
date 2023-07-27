import axios from "axios";

export async function load ({ cookies }) {
    
    const token = cookies.get('token')
    //const res = await fetch('http://localhost:3000/api/products', {
    //    headers: {
    //        'Authorization': `Bearer ${token}`
    //    }
    // })
    //const products = await res.json();
    //console.log(products)
    return {
    }
}

export const actions = {
    create: async ({ cookies, request }) => {
        try {
            const data = await request.formData();
            const token = cookies.get('token')
            
            const formData = new FormData();
            formData.append('image', data.get('file'));
            
            const url = 'http://localhost:3249/server/admin-api/';
            const imgPost = await axios.post(url + 'upload', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            const dataPost = await axios.post(url, {
                name: data.get('name'),
                price: data.get('price'),
                image: data.get('file').name,
                description: data.get('description'),
                long_description: data.get('long_description'),
                stripeId: data.get('stripeId')
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

        } catch (error) {
            console.log(error)
        }
    }        
}
