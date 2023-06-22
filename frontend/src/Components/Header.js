import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../features/userLoginSlice";
import { useDispatch, useSelector } from "react-redux";
import { getContactsReset } from "../features/contactByUserSlice";

const Header = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userLogin.userInfo);

  const logOutHandler = () => {
    dispatch(logout());
    dispatch(getContactsReset());
  };
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Contacts app</Navbar.Brand>
        </LinkContainer>
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="d-flex justify-content-end"
          >
            <Nav>
              {userInfo && userInfo.nombre ? (
                <NavDropdown
                  title={`${userInfo.nombre}`}
                  id="basic-nav-dropdown"
                >
                  <LinkContainer to={`/profile/${userInfo._id}`}>
                    <NavDropdown.Item>Perfil</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logOutHandler}>
                    Cerrar Sesion
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user" /> Iniciar Sesion
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Container>
    </Navbar>
  );
};

export default Header;
