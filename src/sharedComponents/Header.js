import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import AuthService from '../services/AuthService';
import { LinkContainer } from 'react-router-bootstrap'

class Header extends Component {
  constructor(props) {
    super(props)

    this.auth = new AuthService()
  }
  //move Create Activity and Update/Delete buttons to the activity component, only shown if logged in as moderator
  loginLogoutButton = () => {
    if(!this.auth.loggedIn()) {
      return(
        <Nav pullRight>

          <LinkContainer to="/register">
            <NavItem eventKey={3}>
              Register
            </NavItem>
          </LinkContainer>

          <LinkContainer to="/login">
            <NavItem eventKey={4}>
              Log-In
            </NavItem>
          </LinkContainer>

        </Nav>
      )
    } else {
      return (
        <Nav pullRight>


          <LinkContainer to="/myprofile">
            <NavItem eventKey={3}>
              View Profile
            </NavItem>
          </LinkContainer>

          <LinkContainer to="/about">
            <NavItem eventKey={4} onClick={this.props.logout}>
              Log-Out
            </NavItem>
          </LinkContainer>

        </Nav>
      )
    }
  }

  render() {
    return (
      <Navbar>

        <Navbar.Header>
          <Navbar.Brand>

          <LinkContainer to="/">
            <div>Activity Buddy</div>
          </LinkContainer>

          </Navbar.Brand>
        </Navbar.Header>

        <Nav>
          <LinkContainer to="/about">
            <NavItem eventKey={1}>
              About
            </NavItem>
          </LinkContainer>

          <LinkContainer to="/activities">
            <NavItem eventKey={2}>
              Activities
            </NavItem>
          </LinkContainer>

        </Nav>

        {this.loginLogoutButton()}

      </Navbar>
    );
  }

}

export default Header;
