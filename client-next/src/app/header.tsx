'use client';
import "./Header.css";
import React, { Suspense, lazy } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";

const Cart = lazy(() => import("./cart__modal"));

export default function Header(): React.ReactElement {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary navbar__navbar"
    >
      <Container className="navbar__container">
        <Navbar.Brand className="navbar__brand">
          <Link id="brand_name" href="/">
            SmartUp
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link className="navbar__links" href="/">
              Home
            </Link>
            <Link className="navbar__links" href="/shop">
              Shop
            </Link>
            <NavDropdown title="" id="collasible-nav-dropdown">
              <NavDropdown.Item>
                <Link href="/about">About</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link href="/contact">Contact</Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Link href="/userpage">
              <button className="btn button_box bg-black text-white">
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
