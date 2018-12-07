import React, { Component } from 'react'
import AuthService from '../../services/AuthService'
import { Redirect } from 'react-router-dom'

class Register extends Component {
  constructor(props){
    super(props)
    this.auth = new AuthService()
    this.state = {
      registerSucces: false,
      errors: "",
      form: {
        user: {
          email: "ram_rancher@example.com",
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
    console.log('HEREEEEEEEEEE - onSubmit this.state.form', this.state.form)
    this.auth.register(this.state.form)
    .then(json => {
      console.log("Got to second then:", json)
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
    				<form onSubmit={this.onSubmit}>
    					<input
    						type="email"
    						name="email"
    						value={email}
    						onChange={this.onChange}
                required
    					/>
    					{this.state.errors.email && <div>Error: Email  {this.state.errors.email[0]}</div>}
    					<input
    						type="password"
    						name="password"
    						onChange={this.onChange}
                required
    					/>
              <input
    						type="password"
    						name="password_confirmation"
    						onChange={this.onChange}
                required
    					/>
              <input
                type="text"
                name="address1"
                value={address1}
                onChange={this.onChange}
                required
              />
              <input
                type="text"
                name="city"
                value={city}
                onChange={this.onChange}
                required
              />
              <input
                type="text"
                name="state"
                value={state}
                onChange={this.onChange}
                required
              />
              <input
                type="text"
                name="zipcode"
                value={zipcode}
                onChange={this.onChange}
                required
              />
    					{this.state.errors.password && <div>Error: Password  {this.state.errors.password[0]}</div>}
    					<button onSubmit={this.onSubmit}>Register</button>
    				</form>
    				{this.state.registerSuccess && <Redirect to="/activities" />}
			    </main>
        )
    }
}

export default Register
