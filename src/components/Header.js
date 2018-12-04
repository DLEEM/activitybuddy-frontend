import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class Header extends Component {
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
        <Nav className="pull-right">
          <NavItem eventKey={3} href="#">
            Login
          </NavItem>
          <NavItem eventKey={4} href="#">
            Register
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
