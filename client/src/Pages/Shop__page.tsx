import { Container } from "react-bootstrap";
import Shop__page_filter from "./shop-components/Shop__page-filter";

export default function Shop__page() {
    return (
        <Container className="text-center text-lg-start">
            <Shop__page_filter />
        </Container>
    )
}
