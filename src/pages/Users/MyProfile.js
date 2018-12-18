import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { getUserData } from '../../services/clientToBackend';
import AuthService from '../../services/AuthService';

class YourProfile extends Component {
  constructor(props) {
    super(props)
    this.auth = new AuthService()
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    let user_id = this.auth.getUserId()
    getUserData(user_id)
    .then(user => {
      this.setState({
        user: user
      })
    })
    .catch(err => {
      console.log('ERROR::', err)
    })
  }

  render() {
    console.log();
    return (
      <div className="text-center">
        {this.state.user.email}<br/>
        {this.state.user.address1}<br/>
        {this.state.user.city}<br/>
        {this.state.user.state}<br/>
        {this.state.user.zipcode}<br/>

        <ButtonToolbar>
          <Button variant="link" href="/myprofile/update">Edit</Button>
        </ButtonToolbar>
      </div>
    );
  }
}

export default YourProfile;
