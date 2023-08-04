import React from "react";
import "./products.css";
import Shop__page_filter from "./Filter_search";

const getProducts = async (skip: number) => {
    const response = await fetch("http://165.232.120.122/server/data/?take=10&skip=" + skip);
    const data = await response.json();
    return data;
}

export default async function Display_products({ skip=0 }) {

  const products = await getProducts(skip);

  return (
    <section className="products__section">
      <h1 className="products__section__title">Product Overview</h1>
      <Shop__page_filter products={products} />
    </section>
  );
}
