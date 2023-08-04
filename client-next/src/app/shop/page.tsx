import Client__page from "./page_client";

const getProductsLength = async () => {
    const response = await fetch("http://http://165.232.120.122/server/data/length");
    const data = await response.json();
    return Math.floor(data / 10);
}

export default async function Page() {
    const count = await getProductsLength();

    return (
        <div className="text-center container text-lg-start">
            <Client__page data={count} />
        </div>
    )
}
