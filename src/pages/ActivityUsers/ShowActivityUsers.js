import React, { Component } from 'react';
import { getActivityUsers } from '../../services/clientToBackend';

class ActivityUsers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }


  render() {
    console.log(this.state.users)
    return (
      <div className="App">
        Activity Users
        {this.state.users.length == 0 ? <div>No Users Found</div> :
          this.state.users.map(user => {
            return (
              <div>{this.state.users[0].email}<br/>
                Address: {user.address1} {user.city}, {user.state} {user.zipcode}
              </div>
            )
          })}
      </div>
    )
  }

  componentDidMount() {
    const activity_id = this.props.match.params.id
    getActivityUsers(activity_id)
    .then(json => {
      this.setState({
        users: json
      })
    })
  }
}

export default ActivityUsers;
