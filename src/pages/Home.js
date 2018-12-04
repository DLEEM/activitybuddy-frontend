import React, { Component } from 'react'
import { Carousel } from 'react-bootstrap';
import '../App.css';

class Home extends Component {
  render() {
    return (
      <Carousel>
        <Carousel.Item>
          <img width={900} height={500} alt="I'm broken" src="https://i.imgur.com/1SQFi1I.jpg" />
          <Carousel.Caption>
            <h3>Hiking</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img width={900} height={500} alt="I'm broken" src="https://i.imgur.com/1SQFi1I.jpg" />
          <Carousel.Caption>
            <h3>Swimming</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img width={900} height={500} alt="I'm broken" src="https://i.imgur.com/1SQFi1I.jpg" />
          <Carousel.Caption>
            <h3>World of Warcraft</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}

export default Home;
