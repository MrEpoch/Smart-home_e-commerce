import "./Header.css";
import React, { Suspense, lazy } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';

const Cart = lazy(() => import("./cart-components/cart"));

export default function Header(): React.ReactElement {
    return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container className="navbar__container">
        <Navbar.Brand className="navbar__brand">
            <Link id="brand_name" to="/">
                SmartUp
            </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link className="navbar__links" to="/">Home</Link>
            <Link className="navbar__links" to="/shop">Shop</Link>
            <NavDropdown title="" id="collasible-nav-dropdown">
              <NavDropdown.Item>
                <Link to="/about">
                    About
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/contact">
                    Contact
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Link to="/userpage">
                <button className="btn button_box btn-primary">
                    <PersonIcon />
                </button>
            </Link>
            <Suspense fallback={<div>Loading...</div>}>
                <Cart />
            </Suspense>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
}
