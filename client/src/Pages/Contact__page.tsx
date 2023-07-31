import { Container } from "react-bootstrap";
import ContactInfo from "./contact-components/contact-info";

export default function Contact__page() {
    return (
        <Container className="text-center text-lg-start">
            <ContactInfo />
        </Container>
    )
}
