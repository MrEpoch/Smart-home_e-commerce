import "./Header.css";
import React, { Suspense, lazy } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const Cart = lazy(() => import("./cart-components/cart"));

export default function Header(): React.ReactElement {
    return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container className="navbar__container">
        <Navbar.Brand className="navbar__brand">
            <Link to="/">
                <img src={Logo} alt="Logo" width="50" height="50"/>
            </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <NavDropdown title="More" id="collasible-nav-dropdown">
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
                <AccountBoxIcon />
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
