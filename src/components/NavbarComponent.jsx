import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

export default function NavbarComponent({ user, handleLogout, loggedIn }) {
  return (
    <Navbar bg="dark" variant="dark" className="mb-3">
      <Container>
        <Navbar.Brand>
          <NavLink
            to={loggedIn ? "/dashboard" : "/"}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <b>FarmEazy</b> Admin Portal
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {loggedIn ? (
            <Nav>
              <Navbar.Text>
                Signed in as:{" "}
                {user && <b style={{ color: "white" }}>{user.firstname}</b>}
              </Navbar.Text>
              &emsp;
              <Nav.Link onClick={handleLogout}>Sign Out</Nav.Link>
            </Nav>
          ) : (
            ""
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
