/*
 *Purpose: This file contains the functions to schedule and save a trip. It includes date, country, and airport selection, Mapbox-associated functions,
 *           and queries to the airport, routes, and allRoutes APIs.
 *Team: Team 130 for ENG 1003 S2 2020
 *Author: Kathryn Lim 32115245
 *Last Modified: 1 November 2020
 */

"use strict"

let localAirportData = [];                  //airport data of a domestic country
let localDestinationAirportsList = [];      //local destination airports
let airports = [];                          //all airports selected, forms the route of the trip.
let selectedCountry = "";                   //selected country
let markerArray = [];                       //array of airport markers
let localDestinationAirports = [];          //to store local destination airports objs
let selectedDate = "";                      //selected date string
let routeID = [];                           //array to hold IDs of selected routes
let pathID = [];                            //array to hold IDs of displayed routes
let sourceAirport = {                       //source airport object. updates whenever a new route is added
    name: "",
    city: "",
    airportId: "",
    longitude: 0,
    latitude: 0
};

//webServiceRequest()
//
//This function generates JSONP queries
//
//argument: url: a string that represents an API to request data from
//
//argument: data: an object that contains a key and its value, and a callback function
//                  to display the results from the API.
//returns:  appends a JSONP query in the HTML file.
function webServiceRequest(url, data) {
    // Build URL parameters from data object.
    let params = "";
    // For each key in data object...
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            if (params.length == 0) {
                // First parameter starts with '?'
                params += "?";
            } else {
                // Subsequent parameter separated by '&'
                params += "&";
            }

            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(data[key]);

            params += encodedKey + "=" + encodedValue;
            console.log(params);
        }
    }
    let script = document.createElement('script');
    script.src = url + params;
    document.body.appendChild(script);

}

//confirmCountry()
//
//This function is bounded to the "Confirm Country" button. Gets country input from user. 
// calls getAirports() function to query the Airports API for list of airports within the country.
//
//argument: There is no argument for this function
//returns:  This function does not return anything.
function confirmCountry() {
    let countryRef = document.getElementById("country");
    selectedCountry = countryRef.value;

    alert("Country Selected. Please select a source airport.");
    getAirports();
}

//getAirports()
//
//This function calls webServiceRequest() to make a request to Airports API to get list of airports within a country
//
//argument: There is no argument for this function
//returns:  This function does not return anything.
function getAirports() {

    let url = `https://eng1003.monash/OpenFlights/airports/`;
    let data = {
        country: selectedCountry,
        callback: "showAirports"
    }

    webServiceRequest(url, data);
}

//showAirports()
//
//This callback function generates the datalist for the list of airports within a country, given an array of airport objects.
//
//argument: data: array of airport objects from the Airports API.
//returns:  This function does not return anything.
function showAirports(data)
{
    let output = "";
    localAirportData = data; //assign the airport list to global airports variable

    for (let i = 0; i < data.length; i++) {
        output += `<option value="${data[i].airportId}" label = "${data[i].name}"> </option>`;
    }

    let listRef = document.getElementById("airportList");
    listRef.innerHTML = output;
}

//nextAirport()
//
//This function gets the subsequent airports, makes it the "new source airport" and sends a query to routes API.
//
//argument: There is no argument for this function
//returns:  This function does not return anything.
function nextAirport() {
    let airportRef = document.getElementById("airportNext"); //get source airport id selected from input
    let airport = airportRef.value; //airport id

    removeMarkers();

    nextAirport = { //reinitalize source airport to prevent leftover data
        name: "",
        city: "",
        airportId: "",
        longitude: 0,
        latitude: 0
    };

    for (let i = 0; i < localAirportData.length; i++) {
        if (localAirportData[i].airportId == airport) { //if airportId in data matches the selected airport ID, assigns values into the object
            nextAirport.name = localAirportData[i].name;
            nextAirport.city = localAirportData[i].city;
            nextAirport.airportId = localAirportData[i].airportId;
            nextAirport.longitude = localAirportData[i].longitude;
            nextAirport.latitude = localAirportData[i].latitude;
            break;
        }
    }

    airports.push(nextAirport);     //pushes the airport to the airports array.

    let airportCoords = [nextAirport.longitude, nextAirport.latitude];
    map.panTo(airportCoords);           //pans to the aiport.

    let url = ` https://eng1003.monash/OpenFlights/routes/`; //routes API to get list of routes from airport

    let data = {
        sourceAirport: airport,
        callback: "showCountryAirports" //all domestic airports
    }

    webServiceRequest(url, data);
}


