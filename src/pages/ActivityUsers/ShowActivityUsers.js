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
    return (
      <div className="App">
        Activity Users
        {this.state.users.length == 0 ? <div>No Users Found</div> :
          <div>{this.state.users[0].email}</div>}
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
