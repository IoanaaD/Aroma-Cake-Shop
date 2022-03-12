import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Logo } from "../icons";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header>
      <Navbar bg="light" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand onClick={() => navigate('/')}>
            <Logo></Logo>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="nav-links-container">
              <Nav.Link href="/products">Products</Nav.Link>
              <div className="login-btn-container">
                <Nav.Link onClick={() => navigate('/cart')}> <i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                <Nav.Link onClick={() => navigate('/login')}> <i className="fas fa-user"></i>Login</Nav.Link>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
