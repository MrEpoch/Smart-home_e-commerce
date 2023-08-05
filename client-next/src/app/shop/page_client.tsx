'use client';
import Display_products from "@/components/Display_products";
import { Pagination } from "@mui/material";
import React, { useState } from "react";

export default function Client__page({ data }: { data: number }) {

    const [skip, setSkip] = useState(0);

    function handleChange(e: React.ChangeEvent<unknown>, value: number) {
        setSkip(value);
    }

    return (
        <div className="">
            <Display_products skip={skip} />
            <Pagination className="d-flex justify-content-center" count={data} onChange={handleChange} variant="outlined" shape="rounded" />            
        </div>
    )
}
