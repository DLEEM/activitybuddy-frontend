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

        {this.state.activity === {}
        ? <div>No Activity Selected</div>
        : <div>{this.state.activity.name}</div>}

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

  componentDidMount() {
    let index = this.props.activityId
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
