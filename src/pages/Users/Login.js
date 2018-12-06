import React, { Component } from 'react'
import AuthService from '../../services/AuthService'
import { Redirect } from 'react-router'

class Login extends Component {
  constructor(props){
    super(props)
    this.auth = new AuthService()
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
      return (
          <div>
            <div className="loginMain" >
              <form onSubmit={this.onSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Enter Email Here"
                onChange={this.onChange}
              />
              <input
                type="password"
                name="password"
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
    e.preventDefault()
    this.auth.login(this.state.form)
    .then(json => {
      console.log("Got to second then:", json)
      if(json.errors) {
        this.setState({
          errors: json.errors
        })
      }else{
        this.props.checkLogin()
        this.setState({
          loginSuccess: true
        })
      }
    })
    .then(err => {
    console.log(err);
  })
  }
}
export default Login
