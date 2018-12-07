import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle, Button } from 'reactstrap';
import { getActivities } from '../../services/clientToBackend';


class ActivityIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activities: []
    }
  }

  render() {
    return (
      <div className="App">
        ACTIVITY INDEX:
        <div className="card-container">
          {this.state.activities.map((activity, index) => {
            return (
              <div className="individual-card">
                <Card>
                  <CardBody>
                    <CardTitle>{activity.name}</CardTitle>
                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
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

  componentDidMount() {
    getActivities()
    .then(activityList => {
      this.setState({
        activities: activityList
      })
    })
  }
}

export default ActivityIndex;
