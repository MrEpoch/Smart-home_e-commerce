'use client';
import React, { Suspense, lazy } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import { CartItem } from "@/types/Type";

const Cart = lazy(() => import("@/components/Cart__modal_client"));

export default function Header({ cart_items }: { cart_items: CartItem[] }): React.ReactElement {
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
            <Link className="navbar__links header__link__styled" href="/">
              Home
            </Link>
            <Link className="navbar__links header__link__styled" href="/shop">
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
              <Cart cart_items={cart_items} />
            </Suspense>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
