import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import { getUserData } from './services/clientToBackend.js'
import './App.css';

import Home from './pages/Home';
import About from './pages/About';
import List from './pages/Activities/List';
import ShowActivity from './pages/Activities/ShowActivity';
import CreateActivity from './pages/Activities/CreateActivity';
import UpdateActivity from './pages/Activities/UpdateActivity';

import Login from './pages/Users/Login';
import Register from './pages/Users/Register';
import EditProfile from './pages/Users/EditProfile';

import Header from './sharedComponents/Header';
import Footer from './sharedComponents/Footer';

import AuthService from './services/AuthService';

import ActivityUsers from './pages/ActivityUsers/ShowActivityUsers';

class App extends Component {
  constructor(props) {
    super(props)
    this.auth = new AuthService()
    this.state = {
      loginSuccess: false,
      user: {}
    }
  }

  login = (user) => {
    this.auth.login(user)
    .then(json => {
      console.log("Got to second then:", json)
      if (json.errors) {
        this.setState({
          errors: json.errors
        })
      } else {
        this.setState({
          loginSuccess: true,
          user: json
        })
        console.log("This is the state after login: ", this.state)
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  componentDidMount() {
    if (this.auth.getToken()) {
      let user_id = this.auth.getUserId()
      getUserData(user_id)
      .then((json) => {
        this.setState({
          user: json
        })
      })
    }
  }

  render() {
    return (
      <div className="App">
            <Router >
              <div>
                <Header />

                {(this.auth.loggedIn() && this.state.user.moderator) //This is where we will need to also check that the user is a moderator

                  // if logged in
                ?  <Switch>
                    <Route exact path="/activities/:id/users" component={ActivityUsers} />
                    <Route exact path="/activities/:id/update" component={UpdateActivity} />
                    <Route exact path="/activities/new" component={CreateActivity} />
                    <Route exact path="/activities/:id" component={ShowActivity} />
                    <Route exact path="/activities" component={List} />
                    //EditProfile is a placeholder route, replace with users/:id/update
                    <Route exact path="/editprofile" component={EditProfile} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" render={(props) => <Login onLogin={this.login} onLoginSuccess={this.state.loginSuccess} />} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/" component={Home} />
                  </Switch>

                  // if not logged in
                :  <Switch>
                      <Route exact path="/activities/:id" component={ShowActivity} />
                      <Route exact path="/activities" component={List} />
                      <Route exact path="/register" component={Register} />
                      <Route exact path="/login" render={(props) => <Login onLogin={this.login} onLoginSuccess={this.state.loginSuccess} />} />
                      <Route exact path="/about" component={About} />
                      <Route exact path="/" component={Home} />
                    </Switch>}
              </div>
            </Router>
        <Footer />
      </div>
    );
  }



}

export default App;
