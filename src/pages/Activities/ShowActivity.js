// hard coded values in the componentDidMount()

import React, { Component } from 'react';
//import { getActivity, destroyActivity } from '../../services/clientToBackend';
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

  // destroyActivity = (id) => {
  //   destroyActivity(id)
  //   .then(json => {
  //     this.setState({
  //       deleteSuccess: true
  //     })
  //     this.props.refresh()
  //   })
  // }

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
    if (index === 1) {
      this.setState({ activity: { id: 1, name:'Hiking'} })
    } else if (index === 2) {
      this.setState({ activity: { id: 1, name:'Driving'} })
    } else if (index === 3) {
      this.setState({ activity: { id: 1, name:'Skiing'} })
    } else if (index === 4) {
      this.setState({ activity: { id: 1, name:'Cooking'} })
    } else if (index === 5) {
      this.setState({ activity: { id: 1, name:'Gardening'} })
    } else {
      this.setState({ activity: { id: 1, name:'Clubbing'} })
    }
    // getActivity(index)
    // .then(activity => {
    //   this.setState({
    //     activity
    //   })
    // })
    // .catch(err => {
    //   console.log('ERROR::', err)
    // })
  }
}

export default ShowActivities;
