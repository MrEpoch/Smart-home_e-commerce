import Image from "next/image";
import Form_my from "./Form";
import Design from "@/assets/undraw_contact.svg";

export default function Page() {
    return (
        <div className="container text-center text-lg-start">
            <div className="Contact__info d-flex align-items-center justify-content-between">
                <div className="Contact__info__container">
                    <div className="Contact__info__container__text">
                        <h1>Contact Us</h1>
                        <p>Feel free to contact us if you have any questions or concerns.</p>
                    </div>
                    <Form_my />
                </div>
                <div className="Contact__info__design d-flex justify-content-end">
                    <Image width={500} height={600} src={Design} alt="Contact design" />
                </div>
            </div>
        </div>
    )
}
