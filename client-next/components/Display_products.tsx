import React from "react";
import "./products.css";
import Shop__page_filter from "./Filter_search";
import css from "@/styles/Home.module.css";
import { Suspense } from "react";
import ProductLoader from "./ProductCardLoader";

const getProducts = async (skip: number) => {
    const response = await fetch("http://165.232.120.122/server/data/?take=10&skip=" + skip, { cache: "no-cache" });
    const data = await response.json();
    return data;
}

const getSearchProducts = async () => {
    const response = await fetch("http://165.232.120.122/server/data/productSearch", { cache: "no-cache" });
    const data = await response.json();
    return data.products;
}

export default async function Display_products({ skip=0 }) {
    const products = await getProducts(skip ? skip : 0);
    const search = await getSearchProducts();
  return (
    <section className="products__section">
      <h1 className="products__section__title">Product Overview</h1>
      <Suspense fallback={<ProductLoader />}>
        <Shop__page_filter products={products} search={search} />
      </Suspense>
    </section>
  );
}
