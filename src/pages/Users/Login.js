import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Form, FormGroup, Col, FormControl, Button, ControlLabel } from 'react-bootstrap'

import AuthService from '../../services/AuthService'

class Login extends Component {
  constructor(props) {
    super(props)
		this.state = {
			form: {
				user: {
					email: "",
					password: "",
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
		this.props.login(this.state.form)
  }

  render() {
    let { email, password } = this.state.form.user
      return (
          <div>
            <strong style={{color: "red"}}>{this.props.errorMessage}</strong>

            <div className="loginMain" >
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Col componentClass={ControlLabel}>
                    Email
                  </Col>
                  <Col>
                    <FormControl onChange={this.onChange} name="email" type="email" value={email} placeholder="email" required/>
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col componentClass={ControlLabel}>
                    Password
                  </Col>
                  <Col>
                    <FormControl onChange={this.onChange} name="password" type="password" value={password} placeholder="password" required/>
                  </Col>
                </FormGroup>

                <Button type="submit">Login</Button>
              </Form>
              {this.props.loginSuccess && <Redirect to="/" />}
            </div>

            <p>If you do not have an account, click <a href='/register'>here</a>.</p>
          </div>
      )
  }

}
export default Login
