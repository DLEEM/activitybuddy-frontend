import React, { Component } from 'react';
import { getUser } from '../../services/clientToBackend';

class ShowUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    let index = this.props.match.params.id
    console.log(index)
    getUser(index)
    .then(user => {
      this.setState({
        user
      })
    })
    .catch(err => {
      console.log('ERROR::', err)
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.user === {} ? <div>No User Selected</div> :
        <div>
        {this.state.user.email}<br/>
        {this.state.user.address1}<br/>
        {this.state.user.city}<br/>
        {this.state.user.state}<br/>
        {this.state.user.zipcode}
        </div>}
      </div>
    );
  }
}

export default ShowUser;
