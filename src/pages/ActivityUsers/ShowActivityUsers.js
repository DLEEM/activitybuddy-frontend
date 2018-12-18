import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle, Button, ButtonToolbar } from 'reactstrap';
import { getUser, getActivityUsers } from '../../services/clientToBackend';
import AuthService from '../../services/AuthService';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
const apiKey = 'AIzaSyDPJJChG0F7S36LTQrSy00ZwwDIZdVeghw';
const auth = new AuthService()

class ActivityUsers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {},
      currentUserCoordinates: {},
      buddies: [],
      buddiesCoordinates: [],
      center: {
        lat: 32.7096422,    //default downtown San Diego
        lng: -117.1579546
      },
      distances: [],
      orderedBuddies: []
    }
  }

  locateBuddies = () => {
    let buddies = []
    return this.state.buddies.map(buddy => {
      let address = `${buddy.address1} ${buddy.city} ${buddy.state} ${buddy.zipcode}`
      this.determineBuddyMarker(address)
      .then(json => {
        buddies.push(json.results[0].geometry.location)
        this.setState({
          buddiesCoordinates: buddies
        })
      })
    })
  }

  determineBuddyMarker = (address) => {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json'
    return fetch(url + '?address=' + address + '&key=' + apiKey)
    .then(resp => {
      let json = resp.json()
      return json
    })
    .catch(err => {
      console.log(err)
    })
  }

  showBuddyMarkers = () => {
    return this.state.buddiesCoordinates.map(buddyCoordinates => {
      return (
        <Marker id={"Buddy"} position={buddyCoordinates} />
      )
    })
  }

  setUser = () => {
    let user_id = auth.getUserId()
    getUser(user_id)
    .then(json => {
      this.setState({ currentUser: json })
    })
  }

  // determineUserMarker() sets this.state.currentUserCoordinates based on this.state.currentUser
  determineUserMarker = () => {
    this.setUser()
    let { currentUser } = this.state
    const address = `${currentUser.address1} ${currentUser.city} ${currentUser.state} ${currentUser.zipcode}`
    const url = 'https://maps.googleapis.com/maps/api/geocode/json'
    fetch(url + '?address=' + address + '&key=' + apiKey)
    .then(resp => {
      let json = resp.json()
      return json
    })
    .then(json => {
      this.setState({
        currentUserCoordinates: json.results[0].geometry.location // <-- to get obj containing lat/lng
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  // showUserMarker() runs when this.state.user is populated with lat/lng object
  showUserMarker = () => {
    return (
      <Marker
        id={"User"}
        position={this.state.currentUserCoordinates}
        icon={{
          url: 'https://i.imgur.com/XmTOxBK.png'
        }}
      />
    )
  }


  getDistances = () => {
    let buddiesLocations = this.state.buddies.map(buddy => {
      return `${buddy.address1} ${buddy.city} ${buddy.state} ${buddy.zipcode}`
    })
    let originPoints = []
    for (let i = 0; i < buddiesLocations.length; i++) {
        originPoints[i] = this.state.currentUserCoordinates
    }

    const service = new this.props.google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: originPoints,
        destinations: buddiesLocations,
        travelMode: 'DRIVING',
      },
      this.showDistances
    );
  }

  // callback function passed to getDistances()
  showDistances = (response, status) => {
    let { buddies } = this.state
    console.log(response)
    if (status === 'OK') {
      const numOfResults = response.rows[0].elements.length
      for (let i = 0; i < numOfResults; i ++) {
        buddies[i].distance = Math.floor(response.rows[0].elements[i].distance.value / 1609.344)      // response comes in meters, convert to miles
        console.log(Math.floor(response.rows[0].elements[i].distance.value / 1609.344))
      }
      this.setState({ buddies })
    }
  }

  sortBuddiesByDistances = (e) => {
    e.preventDefault()
    let ordered = this.state.buddies.sort(function (a, b) {
      return a.distance - b.distance
    })
    this.setState({ buddies: ordered })
  }


  render() {

    return (
      <div>


        <div style={{ maxHeight: '300px', maxWidth: '900px', height: '75vh', width: '100%', margin: '0 auto', position: 'relative'}} >
          <Map
          google={this.props.google}
          style={{ maxHeight: '300px', maxWidth: '900px', height: '75vh', width: '100%', margin: '0 auto', position: 'relative',}}
          className={'map'}
          initialCenter={this.state.center}
          zoom={11}
          >
            {this.state.currentUserCoordinates.lat ? this.showUserMarker() : this.determineUserMarker()}
            {this.state.buddiesCoordinates[0] ? this.showBuddyMarkers() : this.locateBuddies()
            }
            {this.state.distances.length === 0 ? this.getDistances() : ''}
          </Map>
        </div>


        <div className="List">
          <h3>Activity Buddies</h3>
          <form>
            <input type="submit" value="Sort Buddies" onClick={this.sortBuddiesByDistances} />
          </form>
          {this.state.buddies.length === 0 ? <div>No Users Found</div> :
            <div className="card-container">
              {this.state.buddies.map((buddy, id) => {
                return (
                  <div className="individual-card" key={id}>
                    <Card>
                      <CardBody>
                        <CardTitle>
                          {id+1}. {buddy.email}
                        </CardTitle>
                        <CardText>
                          Address: {buddy.address1} {buddy.city}, {buddy.state} {buddy.zipcode}<br/>
                          Distance: {buddy.distance} miles
                        </CardText>
                      </CardBody>
                    </Card>
                  </div>
                )
              })}
            </div>
          }
        </div>





      </div>
    )
  }

  componentDidMount() {
    const activity_id = this.props.match.params.id
    getActivityUsers(activity_id)
    .then(json => {
      console.log(json)
      this.setState({
        buddies: json
      })
    })
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDPJJChG0F7S36LTQrSy00ZwwDIZdVeghw')
})(ActivityUsers);
