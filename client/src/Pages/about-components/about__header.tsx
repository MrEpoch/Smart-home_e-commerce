import { Card, Container } from "react-bootstrap";
import House from "../../assets/house-design.jpg";
import "./about__header.css";
import Lightning from "./about_svgs/lightning-bolt.svg";
import InfinitySvg from "./about_svgs/infinity.svg";
import LightBulbOn from "./about_svgs/lightbulb-on-outline.svg";

export const goalCards = [
    {
        title: "Spread technology",
        text: "Making your home more advanced and secure.",
        image: Lightning
    },
    {
        title: "Show maximum",
        text: "Showing maximum potential of current technology.",
        image: InfinitySvg
    },
    {
        title: "Make it easy",
        text: "Making life easire for you and your family.",
        image: LightBulbOn
    }
]

export default function About__header() {
    return (
        <Container className="about__header flex-column justify-content-center d-flex gap align-items-center">
            <div className="about__header__top-text">
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
            <img src={House} alt="House design" className="
                about__header__image
                w-100  flex 
            "/>
            <div className="about__header__goal-cards">
                {goalCards.map((card, index) => (
                    <Card key={index} className="about__header__goal-card">
                        <Card.Img variant="top" src={card.image} alt="Card icon" className="about__header__goal-card__icon"/>
                        <Card.Body>
                            <Card.Title>{card.title}</Card.Title>
                            <Card.Text>
                                {card.text}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </Container>
    )
}
