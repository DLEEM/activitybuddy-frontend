import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
const apiKey = 'AIzaSyDPJJChG0F7S36LTQrSy00ZwwDIZdVeghw'

export class MapContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      center: {
        lat: 32.7096422,    //default downtown San Diego
        lng: -117.1579546
      },
      address: '',
      coordinatesArr: [
        {
          lat: 32.8328112,
          lng: -117.2712717
        },
        {
          lat: 32.6400541,
          lng: -117.0841955
        },
        {
          lat: 32.7565162,
          lng: -117.1122965
        }
      ],
      newCoordinates: {},
      distance: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      address:  e.target.value
    })
  }

  handleSearch = (e) => {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json'
    e.preventDefault()
    fetch(url + '?address=' + this.state.address + '&key=' + apiKey)
    .then(resp => {
      let json = resp.json()
      return json
    })
    .then(json => {
      console.log('json response::', json.results[0].geometry.location) // <-- to get obj containing lat/lng
      this.setState({
        newCoordinates: json.results[0].geometry.location
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  // not currently called anywhere, soon we will want this to add markers to the map based on new address input
  handleAddPointer = (e) => {
    let { coordinatesArr } = this.state
    const url = 'https://maps.googleapis.com/maps/api/geocode/json'
    e.preventDefault()
    fetch(url + '?address=' + this.state.address + '&key=' + apiKey)
    .then(resp => {
      let json = resp.json()
      return json
    })
    .then(json => {
      console.log('json response::', json.results[0].geometry.location) // <-- to get obj containing lat/lng
      coordinatesArr.push(json.results[0].geometry.location)
      this.setState({
        coordinatesArr: coordinatesArr
      })
    })
    .catch(err => {
      console.log(err)
    })

  }

  determineMarkers = () => {
    return this.state.coordinatesArr.map((coordinates, id) => {
      console.log(coordinates)
      return (
        <Marker name={id} position={coordinates} />
      )
    })
  }

  getDistances = () => {
    let origin = this.state.center
    const destination = this.state.newCoordinates;
    const service = new this.props.google.maps.DistanceMatrixService();

    service.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode: 'DRIVING',
      },
      this.showDistances
    );
  }

  // callback function passed to getDistances()
  showDistances = (response, status) => {
    if (status === 'OK') {
      const distanceResult = response.rows[0].elements[0].distance.text
      this.setState({
        distance: distanceResult
      })
    }
  }

  render() {
    return (
      <div className="mapPage">
        <form>
          <input type="text" name="address" onChange={this.handleChange}/>
          <input type="submit" name="submit" onClick={this.handleSearch} />
        </form>
        <div className="map">
          <Map
          google={this.props.google}
          style={{ maxHeight: '500px', maxWidth: '500px', height: '75vh', width: '70%', margin: '0 auto' }}
          initialCenter={this.state.center}
          zoom={11}
          >
          {this.determineMarkers()}
          </Map>
        </div>
        <div className="distances">
        Distance Between You and Downtown: {this.state.distance}
          {this.getDistances()}
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDPJJChG0F7S36LTQrSy00ZwwDIZdVeghw')
})(MapContainer)
