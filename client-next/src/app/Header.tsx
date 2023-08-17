import { getCart } from "@/lib/api";
import React from "react";
import Header_client from "@/components/ClientHeader";
import "@/styles/Header.css";

async function getCart__data() {
    const cart_data = await getCart();
    return cart_data;
}

export default async function Header() {
    const cart_items = await getCart__data();

    return (
        <>
            <Header_client cart_items={cart_items} />
        </>
    )
}
