import { Product } from "@/types/Type";
import Image from "next/image";

export default function Product_card({ props }: { props: Product }): React.ReactElement {
    return (
        <div className="home__page__product__card">
            <div className="home__page__product__card__img">
                <Image width={300} height={400} src={props.image} alt={props.name} />
            </div>
            <div className="home__page__product__card__body">
                <h3>{props.name}</h3>
                <p>{props.description}</p>
                <div className="home__page__product__card__body__price">
                    <span>{props.price}</span>
                </div>
                <button className="home__page__product__card__body__btn">Add to cart</button>
            </div>
        </div>
    )
}
