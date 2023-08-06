import Image from "next/image";
import "./page.css";

const getProduct = async (productId: string) => {
    try {
        const response = await fetch("http://165.232.120.122/server/data/" + productId, { next: { revalidate: 60 * 5 } });
        const data = await response.json();
        return data;
    } catch (error) {    
        console.log(error);
        return null;
    }
}

export default async function Page({ params }) {
    const { product } = params;

    const product_item = await getProduct(product);

    if (!product_item) {
        return (
            <div>
                <h1>Product not found</h1>
            </div>
        )
    } else {
        return (
            <div className="container d-flex flex-column shop-item__page w-100 mt-5 mb-5 justify-content-between">
                <div className="shop-item__page__img w-100">
                    <Image width={1000} height={800} className="w-100 h-50" src={product_item.image} alt={product_item.name} />
                    <h5 className="shop-item__page__price">{product_item.price}</h5>   
                </div>
                <div className="shop-item__page__body">
                    <h1>{product_item.name}</h1>
                    <p>{product_item.description}</p>
                </div>
            </div>
        )
    }
}
