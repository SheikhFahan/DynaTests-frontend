import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import AuthContext from "../Context/AuthContext";

import logo from "../Images/logoMain2.png";

const NavbarComp = () => {
  // this line is breaking my code
  let { user, logoutUser } = useContext(AuthContext);

  return (
    <Navbar
      expand="lg"
      className="  bg-gradient-to-b from-gray-200 to-gray-100  min-h-full min-w-full"
    >
      <Container>
        <Navbar.Brand to="/" as={Link}>
          <img
            alt="Your Logo"
            src={logo}
            className="d-inline-block align-top w-50 h-70"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="text-lg whitespace-nowrap  space-x-4">
            <Nav.Link to="/" as={Link}>
              Home
            </Nav.Link>

            <Nav.Link to="/test" as={Link}>
              Tests
            </Nav.Link>
            {user && user.group == "admin" && (
              <NavDropdown title="Database" id="basic-nav-dropdown">
                <NavDropdown.Item to="/upload_questions" as={Link}>
                  Upload Questions
                </NavDropdown.Item>
                <NavDropdown.Item to="/create_categories" as={Link}>
                  Create New Category
                </NavDropdown.Item>
                <NavDropdown.Item to="/create_combined_categories" as={Link}>
                  Create New Comprehensive Category
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {user && (
              <Nav.Link to="/profile" as={Link} className="">
                {user.username}
              </Nav.Link>
            )}
            {user && user.group == "institute" && (
              <NavDropdown title="Dashboards" id="basic-nav-dropdown">
                <NavDropdown.Item to="/institution_dashboard" as={Link}>
                  {" "}
                  Management Dashboard
                </NavDropdown.Item>
                <NavDropdown.Item to="/db_analytical_dashboard" as={Link}>
                  DB Visualization Dashboard
                </NavDropdown.Item>{" "}
                <NavDropdown.Item to="/session_analytical_dashboard" as={Link}>
                  Session Visualization Dashboard
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>SubTests</NavDropdown.Item>
                <NavDropdown.Item>Focused Tests</NavDropdown.Item>
                <NavDropdown.Item>Comprehensive Tests</NavDropdown.Item>
              </NavDropdown>
            )}

            <Nav.Link to="#" as={Link} className="">
              Contact Us
            </Nav.Link>
            {user && (
              <Nav.Link
                to="/login"
                as={Link}
                className="mx-3"
                onClick={logoutUser}
              >
                logout
              </Nav.Link>
            )}
            {!user && (
              <Nav.Link to="/login" as={Link} className=" ">
                Login
              </Nav.Link>
            )}
            {!user && (
              <Nav.Link to="/register" as={Link} className=" ">
                Register
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
