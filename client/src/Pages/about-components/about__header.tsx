import { Container } from "react-bootstrap";
import House from "../../assets/house-design.jpg";
import "./about__header.css";

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
                    We are spreading our work all over the world with most famous engineers and designers to optimize and enhance products
                    to be of highest quality and use for your home.
                </p>
            </div>
            <img src={House} alt="House design" className="
                about__header__image
                w-100  flex 
        "/>
        </Container>
    )
}
