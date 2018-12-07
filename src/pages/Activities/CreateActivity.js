import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createActivity } from '../../services/clientToBackend';
import { Form, FormGroup, Col, FormControl, Button, ControlLabel } from 'react-bootstrap'

class CreateActivity extends Component {
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
                Create Activity
              </Button>
            </Col>
          </FormGroup>
        </Form>
        {this.state.successActivity && <Redirect to="/activities" /> }
      </div>
    );
  }

  onChange = (e) => {
    let {activity} = this.state
    activity[e.target.name] = e.target.value
    this.setState ({ activity })
  }

  onSubmit = (e) => {
    e.preventDefault()
    createActivity(this.state.activity)
    .then(json => {
      console.log("got to the second then:", json)
      if (json.errors) {
        console.log("ERRORS", json.errors)
        this.setState({ errors: json.errors })
      } else {
        console.log("i am else")
        this.setState ({ successActivity: true })
      }
    })
  }
}

export default CreateActivity;
