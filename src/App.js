import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { getUserData } from './services/clientToBackend';
import { editUser } from './services/clientToBackend';
import './App.css';

import Home from './pages/Home';
import About from './pages/About';
import List from './pages/Activities/List';
import ShowActivity from './pages/Activities/ShowActivity';
import CreateActivity from './pages/Activities/CreateActivity';
import UpdateActivity from './pages/Activities/UpdateActivity';

import Login from './pages/Users/Login';
import Register from './pages/Users/Register';
import MyProfile from './pages/Users/MyProfile';
import EditProfile from './pages/Users/EditProfile';
import ShowUser from './pages/Users/ShowUser';

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
      errors: "",
      user: {},
      errorMessage: ""
    }
  }


  login = (user) => {
    this.auth.login(user)
    .then(json => {
      console.log("got to second then:", json)
      if (json.errors) {
        console.log("errors", json.errors);
        this.setState({
          errors: json.errors
        })
      } else {
        this.setState({
          loginSuccess: true,
          user: json
        })
      }
    })
    .catch(err => {
      let {errorMessage} = this.state
      console.log(err);
      this.setState({errorMessage: "Invalid email and/or password"})
    })
  }

  updateProfile = (user) => {
    console.log(user);
    editUser(user)
    .then(json =>{
      if(json.errors) {
        this.setstate({
          errors: json.errors
        })
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

  logout = () => {
    this.auth.logout()
    this.setState({
      loginSuccess: false
    })
  }

  render() {
    return (
      <div className="App">
        <Router >
          <div>
            <Header logout={this.logout}/>

             {(this.auth.loggedIn() && this.state.user.moderator)
                ?  <Switch>
                    <Route exact path="/activities/:id/users" component={ActivityUsers} />
                    <Route exact path="/activities/:id/update" component={UpdateActivity} />
                    <Route exact path="/activities/new" component={CreateActivity} />
                    <Route exact path="/activities/:id" component={ShowActivity} />
                    <Route exact path="/activities" component={List} />
                    <Route exact path="/users/:id" component={ShowUser} />
                    //EditProfile is a placeholder route, replace with users/:id/update
                    <Route
                      exact path="/activities/new"
                      render={(props) => <CreateActivity />}
                    />
                    <Route
                      exact path="/activities/:id"
                      render={(props) => <ShowActivity
                      modStatus={this.state.user.moderator} />}
                    />
                    <Route
                      exact path="/activities"
                      render={(props) => <List
                      modStatus={this.state.user.moderator} />}
                    />
                    <Route
                      exact path="/myprofile/update"
                      render={(props) => <EditProfile
                      userObject={this.state.user}
                      onUpdate={this.updateProfile} />}
                    />
                    <Route exact path="/myprofile" component={MyProfile} />
                    <Route exact path="/register" component={Register} />
                    <Route
                      exact path="/login"
                      render={(props) => <Login
                      login={this.login}
                      loginSuccess={this.state.loginSuccess} errorMessage={this.state.errorMessage}/>}
                    />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/" component={Home} />
                  </Switch>


                :  <Switch>
                      <Route exact path="/activities/:id" component={ShowActivity} />
                      <Route exact path="/activities" component={List} />
                      <Route exact path="/register" component={Register} />
                      <Route exact path="/login"
                        render={(props) => <Login
                        login={this.login}
                        loginSuccess={this.state.loginSuccess}
                        errorMessage={this.state.errorMessage} />}
                      />
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
