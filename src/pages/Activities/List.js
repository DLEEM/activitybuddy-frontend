import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle, Button, ButtonToolbar } from 'reactstrap';
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
