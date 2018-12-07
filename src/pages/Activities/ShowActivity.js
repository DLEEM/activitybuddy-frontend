import React, { Component } from 'react';
import { getActivity, destroyActivity } from '../../services/clientToBackend';

class ShowActivities extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activity: {},
      deleteSuccess: false
    }
  }
  render() {
    console.log(this.state.activity)
    return (
      <div className="App">
        {this.state.activity === {} ? <div>No Activity Selected</div> : <div>{this.state.activity.name}</div>}
        <a href={`/activities/${this.state.activity.id}/update`}>Update</a>
        <a onClick={() => this.destroyActivity(this.state.activity.id)} href="/activities">Delete</a>
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
