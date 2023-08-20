'use client';
import React from 'react'
import { Autocomplete, TextField } from "@mui/material"
import Product_card from "@/components/Product_card"
import { Product, ProductContextType } from "@/types/Type";
import { useState } from "react";
import Link from 'next/link';
import css from "@/styles/Home.module.css";

export default function Shop__page_filter({ products, search }: { products: Product[], search: any }): React.ReactElement {

      const [filter_condition, setFilter_condition] = useState<"all" | "locks" | "cameras" | "doorbells" | "lights" | "thermostats">("all");
      const [searchData, setSearchData] = useState<Product[]>(products || []);

      function filter_products(product: Product): boolean {
        if (product.category === filter_condition) {
          return true;
        } else if (filter_condition === "all") {
            return true;
        }
        return false;
      }

    return (
     <div className="products__section">
        <div className="products__section__filters">
            <div className="products__section__filters__categories">
              <button onClick={() => setFilter_condition("all")} className="products__section__filters__categories__all">
                All products
              </button>
              <button onClick={() => setFilter_condition("locks")} className="products__section__filters__categories__locks">
                Smart Locks
              </button>
              <button onClick={() => setFilter_condition("cameras")} className="products__section__filters__categories__cameras">
                Security cameras
              </button>
              <button onClick={() => setFilter_condition("doorbells")} className="products__section__filters__categories__doorbells">
                Bluetooth doorbells
              </button>
              <button onClick={() => setFilter_condition("lights")} className="products__section__filters__categories__lights">
                Controllable Lights
              </button>
              <button onClick={() => setFilter_condition("thermostats")} className="products__section__filters__categories__thermostats">
                Wifi Thermostats
              </button>
            </div>
            <div className="products__section__filters__search">
                <Autocomplete 
                    options={search ?? [{name: "Loading..."}]}
                    renderOption={(props, option) => (
                        <Link key={option.id} className={css.link_search} href={`/product/${option.id ?? option.name}`}>{option.name}</Link>
                    )}
                    id="search-auto"
                    getOptionLabel={(option: any) => option.name}
                    renderInput={(params) => (
                        <TextField
                            key={params.id}
                            {...params}
                            id="searchtext"
                            label="Search products"
                            inputProps={{
                                ...params.inputProps,
                                type: 'search',
                            }}
                        />)
                    }
                />
            </div>
          </div>
          <div className="products__section__products">
          {products.filter(product => filter_products(product)).map((product: Product) => (
                <Product_card key={product.id} props={product} />
            ))}
         </div>
     </div>
    )
}
