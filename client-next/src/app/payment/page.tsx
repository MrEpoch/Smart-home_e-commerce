import PaymentForm from "@/components/PaymentForm";
import { cookies } from "next/headers";

function getOrders() {
    const orders = cookies().get("cart")?.value;
    if (orders) {
        return JSON.parse(orders);
    }
    return [];
}

export default async function Page() {
    const orders = getOrders();

    return (
        <section className="text-center container text-lg-start">
            <PaymentForm orders={orders} />
        </section>
    )
}
