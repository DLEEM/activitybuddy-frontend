import React, { Component } from 'react'
import AuthService from '../../services/AuthService'
import { editUser } from '../../services/clientToBackend';
import { Redirect } from 'react-router-dom'
import { Form, FormGroup, Col, FormControl, Button, ControlLabel } from 'react-bootstrap'

class EditProfile extends Component {
  constructor(props){
    super(props)
    this.auth = new AuthService()
    this.state = {
      registerSucces: false,
      errors: "",
      form: {
        user: {
        }
      }
    }
  }
  //componentDidMount for setting state as props
  onChange = (e) => {
    let { form } = this.state
    form.user[e.target.name] = e.target.value
    this.setState({ form })
  }

  //move this guy to App.js
  onSubmit = (e) => {
    e.preventDefault()
    editUser(this.state.user)
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
  //populate form with info from state so it can be edited
  render() {
    let { email, address1, city, state, zipcode } = this.state.form.user
      return (
        <main>

          <h2>Edit your profile information.</h2>

          <Form onSubmit={this.onSubmit}>

            <FormGroup>
              <Col componentClass={ControlLabel}>
                Email
              </Col>
              <Col>
                <FormControl
                  onChange={this.onChange}
                  name="email"
                  type="email"

                  value={this.props.email}
                  placeholder="email"
                  required/>
              </Col>
            </FormGroup>

            {this.state.errors.email && <div>Error: Email  {this.state.errors.email[0]}</div>}

            <FormGroup>
              <Col componentClass={ControlLabel}>
                Password
              </Col>
              <Col>
                <FormControl
                  onChange={this.onChange}
                  name="password"
                  type="password"
                  placeholder="password"
                  required/>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel}>
                Re-enter Password
              </Col>
              <Col>
                <FormControl
                  onChange={this.onChange}
                  name="password_confirmation"
                  type="password"
                  placeholder="password"
                  required/>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel}>
                Address 1
              </Col>
              <Col>
                <FormControl
                  onChange={this.onChange}
                  name="address1"
                  type="address1"
                  value={address1}
                  placeholder="address1"
                  required/>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel}>
                City
              </Col>
              <Col>
                <FormControl
                  onChange={this.onChange}
                  name="city"
                  type="city"
                  value={city}
                  placeholder="city"
                  required/>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel}>
                State
              </Col>
              <Col>
                <FormControl
                  onChange={this.onChange}
                  name="state"
                  type="state"
                  value={state}
                  placeholder="state"
                  required/>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel}>
                Zipcode
              </Col>
              <Col>
                <FormControl
                  onChange={this.onChange}
                  name="zipcode"
                  type="zipcode"
                  value={zipcode}
                  placeholder="zipcode"
                  required/>
              </Col>
            </FormGroup>

            {this.state.errors.password && <div>Error: Password  {this.state.errors.password[0]}</div>}

            <Button type="submit">Update Information</Button>

          </Form>

          {this.state.registerSuccess && <Redirect to="/activities" />}

        </main>
      )
  }
}

export default EditProfile
