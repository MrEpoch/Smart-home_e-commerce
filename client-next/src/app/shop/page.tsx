import { Suspense } from "react";
import Client__page from "./page_client";
import Loading from "./loading";

const getProductsLength = async () => {
    const response = await fetch("http://165.232.120.122/server/product/length");
    return Math.floor(typeof response === "number" ? response : 0 / 10) + 1;
}

const getProducts = async () => {
    const response = await fetch("http://165.232.120.122/server/data/?take=10&skip=0");
    const data = await response.json();
    return data;
}

const getSearchProducts = async () => {
    const response = await fetch("http://165.232.120.122/server/data/productSearch", { next: { revalidate: 0 }} );
    const data = await response.json();
    return data.products;
}

export default async function Page() {
    const count = await getProductsLength();
    const products = await getProducts();
    const search = await getSearchProducts(); 

    return (
        <div className="text-center container text-lg-start w-100 h-100">
            <Suspense fallback={<Loading />}>
                {count && <Client__page pages={count} search={search} data={products} />}
            </Suspense>
        </div>
    )
}

