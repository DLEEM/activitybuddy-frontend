import React, { Component } from 'react';
import { getActivity, destroyActivity } from '../../services/clientToBackend';
import { Button, ButtonToolbar } from 'react-bootstrap';

class ShowActivities extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activity: {},
      deleteSuccess: false
    }
  }
  render() {
    return (
      <div className="App">
      Activity

        {this.state.activity === {}
        ? <div>No Activity Selected</div>
        : <div>{this.state.activity.name}</div>}

        <ButtonToolbar>
          {this.moderatorButtons()}
          <Button variant="link" href={`/activities/${this.state.activity.id}/users`}>See Buddies</Button>
        </ButtonToolbar>
      </div>
    );
  }

  destroyActivity = (id) => {
    destroyActivity(id)
    .then(json => {
      this.setState({
        deleteSuccess: true
      })
      this.props.refresh()
    })
  }

  moderatorButtons = () => {
    if (this.props.modStatus) {
      return (
        <div>
          <Button variant="link" href="/myprofile/update">Edit</Button>
          <Button variant="link" href="/myprofile/update">Delete</Button>
        </div>
      )
    }
  }

  userButtons = () => {

  }

  componentDidMount() {
    let index = this.props.match.params.id
    getActivity(index)
    .then(activity => {
      this.setState({
        activity
      })
    })
    .catch(err => {
      console.log('ERROR::', err)
    })
  }
}

export default ShowActivities;
