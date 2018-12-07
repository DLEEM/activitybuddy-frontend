import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getActivity, editActivity } from '../../services/clientToBackend';
import { Form, FormGroup, Col, FormControl, Button, ControlLabel } from 'react-bootstrap'

class UpdateActivity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      successActivity: false,
      activity: {
        name: ""
      }
    }
  }

  render() {
    return (
      <div>
        <Form horizontal onSubmit={this.onSubmit}>
          <FormGroup controlId="formHorizontalName">
            <Col componentClass={ControlLabel}>
              Name of Activity
            </Col>
            <Col>
              <FormControl onChange={this.onChange} name="name" type="text" value={this.state.activity.name} placeholder="Name of Activity" />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col>
              <Button type="submit">
                Update Activity
              </Button>
            </Col>
          </FormGroup>
        </Form>
        {this.state.successActivity && <Redirect to="/activities" /> }
      </div>
    );
  }

  onSubmit = (e) => {
    e.preventDefault()
    editActivity(this.state.activity)
    .then(json => {
      if (json.errors) {
        console.log("ERRORS", json.errors)
        this.setState({ errors: json.errors })
      } else {
        console.log("i am else")
        this.setState ({ successActivity: true })
      }
    })
  }

  onChange = (e) => {
    let {activity} = this.state
    activity[e.target.name] = e.target.value
    this.setState ({ activity })
  }

  componentDidMount = () => {
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

export default UpdateActivity;
