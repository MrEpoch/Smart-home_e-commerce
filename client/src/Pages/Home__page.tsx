import "./home-components/Home__page.css";
import React from "react";
import Home_top from "./home-components/top__home__page";
import Home_main from "./home-components/main__home__page";

export default function Home(): React.ReactElement {
    return (
        <section className="bg-body-tertiary text-center text-lg-start">
            <Home_top />
            <Home_main />
        </section>
    )
}
