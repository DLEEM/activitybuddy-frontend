const BASE = "http://localhost:3001"

let getActivities = function() {
  return fetch(BASE + '/activities')
    .then(resp => {
      let json = resp.json()
      return json
    })
}

let getActivity = function(id) {
  return fetch(BASE + `/activities/${id}`)
    .then(resp => {
      console.log(resp)
      let json = resp.json()
      return json
    })
}

let getUserActivities = function(user_id) {
  return fetch(BASE + `/users/${user_id}/activities`)
    .then(resp => {
        let json = resp.json()
        return json
      })

}

let createActivity = function(activity) {
  console.log(activity);
  return fetch(BASE + `/activities`, {
    body: JSON.stringify(activity),
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST"
  })
    .then((resp) => {
      let json = resp
      console.log(json);
      return json
    })
}

let destroyActivity = function(id) {
  console.log(id);
  return fetch(BASE + `/activities/${id}`, {
    body: JSON.stringify(id),
    headers: {
      'Content-Type': 'application/json'
    },
    method: "DELETE"
  })
    .then((resp) => {
      let json = resp
      console.log(json);
      return json
    })
}

let editActivity = function(activityObject) {
  console.log(activityObject.id);
  return fetch(BASE + `/activities/${activityObject.id}`, {
    method: "PATCH",
    body: JSON.stringify(activityObject),
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

//OwO help me
let editUser = function(user) {
  console.log(user.id);
  return fetch(BASE + `/users/${user.id}`, {
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


export {
  getActivities,
  getActivity,
  getUserActivities,
  destroyActivity,
  editActivity,
  editUser,
  createActivity
}
