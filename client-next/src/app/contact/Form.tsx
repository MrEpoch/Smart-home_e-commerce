'use client';
import { Form, Button } from "react-bootstrap"


export default function Form_my() {
    return (
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
    )
}