//confirmAirport()
//
//This function runs on click of the confirm airport button. This is the starting point in panning routes.
//Gets the selected airport id, map pans to source airport, shows routes from the airport.
//Queries routes API to get routes from selected airports
//
//argument: There is no argument for this function
//returns:  This function does not return anything.
function confirmAirport() {
    let airportRef = document.getElementById("airport"); //get source airport id selected from input
    let airport = airportRef.value; //airport id

    airports.splice(0, airports.length); //clears the airport array
    removeMarkers();

    sourceAirport = { //reinitalize source airport to prevent leftover data
        name: "",
        city: "",
        airportId: "",
        longitude: 0,
        latitude: 0
    };

    //assigns needed values to the selected airport from data retrieved from the Airports API
    for (let i = 0; i < localAirportData.length; i++) {
        if (localAirportData[i].airportId == airport) { //if airportId in data matches the selected airport ID, assigns values into the object
            sourceAirport.name = localAirportData[i].name;
            sourceAirport.city = localAirportData[i].city;
            sourceAirport.airportId = localAirportData[i].airportId;
            sourceAirport.longitude = localAirportData[i].longitude;
            sourceAirport.latitude = localAirportData[i].latitude;
            break;
        }
    }

    airports.push(sourceAirport); //adds airport to airports array

    let airportCoords = [sourceAirport.longitude, sourceAirport.latitude];
    map.panTo(airportCoords);


    let url = ` https://eng1003.monash/OpenFlights/routes/`; //routes API to get list of routes from source airport

    let data = {
        sourceAirport: airport,
        callback: "showCountryAirports" //all source airports
    }

    webServiceRequest(url, data);
}

//removeMarkers()
//
//This function removes existing markers on the map to make way for new markers.
//
//argument: There is no argument for this function
//returns:  This function does not return anything.
function removeMarkers() {
    if (markerArray.length > 0) {
        for (let i = markerArray.length - 1; i >= 0; i--) {
            markerArray[i].remove();    //removes the markers by its ID.
        }
        markerArray.splice(0, markerArray.length); //clears the marker Array
    }
}

//showCountryAirports()
//
//This function shows routes to connected airports from the source airport.
//Filters out international airports. 
//
//argument: data : Routes objects from source airport, returned from the Routes API
//
//returns:  This function does not return anything.
function showCountryAirports(data) {
    //object to store local airport data
    let localAirportsObj = {
        name: "",
        city: "",
        airportId: "",
        longitude: 0,
        latitude: 0
    };

    //array to store all destination airports, regardless of domesticity
    let destinationAirports = [];

    let locals = []; //array of local airport objects
    localDestinationAirports = []; //reinitialize localDestinationAirports array

    //get all destination airports
    for (let u = 0; u < data.length; u++) {
        destinationAirports[u] = data[u].destinationAirportId; //airport ID
    }

    //get local destination airports for comparison to the destination airports
    for (let i = 0; i < localAirportData.length; i++) {
        localAirportsObj.name = localAirportData[i].name;
        localAirportsObj.city = localAirportData[i].city;
        localAirportsObj.airportId = localAirportData[i].airportId;
        localAirportsObj.latitude = localAirportData[i].latitude;
        localAirportsObj.longitude = localAirportData[i].longitude;

        locals.push(localAirportsObj); //push object into array of local airports
        localAirportsObj = { //initialize all values to 0
            name: "",
            city: "",
            airportId: "",
            longitude: 0,
            latitude: 0
        };
    }

    let count = 0; //counter for localDestinationAirports array

    for (let x = 0; x < locals.length; x++) //sorts destination airports to have local airports only, pushed to the localDestinationAirports[] array
    {
        for (let p = 0; p < destinationAirports.length; p++) {
            if (locals[x].airportId == destinationAirports[p]) {
                localDestinationAirports[count] = locals[x];
                count++;
            }
        }
    }


    localDestinationAirports.unshift(sourceAirport); //pushes source airport to the first element of localDestinationAirports

    localDestinationAirports = [...new Set(localDestinationAirports)]; //filters out repeat routes


    let output = ""; //to fill datalist for next airport
    for (let i = 0; i < localDestinationAirports.length; i++) {
        output += `<option value="${ localDestinationAirports[i].airportId}" label = "${ localDestinationAirports[i].name}"> </option>`;
    }


    if (localDestinationAirports.length < 1) { //alert message if there's no domestic flights from the chosen airport
        alert("No domestic flights for this airport!");
    }

    let listRef = document.getElementById("airportListNext");
    listRef.innerHTML = output;

    //displays the markers on airports
    for (let b in localDestinationAirports) {
        displayMarkers(localDestinationAirports[b]);
    }

    //draws polyline between markers
    showPath(localDestinationAirports);

}


//removePaths()
//
//This function removes route paths in the map.
//
//argument: This function has no arguments
//
//returns:  This function does not return anything.
function removePaths() {
    if (pathID.length > 0) {
        for (let i = 0; i < pathID.length; i++) {
            map.removeLayer(pathID[i]);
            map.removeSource(pathID[i]);
        }
        pathID.splice(0, pathID.length); //clears all pathIDs
    }
}

