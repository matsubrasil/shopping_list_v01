import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from 'reactstrap';
import PropTypes from 'prop-types';

import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';
import LoginModal from './auth/LoginModal';

const Header = ({ auth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { isAuthenticated, user } = auth;

  const authLinks = (
    <React.Fragment>
      <NavItem>
        <span className="navbar-text mr-3">
          <strong>{user ? `Welcome ${user.name}` : null} </strong>
        </span>
      </NavItem>
      <NavItem>
        <Logout />
      </NavItem>
    </React.Fragment>
  );

  const guestLinks = (
    <React.Fragment>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </React.Fragment>
  );
  return (
    <Navbar color="dark" dark expand="sm" className="mb-5">
      <Container>
        <NavbarBrand href="/">Shopping List</NavbarBrand>
        <NavbarToggler onClick={() => toggle()} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {isAuthenticated ? authLinks : guestLinks}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};
Header.propTypes = {
  auth: PropTypes.object.isRequired,
  //error: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  //error: state.error,
});

export default connect(mapStateToProps, null)(Header);
