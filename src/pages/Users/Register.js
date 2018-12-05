import React, { Component } from 'react'
import AuthService from '../../services/AuthService'
import { Redirect, Link } from 'react-router-dom'

class Register extends Component {
  constructor(props){
    super(props)
    this.auth = new AuthService()
    this.state = {
      registerSucces: false,
      errors: "",
      form: {
        user: {
          firstName: "Grant",
          lastName: "McDonald",
          email: "ram_rancher@example.com",
          password: "12345"
        }
      }
    }
  }
    render() {
      let { firstName, lastName, email, password } = this.state.form.user
        return (
          <main>
    				<h2>Welcome! Register here.</h2>
    				<form onSubmit={this.onSubmit}>
    					<input
    						type="text"
    						name="firstName"
    						value={firstName}
    						onChange={this.onChange}
                required
    					/>
    					<input
    						type="text"
    						name="lastName"
    						value={lastName}
    						onChange={this.onChange}
                required
    					/>
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
    						value={password}
    						onChange={this.onChange}
                required
    					/>
    					{this.state.errors.password && <div>Error: Password  {this.state.errors.password[0]}</div>}
    					<button onSubmit={this.onSubmit}>Register</button>
    				</form>
    				{this.state.registerSuccess && <Redirect to="/apartments" />}
			    </main>
        )
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
}

export default Register
