import React, { Component } from 'react';
import { editActivity, destroyActivity } from '../../services/clientToBackend';
import { Button, ButtonToolbar } from 'react-bootstrap';

class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activity: {},
      deleteSuccess: false,
      updateSuccess: false
    }
  }
  render() {
    return (
      <div className="App">
         {this.moderatorButtons()}
      </div>
    );
  }

  moderatorButtons = () => {
    if (this.props.modStatus) {
      return (
        <div>
          <Button variant="link" href={`/activities/${activity.id}/update`}>Edit</Button>
          <Button variant="link" href="/myprofile/update" onClick={destroyActivity()}>Delete</Button>
        </div>
      )
    }
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
}

export default Footer;
