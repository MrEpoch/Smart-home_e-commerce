import React from "react";
import "./products.css";
import Shop__page_filter from "./Filter_search";

const getProducts = async () => {
    const response = await fetch("http://localhost:3247/server/data/?take=10&skip=0=");
    const data = await response.json();
    return data;
}

export default async function Display_products() {

  const products = await getProducts();

  return (
    <section className="products__section">
      <h1 className="products__section__title">Product Overview</h1>
      <Shop__page_filter products={products} />
      </section>
  );
}
