'use client';
import Display_products from "@/components/Display_products__client";
import { Product } from "@/types/Type";
import { Pagination } from "@mui/material";
import React, { useState } from "react";

export default function Client__page({ data, pages, search }: { data: Product[], pages: number, search: any }) {

    const [products, setProducts] = useState<Product[]>(data);

    async function getProducts(skip: number): Promise<void> {
        const res = await fetch(`http://165.232.120.122/server/data/?take=10&skip=${skip * 10}`);
        const data = await res.json();
        setProducts(data);
        return;
    }

    async function handleChange(e: React.ChangeEvent<unknown>, value: number): Promise<void> {
        await getProducts(value - 1);
        return;
    }

    return (
        <div className="mt-5 mb-5">
            <Display_products search={search} data={products} />
            <Pagination className="d-flex justify-content-center" count={pages} onChange={handleChange} variant="outlined" shape="rounded" />            
        </div>
    )
}
