import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import Products from "./products";

export default function Main__home(): React.ReactElement {


 const data = [
          {
            name: "Bluetooth doorbells",
            price: 99.99,
            description: "A doorbell that rings when you get a phone call",
            long_description: "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.",
            image: "/src/assets/doorbell_item.jpg"
          },
          {
            name: "Smart locks",
            price: 199.99,
            description: "Lock controllable through your device",
            long_description: "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.",
            image: "/src//assets/smart-lock_item.jpg"
          },
          {
            name: "Wifi Thermostats",
            price: 299.99,
            description: "Thermostat controllable through smart devices",
            long_description: "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.",
            image: "/src/assets/thermostat_item.jpg"
          }
    ]

  return (
    <div className="container-fluid main__home__container">
      <div className="main__home__popular__container">
        {data.map((item, index) => (
          <Card key={index} className="main__home__popular">
            <Card.Img
              variant="top"
              className="main__home__popular-img"
              src={item.image}
            />
            <Card.ImgOverlay className="main__home__popular-ImgOverlay">
              <Card.Title className="main__home__popular__title">
                {item.name}
              </Card.Title>
            </Card.ImgOverlay>
          </Card>
        ))}
      </div>
      <Products />
    </div>
  );
}


