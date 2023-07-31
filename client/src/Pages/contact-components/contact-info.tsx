import { Button, Form } from "react-bootstrap";
import Design from "../../assets/undraw_contact.svg";
import "./contact-info.css";

export default function ContactInfo() {
    return (
        <div className="Contact__info d-flex align-items-center justify-content-between">
            <div className="Contact__info__container">
                <div className="Contact__info__container__text">
                    <h1>Contact Us</h1>
                    <p>Feel free to contact us if you have any questions or concerns.</p>
                </div>
                <Form className="Contact__info__container__form">
                    <Form.Group className="mb-3" controlId="email for contact">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            This form is only design
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="name for contact">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" />
                    </Form.Group> 
                    <Form.Group className="mb-3" controlId="message for contact">
                        <Form.Label>Message</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Enter message" />
                    </Form.Group>
                    <Button variant="secondary" type="submit">
                        Send message
                    </Button>
                </Form>
            </div>
            <div className="Contact__info__design d-flex justify-content-end">
                <img src={Design} alt="Contact design" />
            </div>
        </div>
    )
}
