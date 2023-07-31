import "./home-components/Home__page.css";
import React from "react";
import Home_top from "./home-components/top__home__page";
import Home_main from "./home-components/main__home__page";
import { Container } from "react-bootstrap";

export default function Home(): React.ReactElement {
  return (
    <Container className="text-center text-lg-start home__page">
      <Home_top />
      <Home_main />
    </Container>
  );
}
