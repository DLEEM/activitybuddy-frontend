import React, { Component } from 'react'
import AuthService from '../../services/AuthService'
import { Redirect } from 'react-router-dom'
import { Form, FormGroup, Col, FormControl, Button, ControlLabel } from 'react-bootstrap'

class Register extends Component {
  constructor(props){
    super(props)
    this.auth = new AuthService()
    this.state = {
      registerSucces: false,
      errors: "",
      form: {
        user: {
          email: "tester@example.com",
          password: "123456",
          password_confirmation: "123456",
          address1: "123 Main St.",
          city: "San Diego",
          state: "CA",
          zipcode: "92102"
        }
      }
    }
  }

  onChange = (e) => {
    let { form } = this.state
    form.user[e.target.name] = e.target.value
    this.setState({ form })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.auth.register(this.state.form)
    .then(json => {
      if(json.errors) {
        this.setState({
          errors: json.errors
        })
      }
      this.setState({
        registerSuccess: true
      })
    })
  }

    render() {
      let { email, address1, city, state, zipcode } = this.state.form.user
        return (
          <main>
    				<h2>Welcome! Register here.</h2>
    				<Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Col componentClass={ControlLabel}>
                  Email
                </Col>
                <Col>
                  <FormControl onChange={this.onChange} name="email" type="email" value={email} placeholder="email" required/>
                </Col>
              </FormGroup>
    					{this.state.errors.email && <div>Error: Email  {this.state.errors.email[0]}</div>}

              <FormGroup>
                <Col componentClass={ControlLabel}>
                  Password
                </Col>
                <Col>
                  <FormControl onChange={this.onChange} name="password" type="password" placeholder="password" required/>
                </Col>
              </FormGroup>

              <FormGroup>
                <Col componentClass={ControlLabel}>
                  Re-enter Password
                </Col>
                <Col>
                  <FormControl onChange={this.onChange} name="password_confirmation" type="password" placeholder="password" required/>
                </Col>
              </FormGroup>

              <FormGroup>
                <Col componentClass={ControlLabel}>
                  Address 1
                </Col>
                <Col>
                  <FormControl onChange={this.onChange} name="address1" type="address1" value={address1} placeholder="address1" required/>
                </Col>
              </FormGroup>

              <FormGroup>
                <Col componentClass={ControlLabel}>
                  City
                </Col>
                <Col>
                  <FormControl onChange={this.onChange} name="city" type="city" value={city} placeholder="city" required/>
                </Col>
              </FormGroup>

              <FormGroup>
                <Col componentClass={ControlLabel}>
                  State
                </Col>
                <Col>
                  <FormControl onChange={this.onChange} name="state" type="state" value={state} placeholder="state" required/>
                </Col>
              </FormGroup>

              <FormGroup>
                <Col componentClass={ControlLabel}>
                  Zipcode
                </Col>
                <Col>
                  <FormControl onChange={this.onChange} name="zipcode" type="zipcode" value={zipcode} placeholder="zipcode" required/>
                </Col>
              </FormGroup>

    					{this.state.errors.password && <div>Error: Password  {this.state.errors.password[0]}</div>}
    					<Button type="submit">Register</Button>
    				</Form>
    				{this.state.registerSuccess && <Redirect to="/activities" />}
			    </main>
        )
    }
}

export default Register
