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
        user: {}
      }
    }
  }
  
  componentDidMount() {
    const userObject = this.props.userObject
    this.setState({
      form: {
        user: userObject
      }
    })
  }

  onChange = (e) => {
    let { form } = this.state
    form.user[e.target.name] = e.target.value
    this.setState({ form })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.onUpdate(this.state.form)
  }
  
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
                  value={email}
                  required/>
              </Col>
            </FormGroup>

            {this.state.errors.email && <div>Error: Email  {this.state.errors.email[0]}</div>}

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
