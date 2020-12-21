/*
 *Purpose:  This file contains shared code that contains the trip index key, and trip data key, and the 3 classes: userlist, user, and trips.
 *Team: Team 130 for ENG 1003 S2 2020
 *Author: Kathryn Lim 32115245, Ahmad Sinan (31167470)
 *Last Modified: 1 November 2020
 */

"use strict"
//Constants used as KEYS for LocalStorage
const TRIP_INDEX_KEY = "tripIndex";
const TRIP_DATA_KEY = "tripLocalData";
const USER_DATA_KEY = "userLocalData";
const USER_INDEX_KEY = "userIndex";

//Trips class
class Trips {
  constructor(id) {
    this._id = id           //unique trip id
    this._date = ""         //start date of the trip
    this._country = ""      //country the trip is in
    this._airport = []      //list of airports taken
    this._scheduled = false //is trip scheduled?
  }

  //accessors
  get id() {
    return this._id
  }

  get date() {
    return this._date
  }

  get country() {
    return this._country
  }

  get airport() {
    return this._airport
  }

  get scheduled() {
    return this._scheduled
  }

  //mutators
  set id(newID) {
    this._id = newID
  }

  set date(newDate) {
    this._date = newDate
  }

  set country(country) {
    this._country = country
  }

  set airport(airport) {
    this._airport = airport
  }

  set scheduled(scheduled) {
    this._scheduled = scheduled
  }

  //fromData method
  fromData(data) {
    this._id = data._id
    this._date = data._date
    this._country = data._country
    this._airport = data._airport
    this._scheduled = data._scheduled
  }
}

//User class
class User {
  constructor(username) {
    this._username = username
    this._email = ""
    this._password = ""
    this._trips = []
    this._isGuest = true
  }

  //accessors
  //returns username
  get username() {
    return this._username
  }

  //returns email
  get email() {
    return this._email
  }

  get password() {
    return this._password
  }

  //returns trip array
  get trips() {
    return this._trips
  }

  //returns number of trips
  get count() {
    return this._trips.length
  }

  get isGuest() {
    return this._isGuest
  }

  //mutators
  set username(newUsername) {
    this._username = newUsername
  }

  set email(newEmail) {
    this._email = newEmail
  }

  set password(newPassword) {
    this._password = newPassword
  }

  set isGuest(state) {
    this._isGuest = state
  }

  //methods
  //creates new instance of Trip with provided id and adds it to _trips array
  addTrip(id) {
    let newTrip = new Trips(id)

    this._trips.push(newTrip) //pushes newLocker onto lockers array
  }

  //returns the Trip at index position of the _trips array
  getTrip(index) {
    return this._trips[index]
  }

  //removes the Trip with the specified id from the _trips array
  removeTrip(id) {
    for (let i = 0; i < this.count; i++) {
      if (this._trips[i]._id == id) {
        this._trips.splice(i, 1)
      }
    }
  }

  //from data to parse from string
  fromData(data) {
    this._trips = data._trips
  }
}

//UserList class
class userList {
  constructor() {
    this._users = [] //array of User
    this._isGuest = false //if the user is guest
  }

  //accessors
  //returns a user array
  get users() {
    return this._users
  }

  //returns length of user array
  get count() {
    return this._users.length
  }

  get isGuest() {
    return this._isGuest
  }

  //methods
  //creates new instance of user with provided id and adds it to _users array
  addUser(username) {
    let newUser = new User(username)

    this._users.push(newUser) //pushes newUser onto _users array
  }

  //returns the Locker at index posn of the _lockers array
  getUsers(index) {
    return this._users[index]
  }

  //removes the Locker with the specified id from the _lockers array
  removeUser(username) {
    for (let i = 0; i < this.count; i++) {
      if (this._users[i]._username == username) {
        this._users.splice(i, 1)
      }
    }
  }

  fromData(data) {
    this._users = data._users
  }
}

// Global userList instance variable
let users = new userList()

//checkIfDataExistsLocalStorage()
//
//This function checks if the browser used supports Local Storage.
//
//argument: There is no argument for this function
//
//returns:  This function returns true if user data key exists, false if it does not.
function checkIfDataExistsLocalStorage() {
  let keyData = localStorage.getItem(USER_DATA_KEY)

  if (typeof keyData !== "undefined") {
    if (keyData !== null) {
      if (keyData !== undefined) {
        if (keyData === "") {
          return false
        } else {
          return true
        }
      } else {
        return false
      }
    } else {
      return false
    }
  } else {
    return false
  }
}

//updateTripLocalStorage()
//
//This function updates the trip key in the LocalStorage with a trip object.
//
//argument: data: A Trip object.
//
//returns:  This function does not return anything.
function updateTripLocalStorage(data) {
  data = JSON.stringify(data)
  localStorage.setItem(TRIP_DATA_KEY, data)
}

//updateUserLocalStorage()
//
//This function updates the user key in the LocalStorage with a user object.
//
//argument: data: A User object.
//
//returns:  This function does not return anything.
function updateUserLocalStorage(USER_DATA_KEY, data) {
  data = JSON.stringify(data)
  localStorage.setItem(USER_DATA_KEY, data)
}

//getTripDataLocalStorage()
//
//This function retrieves the value at the trip data key.
//
//argument: This function has no arguments.
//
//returns:  This function returns the Trip object at the key.
function getTripDataLocalStorage() {
  let data = localStorage.getItem(TRIP_DATA_KEY)

  try {
    data = JSON.parse(data)
  } catch (error) {
    console.log(error)
  } finally {
    return data
  }
}

//getUserDataLocalStorage()
//
//This function retrieves the value at the user data key.
//
//argument: This function has no arguments.
//
//returns:  This function returns the User object at the key.
function getUserDataLocalStorage(USER_DATA_KEY) {
  let data = localStorage.getItem(USER_DATA_KEY)

  try {
    data = JSON.parse(data)
  } catch (error) {
    console.log(error)
  } finally {
    return data
  }
}

//Checks if data exists in the LocalStorage upon page load.
if (checkIfDataExistsLocalStorage()) {
  users.fromData(getUserDataLocalStorage()) //retrieves pre-existing users from LocalStorage
  Trips.fromData(getTripDataLocalStorage()) //retreives pre-existing trips from LocalStorage
}