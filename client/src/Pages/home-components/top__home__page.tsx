import React from "react";
import Home_Img from "../../assets/home_background.png";


export default function Home_top(): React.ReactElement {
    return (
        <div className="container-fluid home-top__container">
            <div className="home-top__text__container">
                <h1 className="home-top__text__container__title"><span className="special__span">Easier</span>, like never before.</h1>
                <p className="home-top__text__container__text">
                    Doorbells, cameras, locks, lights and many more. <br />
                </p>
                <button className="home-top__text__container__button">Get Started</button>
            </div>
            <div className="home-top__image__container">
                <img className="home-top__image" src={Home_Img} alt="home_background" />
            </div>
        </div>
    )
}
