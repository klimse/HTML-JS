"use strict";
// TODO: mapbox token
const MAPBOX_TOKEN = "pk.eyJ1Ijoia2F0aHJ5bmxpbSIsImEiOiJja2Z5dTR5NngxcWQ1MnVzOTh0dmNjNXJlIn0.TAErnGryS6Yn3-d5afm4xQ";
// TODO: WAQI token
const WAQI_TOKEN = "c48349f50e0b5231fd335284713114aca1dfeb70";

mapboxgl.accessToken = MAPBOX_TOKEN;

//global longitude and latitude variables
var lng = 0;
var lat = 0; 

//on page load, get user current location
if('geolocation' in navigator) {

    //if geolocation is available in browser, gets user's current position
    //user has to consent to share location with the browser
    navigator.geolocation.getCurrentPosition(
        (position) => {
        lat = position.coords.latitude;   //get latitude value
        lng = position.coords.longitude;   //get longitude value
        document.getElementById('latitude').textContent = lat;  
        document.getElementById('longitude').textContent = lng;
        }
    );
 
}else{  //if not, displays error message 
    document.getElementById('errorMessage').textContent = "Geolocation not available";
}

//declare new map object
let map = new mapboxgl.Map(
    {
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: 8
    });


//map boundaries
let bounds = [] 

//function to display a map centered at the current coordinates with appropriate zoom - displayMap
function displayMap(latitude,longitude) 
{
    map.on('render',function()
    {
        //using callback function 
        bounds = map.getBounds();
        bounds = bounds['_ne']['lat']+','+bounds['_ne']['lng']+','+bounds['_sw']['lat']+','+bounds['_sw']['lng'];
        let url ="";
        url += `https://api.waqi.info/map/bounds/?`;
        //WAQI API Token
        url +=`latlng=${bounds}&token=c48349f50e0b5231fd335284713114aca1dfeb70`;
        console.log(url)
        fetch(url)
            .then(function(response) 
            {
                return response.json();
    })
            .then(function(data) 
            {
                console.log(data.data[1]['aqi']);
                let dataG = data.data;
                dataG = dataG.slice(0,10);
                console.log(dataG);
            for (let i=0; i<dataG.length; i++)
            {
                let dataT = dataG[i];
                displayMarker(dataT);
            }
    })
  
//displays AQI markers within the map boundaries with corresponding colors
function displayMarker(data)
    {
        let lnglat=([data['lon'], data['lat']])
        if (data['aqi']<=50)
        {
            let marker = new mapboxgl.Marker({"color":"#00FF00"})
                .setLngLat(lnglat)
                .setPopup(new mapboxgl.Popup().setHTML('Name: '+data['station']['name']+" "+"<br />AQI: "+data['aqi']))
                .addTo(map);
            marker.togglePopup();
        }
        else if (data['aqi']>50 && data['aqi']<=100)
        {
            let marker = new mapboxgl.Marker({"color":"#FFE600"})
                .setLngLat(lnglat)
                .setPopup(new mapboxgl.Popup().setHTML('Name: '+data['station']['name']+" "+"<br />AQI: "+data['aqi']))
                .addTo(map);
            marker.togglePopup();
        }
        else if (data['aqi']>100 && data['aqi']<=150)
        {
            let marker = new mapboxgl.Marker({"color":"#FF8C00"})
                .setLngLat(lnglat)
                .setPopup(new mapboxgl.Popup().setHTML('Name: '+data['station']['name']+" "+"<br />AQI: "+data['aqi']))
                .addTo(map);
            marker.togglePopup();
        }
        else if (data['aqi']>150 && data['aqi']<=200) 
            {
            let marker = new mapboxgl.Marker({"color": "#e20b0b"})
                .setLngLat(lnglat)
                .setPopup(new mapboxgl.Popup().setHTML('Name: ' + data['station']['name'] + " " + "<br />AQI: " + data['aqi']))
                .addTo(map);
            marker.togglePopup();
        }
        else if (data['aqi']>200 && data['aqi']<=300)
        {
            let marker = new mapboxgl.Marker({"color":"#5826cb"})
                .setLngLat(lnglat)
                .setPopup(new mapboxgl.Popup().setHTML('Name: '+data['station']['name']+" "+"<br />AQI: "+data['aqi']))
                .addTo(map);
            marker.togglePopup();
        }
        else if (data['aqi']>300 && data['aqi']<=550)
        {
            let marker = new mapboxgl.Marker({"color":"#732922"})
                .setLngLat(lnglat)
                .setPopup(new mapboxgl.Popup().setHTML('Name: '+data['station']['name']+" "+"<br />AQI: "+data['aqi']))
                .addTo(map);
            marker.togglePopup();
        }
    }})
}

//button to pan to location (since set center does not work)
function panToLocation(){
    let location = [lng, lat];
	map.panTo(location);
}


displayMap(lat,lng);