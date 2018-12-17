// hard coded activities to state, commented out componentDidMount()

import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle, Button, ButtonToolbar } from 'reactstrap';
//import { getActivities } from '../../services/clientToBackend';


class ActivityIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activities: [
        {
          id: 1,
          name: 'Hiking'
        },
        {
          id: 2,
          name: 'Driving'
        },
        {
          id: 3,
          name: 'Skiing'
        },
        {
          id: 4,
          name: 'Cooking'
        },
        {
          id: 5,
          name: 'Gardening'
        },
        {
          id: 6,
          name: 'Clubbing'
        },
      ]
    }
  }

  render() {
    return (
      <div className="App">
        <ButtonToolbar>
          {this.moderatorButtons()}
        </ButtonToolbar>
          <div className="card-container">
            {this.state.activities.map((activity, index) => {
              return (
                <div className="individual-card" key={index}>
                  <Card>
                    <CardBody>
                      <CardTitle>{activity.name}</CardTitle>
                      <CardText>BOTTOM TEXT</CardText>
                      <Button href={`/activities/${activity.id}`}>More Details</Button>
                    </CardBody>
                  </Card>
                </div>
              )
            })}
          </div>
      </div>
    );
  }

  moderatorButtons = () => {
    console.log(this.props.modstatus);
    if (this.props.modStatus) {
      return (
        <div>
          <Button variant="link" href="/activities/new">Create Activity</Button>
        </div>
      )
    }
  }

  // componentDidMount() {
  //   getActivities()
  //   .then(activityList => {
  //     this.setState({
  //       activities: activityList
  //     })
  //   })
  // }
}

export default ActivityIndex;
