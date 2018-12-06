import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import AuthService from '../services/AuthService';

class Header extends Component {
  constructor(props) {
    super(props)

    this.auth = new AuthService()
  }

  loginLogoutButton = () => {
    if(!this.auth.loggedIn()) {
      return(
        <Nav pullRight>
          <NavItem eventKey={3} href="/login">
            Log-In
          </NavItem>
          <NavItem eventKey={4} href="/register">
            Register
          </NavItem>
        </Nav>
      )
    } else {
      return (
        <Nav pullRight>
          <NavItem eventKey={3} href="/" onClick={this.auth.logout}>
            Log-Out
          </NavItem>
        </Nav>
      )
    }
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Activity Buddy</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="/about">
            About
          </NavItem>
          <NavItem eventKey={2} href="/activities">
            See All Activities
          </NavItem>
        </Nav>

        {this.loginLogoutButton()}

      </Navbar>
    );
  }

}

export default Header;
