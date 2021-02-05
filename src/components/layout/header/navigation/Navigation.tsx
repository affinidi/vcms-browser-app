import React, {useContext, useEffect, useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {Container, Nav, Navbar, NavbarBrand} from 'react-bootstrap'
import {routes} from 'constants/routes'
import 'components/layout/header/navigation/Navigation.scss'
import {AuthContext} from '../../../../App';

const LayoutHeaderNavigation = () => {
  const [showNavbar, setShowNavbar] = useState<boolean>(false);

  // In order to fix the "findDOMNode" warning in the navbar collapse component,
  // a custom toggle control function was implemented. Currently, some bootstrap components
  // are not up-to-date with React standards, and this is considered a quick-fix until
  // bootstrap components are updated.
  return (
    <Navbar expand="lg"
            onToggle={value => setShowNavbar(!showNavbar)}
            expanded={false}
            bg='light'
    >
      <Container>
        <NavbarBrand>
          <Link to={routes.ROOT}>
            <img src='https://via.placeholder.com/200x60?text=Your logo' alt='Your logo'/>
          </Link>
        </NavbarBrand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse className={showNavbar ? 'show' : ''}>
          <Nav className="justify-content-end">
            <Nav.Item>
              <Nav.Link as={NavLink} activeClassName='is-active' to={routes.SIGNUP}>Sign Up</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} activeClassName='is-active' to={routes.LOGIN}>Login</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default LayoutHeaderNavigation
