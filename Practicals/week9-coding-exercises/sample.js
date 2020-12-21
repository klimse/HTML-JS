"use strict";

//Map Box API token
mapboxgl.accessToken = "pk.eyJ1Ijoia2F0aHJ5bmxpbSIsImEiOiJja2Z5dTR5NngxcWQ1MnVzOTh0dmNjNXJlIn0.TAErnGryS6Yn3-d5afm4xQ";
//defining a new container map
let map = new mapboxgl.Map
({
    container: "map",
    center: [0, 0],
    zoom: 10,
    style: "mapbox://styles/mapbox/streets-v9",
});

//checking if geolocation is able to detect a location
if ("geolocation" in navigator)
{
    //using a callback function to obtain the user's current location - getCurrentPosition()
    //if geolocation is available
    navigator.geolocation.getCurrentPosition((position) =>
    {
        //setting map to be centered
        map.setCenter
        ({
            //defining the position of latitude and longitude
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });
        newBounds(map);
    });
}
//if geolocation is not available
else
{
    alert("Geolocation failed to get a position.");
}

//function to obtain coordinate boundaries - newBounds()
function newBounds(map)
{
    //defining the variables for coordinate boundaries and direction
    let coordBounds = map.getBounds();
    let north = coordBounds.getNorth();
    let east = coordBounds.getEast();
    let south = coordBounds.getSouth();
    let west = coordBounds.getWest();
    let boundsURL = north + "," + east + "," + south + "," + west;
    //defining the WAQI API token
    let token = "c48349f50e0b5231fd335284713114aca1dfeb70";
    let url = "https://api.waqi.info/map/bounds/?token=";
    //printing output for the encoded key and data - concatinating the callbak function
    let webService = url + encodeURIComponent(token) + "&latlng=" + encodeURIComponent(boundsURL) + "&callback=displayMarker";
    let script = document.createElement("script");
    script.src = webService;
    document.body.appendChild(script);
}

//function to display markers on the coordinates obtained
function displayMarker(data)
{
    let errorMessage = document.getElementById("errorMessage");
    //checking if the station's coordinate is detected within the region
    if (data == "" || data == null)
    {
        errorMessage.innerHTML = "No station is detected within this region. Try zooming out.";
    }
    else
    {
        for (let i = 0; i < data.data.length; i++)
        {
            let station = data.data[i];
            //defining the marker color
            let color = "";
            //checking for the AQI values for the markers
            if (station.aqi < 51)
            {
                color = "green";
            }
            else if (station.aqi < 101)
            {
                color = "yellow";
            }
            else if (station.aqi < 151)
            {
                color = "orange";
            }
            else if (station.aqi < 201)
            {
                color = "red";
            }
            else if (station.aqi < 301)
            {
                color = "purple";
            }
            else
            {
                color = "maroon";
            }
            //creating markers to set the city's coordinates
            let marker = new mapboxgl.Marker({"color": color});
            let lnglat = [station.lon, station.lat];
            marker.setLngLat(lnglat);
            //creating a popup with an offset of 45 
            let popup = new mapboxgl.Popup({ offset: 45 });
            //locating the name of stations from the API and the AQI obtained
            let output = "";
            output += `Station: ${station.station.name}<br>`;
            output += `AQI: ${station.aqi}`;
            //printing output on HTML file
            popup.setHTML(output);
            //attaching the popup to the markers
            marker.setPopup(popup);
            //adding the markers onto the map
            marker.addTo(map);
            //adding the popup onto the map
            popup.addTo(map);
        }
    }
}

//if zoom changes - run code
map.on('zoomend',function()
{
    newBounds(map);
})