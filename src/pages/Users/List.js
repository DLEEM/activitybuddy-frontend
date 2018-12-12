import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle, Button } from 'reactstrap';
import { getUsers } from '../../services/clientToBackend';


class UserIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [{name: "Dakota"},
      {name: "Leila"},
      {name: "Erik"}]
    }
  }

  render() {
    return (
      <div className="App">
        USER INDEX:
        <div className="card-container">
          {console.log(this.state.users)}
          {this.state.users.map((user, index) => {
            return (
              <div className="individual-card" key={index}>
                <Card>
                  <CardBody>
                    <CardTitle>{user.name}</CardTitle>
                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                    <Button href={`/users/${user.id}`}>More Details</Button>
                  </CardBody>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    );
  }

  // componentDidMount() {
  //   getUsers()
  //   .then(userList => {
  //     this.setState({
  //       users: userList
  //     })
  //   })
  // }
}

export default UserIndex;
