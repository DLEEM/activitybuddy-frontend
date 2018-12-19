import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';

class LoginRegisterButtons extends Component {
  render() {
    return (
      <div className="App">
         <p>You must be a member to find buddies.</p>
         <ButtonToolbar>
         <Button
           variant="link"
           href="/login">
           Log In
         </Button>

            <Button
              variant="link"
              href="/register">
              Register
            </Button>
         </ButtonToolbar>
      </div>
    );
  }
}

export default LoginRegisterButtons;
