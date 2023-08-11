import Client__page from "./page_client";

const getProductsLength = async () => {
    const response = await fetch("http://165.232.120.122/server/product/length");
    const data = await response.json();
    return Math.floor(data / 10) + 1;
}

const getProducts = async () => {
    const response = await fetch("http://165.232.120.122/server/data/?take=10&skip=0");
    const data = await response.json();
    return data;
}

export default async function Page() {
    const count = await getProductsLength();
    const products = await getProducts();

    return (
        <div className="text-center container text-lg-start h-100">
        {count && <Client__page pages={count} data={products} />}
        </div>
    )
}

