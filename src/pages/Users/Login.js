import React, { Component } from 'react';
import { Redirect } from 'react-router';

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      loginSuccess: false,
      form: {
        user: {
          email: "",
          password: "",
        }
      }
    }
  }
  render() {
    let { email, password } = this.state.form
      return (
          <div>
            <div className="loginMain" >
              <form onSubmit={this.onSubmit}>
              <input
                type="email"
                name="email"
                value={email}
                placeholder="Enter Email Here"
                onChange={this.onChange}
              />
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Enter Password Here"
                onChange={this.onChange}
              />
              <button onSubmit={this.onSubmit}>Login</button>
              </form>
              {this.state.loginSuccess && <Redirect to="/" />}
            </div>
            <p>If you don't have an account, click <a href='/register'>here</a>.</p>
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
