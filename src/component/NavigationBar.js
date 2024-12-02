import React from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../style/navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../images/Avatar.png"

function NavigationBar() {
  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img 
            src={logo} 
            width={50} 
            height={50} 
            className="d-inline-block align-top" 
            alt="logo"
          />
          <span className="navbar-brand-text">IbTiTah <br/> Fakultas Sains dan Teknologi</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggler-custom" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="nav-link-custom">Beranda</Nav.Link>
            <Nav.Link as={Link} to="/dasboard" className="nav-link-custom">Struktur</Nav.Link>
            <Nav.Link as={Link} to="/gallery" className="nav-link-custom">Acara</Nav.Link>
            <Nav.Link as={Link} to="/login" className="nav-link-custom">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
