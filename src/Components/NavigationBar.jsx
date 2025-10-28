import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

function NavigationBar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`shadow-sm ${scrolled ? "bg-light" : "bg-transparent"}`}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
          <img
            src="../public/logo.png"
            alt="ShopSmart Logo"
            width="90"
            height="90"
            className="me-2"
          />{" "}
          SILK DUNE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="text-dark">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/products" className="text-dark">
              Product Listing
            </Nav.Link>
            <Nav.Link as={Link} to="/add-product" className="text-dark">
              Add Product
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
