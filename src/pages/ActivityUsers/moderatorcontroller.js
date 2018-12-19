import React, { Component } from 'react';
import { getActivity, editActivity, destroyActivity } from '../../services/clientToBackend';
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
      <ButtonToolbar>

        <Button
        variant="link"
        href={`/activities/${this.state.activity.id}/update`}>
        Edit
        </Button>

        <Button
        variant="link"
        onClick={destroyActivity(this.state.activity.id)}>
        Delete
        </Button>

      </ButtonToolbar>
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

export default Footer;