//displayMarkers()
//
//This function displays airport markers and its attached popup in the map.
//
//argument: location: array of airport objects. Contains the airport's name, coordinates, id, and city to be displayed with the marker.
//
//returns:  This function does not return anything.
function displayMarkers(location) {
    let marker = new mapboxgl.Marker({
        "color": "#FF0000"
    }); //red marker
    let lnglat = [location.longitude, location.latitude];
    marker.setLngLat(lnglat);
    let popup = new mapboxgl.Popup({
        offset: 45,
        closeOnClick: false
    });

    //sets text within popup
    let text = 'Airport: ' + location.name + '<br/>City: ' + location.city + '<br/>Airport ID: ' + location.airportId;
    popup.setHTML(text);
    marker.setPopup(popup);

    marker.addTo(map);          //Display the marker
    popup.addTo(map);           //display the popup
    markerArray.push(marker);   //adds markers to an array for keeping track
}

//showPath(localDestinationAirports)
//
//This function creates line objects to be places between the airport markers according to their coordinates.
//
//argument: localDestinationAirports: Array of filtered airport objects. Only domestic airports for a specific country are shown.
//
//returns:  This function does not return anything.
function showPath(localDestinationAirports) {
    let source = {};
    removePaths(); //removes previous paths

    source = localDestinationAirports[0]; //first element in array is the source airport
    let coordsSource = [source.longitude, source.latitude]; //lnglat for source aiport

    pathID = []; //reinitialize pathID to contain new paths.

    //polyline path object
    let lineObject = {
        type: "geojson",
        data: {
            type: "Feature",
            properties: {},
            geometry: {
                type: "LineString",
                coordinates: []
            }
        }
    };

    for (let j = 1; j < localDestinationAirports.length; j++) //loop starts from 2nd element in array, since 1st element is the source
    {
        let coords = [];
        coords = [localDestinationAirports[j].longitude, localDestinationAirports[j].latitude];
        lineObject.data.geometry.coordinates.push(coordsSource); //pushes source airport coords
        lineObject.data.geometry.coordinates.push(coords); //pushes next destination airport coords (coords in array alternate between source and destination)

        map.addLayer({
            id: localDestinationAirports[j].airportId, //let id be the airportID
            type: "line",
            source: lineObject,
            layout: {
                "line-join": "round",
                "line-cap": "round"
            },
            paint: {
                "line-color": "#888",
                "line-width": 6
            }
        });

        pathID.push(localDestinationAirports[j].airportId); //push the airportIDs to pathID array
    }

}

//confirmDate()
//
//This function is called onclick of the "Confirm Date" button. Takes in the date input from the user.
//Filters out past dates and empty dates. Creates alert messages to confirm user's actions.
//
//argument: This function has no arguments.
//
//returns:  This function does not return anything.
function confirmDate() {
    let date = new Date();
    let today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(); //gets today's date yyyy/mm/dd format

    selectedDate = "";
    let selectedDateRef = document.getElementById("tripDate");
    selectedDate = selectedDateRef.value;

    if (selectedDate < today && selectedDate != "") //if selected date is before today's date and is not empty
        alert("Error: Cannot select past dates!")
    else if (selectedDate == "") //if no date is selected
        alert("Please select a date!");
    else
        alert("Date selected. Please select a country.");
}

//addNewTrip()
//
//This function adds the new trip object to the user. Assigns date, country, airports array, and sets scheduled 
//to true for the trip. Updates Local Storage at the user key. Only valid if user is logged in.
//If user is a guest user, an alert will show to prompt them to log in.
//
//argument: This function has no arguments.
//
//returns:  This function does not return anything.
function addNewTrip() {

    updateUserLocalStorage(user);

    if (user._isGuest == false) {
        let index = user._trips.length + 1; //sets id number
        user.addTrip(index);

        user._trips[index - 1]._date = selectedDate;
        user._trips[index - 1]._country = selectedCountry;
        user._trips[index - 1]._airport = airports;
        user._trips[index - 1]._scheduled = true;

        console.log(user._trips[index]);
        updateUserLocalStorage(user);
    } else {
        alert("Please log in or create an account to save trip!");
    }
}



//Code that runs on page load
let countriesList = document.getElementById("countries");
let countriesOutput = "";

//populates countries datalist with countries from the country library
for (let i = 0; i < countryData.length; i++) {
    countriesOutput += `<option value="${countryData[i]}">`;
}

//appends to the country datalist
countriesList.innerHTML = countriesOutput;

//Event listener for Confirm Date
let dateRef = document.getElementById("confirmDate");
dateRef.addEventListener("click", confirmDate);

//Event listener for Save Trip.
let saveTripRef = document.getElementById("saveTrip");
saveTripRef.addEventListener("click", addNewTrip);