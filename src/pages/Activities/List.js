import React, { Component } from 'react';
import { Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

class ActivityIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activities: [
        { name: 'Swim' },
        { name: 'Hike' },
        { name: 'WoW' },
        { name: 'Ram Ranch' }
      ]
    }
  }

  render() {
    return (
      <div className="App">
        ACTIVITY INDEX:
        {this.state.activities.map((activity, index) => {
          return (
            <div className="card-container">
              <Card>
                <CardBody>
                  <CardTitle>{activity.name}</CardTitle>
                  <CardSubtitle>Card subtitle</CardSubtitle>
                  <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                  <Button>Button</Button>
                </CardBody>
              </Card>
            </div>
          )
        })}
      </div>
    );
  }
}

export default ActivityIndex;
