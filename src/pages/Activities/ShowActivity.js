import React, { Component } from 'react';
import { getActivity } from '../../services/clientToBackend';

class ShowActivities extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activity: {}
    }
  }
  render() {
    console.log(this.state.activity)
    return (
      <div className="App">
        {this.state.activity === {} ? <div>No Activity Selected</div> : <div>{this.state.activity.name}</div>}
      </div>
    );
  }

  componentDidMount() {
    let index = this.props.match.params.id
    console.log(index)
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
