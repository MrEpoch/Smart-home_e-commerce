import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card } from "react-bootstrap";

export default function Main__home(): React.ReactElement {
    
    const [popular, setPopular] = useState<Array<any>>([]);

    async function fetch_data(): Promise<void> {
        try {
            const data = await fetch("/src/Pages/Fake_data.json")
            const json = await data.json();
            setPopular(json[0].popular);
            return;
        } catch (e) {
            console.log(e);
            return;
        }
    }

    useEffect(() => {
        fetch_data();
    }, [])

    return (
        <div className="container-fluid main__home__container">
            <div className="main__home__popular__container">
                {popular.map((item, index) => (
                    <Card key={index} className="main__home__popular">
                      <Card.Img variant="top" className="main__home__popular-img" src={item.image}/>
                      <Card.ImgOverlay className="main__home__popular-ImgOverlay">
                        <Card.Title className="main__home__popular__title">{item.name}</Card.Title>
                      </Card.ImgOverlay>
                    </Card>
                ))}
            </div>
        </div>
    )
}
