import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Form, FormGroup, Col, FormControl, Button, ControlLabel } from 'react-bootstrap'

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      form: {
        user: {}
      }
    }
  }
  render() {
    let { email, password } = this.state.form
      return (
          <div>
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
                {this.props.errors.email && <div>Error: Email {this.props.errors.email[0]}</div>}

                <FormGroup>
                  <Col componentClass={ControlLabel}>
                    Password
                  </Col>
                  <Col>
                    <FormControl onChange={this.onChange} name="password" type="password" value={password} placeholder="password" required/>
                  </Col>
                </FormGroup>
                {this.props.errors.password && <div>Error: Password  {this.props.errors.password[0]}</div>}

                <Button type="submit">Login</Button>
              </Form>
              {this.props.onLoginSuccess && <Redirect to="/" />}
            </div>
            <p>If you dont have an account, click <a href='/register'>here</a>.</p>
          </div>
      )
  }
  onChange = (e) => {
    let { form } = this.state
    form.user[e.target.name] = e.target.value
    this.setState({ form })
  }
  onSubmit = (e) => {
    console.log(this.props.onLogin)
    console.log(this.state.form)
    e.preventDefault()
    this.props.onLogin(this.state.form)
  }
}
export default Login
