'use client';
import { Payment } from "@/lib/actions";
import { CartItem } from "@/types/Type";

export default function PaymentForm({ orders }: { orders: CartItem[] }) {
    return (
        <div className="text-center container text-lg-start d-flex flex-column justify-content-center" style={{ height: "100svh" }}>
            <div className="text-center">
                <h1 className="mt-5" style={{ fontSize: "4rem" }}>Fill up information</h1>
            </div>
            <form action={Payment} className="d-flex flex-column justify-content-center align-content-center w-100 pb-4 h-75">
                <div className="mb-8">
                    <div className="form-group mb-5">
                        <label htmlFor="email">email</label>
                        <input type="email" name="email" id="email" className="form-control" />
                    </div>
                    <div className="form-group mb-5">
                        <label htmlFor="phone">Phone</label>
                        <input type="text" name="phone" id="phone" className="form-control" />
                    </div>
                    <div className="form-group mb-5">
                        <label htmlFor="country">Country</label>
                        <input type="text" name="country" id="country" className="form-control" />
                    </div>
                    <div className="form-group mb-5">
                        <label htmlFor="city">City</label>
                        <input type="text" name="city" id="city" className="form-control" />
                    </div>
                    <div className="form-group mb-5">
                        <label htmlFor="postalcode">Postal code</label>
                        <input type="text" name="postalcode" id="postalcode" className="form-control" />
                    </div>
                        <div className="form-group mb-5">
                        <label htmlFor="address">Address</label>
                        <input type="text" name="address" id="address" className="form-control" />
                    </div>
                </div>
                <input type="hidden" name="orders" value={JSON.stringify(orders)} />
                <div className="mb-8">
                    <button type="submit" className="btn btn-primary w-100">Process payment</button>
                </div>
            </form>
        </div>
    )
}

