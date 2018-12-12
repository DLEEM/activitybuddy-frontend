import React, { Component } from 'react'
import { Carousel } from 'react-bootstrap';

class Home extends Component {
  render() {
    return (
      <div className="carousel">
        <Carousel>

          <Carousel.Item>
            <img width={900} height={500} alt="I'm broken" src="https://i.imgur.com/a0MI9xd.jpg" />
            <Carousel.Caption>
              <h3>Hiking</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img width={900} height={500} alt="I'm broken" src="https://i.imgur.com/hri7TvY.jpg" />
            <Carousel.Caption>
              <h3>Driving</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img width={900} height={500} alt="I'm broken" src="https://i.imgur.com/vrtWW0z.jpg" />
            <Carousel.Caption>
              <h3>Skiing</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img width={900} height={500} alt="I'm broken" src="http://i.imgur.com/aGOtmF9.jpg" />
            <Carousel.Caption>
              <h3>Raiding</h3>
            </Carousel.Caption>
          </Carousel.Item>

        </Carousel>
      </div>
    );
  }
}

export default Home;
