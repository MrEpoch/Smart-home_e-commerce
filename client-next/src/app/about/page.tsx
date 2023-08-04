import infinitySvg from "@/assets/infinity.svg";
import lightningSvg from "@/assets/lightning-bolt.svg";
import lightBulbOnSvg from "@/assets/lightbulb-on-outline.svg";
import House from "@/assets/house-design.jpg";
import Image from "next/image";
import "./page.css";

export default function Page() {
    const goalCards = [
    {
        title: "Spread technology",
        text: "Making your home more advanced and secure.",
        image: lightningSvg
    },
    {
        title: "Show maximum",
        text: "Showing maximum potential of current technology.",
        image: infinitySvg
    },
    {
        title: "Make it easy",
        text: "Making life easire for you and your family.",
        image: lightBulbOnSvg
    }
]

    return (
        <div className="container text-center text-lg-start h-100">
             <div className="mb-5 about__header__top-text">
                <h1 className="about__header__title">We are <span>SmartUp</span></h1>
                <p>
                    <span>Our goals</span>
                    <br/>
                    We are technological company who wants to give you and your home to be most advanced and secure you can get.
                    <br/>
                    Our goal is to spread our work all over the world with most famous engineers and designers to optimize and enhance products
                    to be of highest quality and use for your home.
                </p>
            </div>
            <Image width={800} height={300} src={House} alt="House design" className="
                about__header__image
                w-100  flex mb-5
            "/>
            <div className="about__header__goal-cards mb-5 mt-5">
                {goalCards.map((card, index) => (
                    <div key={index} className="card about__header__goal-card card">
                        <Image width={300} height={200} src={card.image} alt="Card icon" className="card-img-top about__header__goal-card__icon"/>
                        <div className="card-body">
                            <h5 className="card-title">{card.title}</h5>
                            <p className="card-text">
                                {card.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>           
        </div>
    )
}





