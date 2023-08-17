import React, { Suspense } from "react";
import Display_products from "@/components/Display_products";
import Link from "next/link";
import css from "@/styles/Home.module.css";
import InfoCard from "@/components/InfoCard";

const data = [
          {
            name: "Bluetooth doorbells",
            price: 99.99,
            description: "A doorbell that rings when you get a phone call",
            long_description: "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.",
            image: "/doorbell_item.jpg"
          },
          {
            name: "Smart locks",
            price: 199.99,
            description: "Lock controllable through your device",
            long_description: "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.",
            image: "/smart-lock_item.jpg"
          },
          {
            name: "Wifi Thermostats",
            price: 299.99,
            description: "Thermostat controllable through smart devices",
            long_description: "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.",
            image: "/thermostat_item.jpg"
          }
]

export default async function Main__home() {
    
  return (
    <div className="container-fluid main__home__container">
      <div className="main__home__popular__container">
      {data.map((item, index) => (
          <Suspense key={index} fallback={<div className={css.skeleton}></div>}>
            <InfoCard item={item} />
          </Suspense>
        ))}
      </div>
      <Display_products skip={0} />
      <Link href="/shop">More</Link>
    </div>
  );
}
