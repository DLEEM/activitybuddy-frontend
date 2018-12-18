import AuthService from './AuthService'
const BASE = process.env.REACT_APP_API_URL

//Activities Requests
let getActivities = function() {
  return fetch(BASE + '/activities')
    .then(resp => {
      let json = resp.json()
      return json
    })
}

let getActivity = function(id) {
  return getAuthService().authFetch(BASE + `/activities/${id}`)
    .then(resp => {
      let json = resp.json()
      return json
    })
}

// LME:: do we actually want/need this function? getActivityUsers() makes more sense to me
let getUserActivities = function(user_id) {
  return fetch(BASE + `/users/${user_id}/activities`)
    .then(resp => {
        let json = resp.json()
        return json
      })
}

let getActivityUsers = function(activity_id) {
  return getAuthService().authFetch(BASE + `/activities/${activity_id}/users`)
    .then(resp => {
      let json = resp.json()
      return json
    })
}

let createActivity = function(activity) {
  console.log("AUTHSERVICEGET", getAuthService())
  return getAuthService().authFetch(BASE + `/activities.json`, {
    body: JSON.stringify(activity),
    method: "POST"
  })
    .then((resp) => {
      return resp
    })
}

let destroyActivity = function(id) {
  return fetch(BASE + `/activities/${id}`, {
    body: JSON.stringify(id),
    headers: {
      'Content-Type': 'application/json'
    },
    method: "DELETE"
  })
    .then((resp) => {
      let json = resp
      return json
    })
}

let editActivity = function(activityObject) {
  return fetch(BASE + `/activities/${activityObject.id}`, {
    method: "PATCH",
    body: JSON.stringify(activityObject),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(json => {
    return json
  })
}

//Users Requests
let getUsers = function() {
  return fetch(BASE + '/users')
    .then(resp => {
      let json = resp.json()
      return json
    })
}

let getUser = function(id) {
  return fetch(BASE + `/users/${id}`)
    .then(resp => {
      let json = resp.json()
      return json
    })
}

let editUser = function(user) {
  let user_id = getAuthService().getUserId()
  console.log(user_id);
  return getAuthService().authFetch(BASE + `/users/${user_id}`, {
    method: "PATCH",
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(resp => {
    let json = resp
    console.log(json.errors);
    return json
  })
}

//Utility Stuff
let getUserData = function(user_id) {
  return getAuthService().authFetch(BASE + `/users/${user_id}`)
  .then(resp => {
    let json = resp.json()
    return json
  })
}

const getAuthService = function() {
  return new AuthService()
}

export {
  getActivities,
  getActivity,
  createActivity,
  destroyActivity,
  editActivity,
  getUserActivities,
  getUser,
  getUsers,
  editUser,
  getUserData,
  getActivityUsers
}
