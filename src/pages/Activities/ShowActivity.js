import React, { Component } from 'react';
import { getActivity } from '../../services/clientToBackend';
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
        {this.state.activity === {}
        ? <div>No Activity Selected</div>
        : <div>{this.state.activity.name}</div>}

        <ButtonToolbar>
          <Button variant="link" href={`/activities/${this.state.activity.id}/users`}>See Buddies</Button>
        </ButtonToolbar>
      </div>
    );
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
