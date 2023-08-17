import { Product } from "@/types/Type";
import Image from "next/image";
import { addToCart } from "@/lib/api";
import Link from "next/link";

export default function Product_card({ props }: { props: Product }): React.ReactElement {

    return (
        <div className="home__page__product__card">
            <Link href={"/shop/" + props.id}className="home__page__product__card__img">
                <Image width={300} height={400} src={props.image} alt={props.name} />
            </Link>
            <div className="home__page__product__card__body">
                <h3>{props.name}</h3>
                <p>{props.description.substring(0, 30 - 3) + "..."}</p>
                <div className="home__page__product__card__body__price">
                    <span>{props.price}</span>
                </div>
                <button onClick={() => addToCart(props)} className="home__page__product__card__body__btn">Add to cart</button>
            </div>
        </div>
    )
}
