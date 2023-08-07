'use client';
import React from "react";
import "./products.css";
import Shop__page_filter from "./Filter_search";
import { Product } from "@/types/Type";

export default function Display_products({ data }: { data: Product[] }) {
  return (
    <section className="products__section">
      <h1 className="products__section__title">Product Overview</h1>
      <Shop__page_filter products={data} />
    </section>
  );
}
