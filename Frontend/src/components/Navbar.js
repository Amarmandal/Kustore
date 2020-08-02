import React, { useState } from "react";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

export default function Navbars() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand>
          <Link to="/">
            <b>KUSTORE</b>
          </Link>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto rightNav" navbar>
            <NavItem>
              <NavLink>
                <Link to="/">Home</Link>
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink>
                <Link to="about-us">About</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link to="/contact">Contact</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link to="/login">Login</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link to="/register">Sign Up</Link>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
