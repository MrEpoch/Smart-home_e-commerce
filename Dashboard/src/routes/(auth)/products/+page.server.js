
export async function load ({ cookies }) {
    
    const token = cookies.get('token')
    const res = await fetch('http://localhost:3000/api/products', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const products = await res.json();
    console.log(products)
    return {
    }
}
