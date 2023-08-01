import React from "react";
import Image from "next/image";

export default function Home_top(): React.ReactElement {
  return (
    <div className="container-fluid home-top__container">
      <div className="home-top__text__container">
        <h1 className="home-top__text__container__title">
          <span className="special__span">Easy,</span> like never before.
        </h1>
        <p className="home-top__text__container__text">
          Doorbells, cameras, locks, lights and many more. <br />
        </p>
        <button className="home-top__text__container__button">
          Get Started
        </button>
      </div>
      <div className="home-top__image__container">
          <Image width={300} height={300} className="home-top__image" src="/home_background.png" alt="home_background" />
      </div>
    </div>
  );
}
