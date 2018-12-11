import React, { Component } from 'react'
import AuthService from '../../services/AuthService'
import { editUser } from '../../services/clientToBackend';
import { Redirect } from 'react-router-dom'

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

  onChange = (e) => {
    let { form } = this.state
    form.user[e.target.name] = e.target.value
    this.setState({ form })
  }

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

    render() {
      let { email, address1, city, state, zipcode } = this.state.form.user
        return (
          <main>
    				<h2>Edit Your Profile Information.</h2>
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
    				{this.state.registerSuccess && <Redirect to="/" />}
			    </main>
        )
    }
}

export default EditProfile
