"use strict";
mapboxgl.accessToken = "pk.eyJ1Ijoia2F0aHJ5bmxpbSIsImEiOiJja2Z5dTR5NngxcWQ1MnVzOTh0dmNjNXJlIn0.TAErnGryS6Yn3-d5afm4xQ";

let map = new  mapboxgl.Map({
	 container: 'map',
	center: [144.9648731,-37.8182711],
	zoom: 16,
	style: 'mapbox://styles/mapbox/streets-v9'
});

let locations = [
    {
		coordinates: [145.135507, -37.896817],
        description: 'Australia Post Mount Waverley'
    },	
    {
		coordinates: [145.123612, -37.920469],
        description: 'Monash Medical Centre',
        packageNum: '368975142',
        signatureReq: 'Yes',
        addressee: 'Dr. Tan'
    },	
    {
		coordinates: [145.13203, -37.915669],
        description: 'Mannix College',
        packageNum: '875412847',
        signatureReq: 'Yes',
        addressee: 'Mr. Nisal'
    },	
    {
		coordinates: [145.142785, -37.905812],
        description: 'Rusden House',
        packageNum: '698547158',
        signatureReq: 'No',
        addressee: 'Ms. White'
	},
	{
		coordinates: [ 145.131971, -37.906071],
        description: 'CSIRO Clayton',
        packageNum: '314587585',
        signatureReq: 'Yes',
        addressee: 'Prof. Jon'
	}
];

function panToMtWaverley()
{
    let mountWaverley = [145.135507, -37.896817];
	map.panTo(mountWaverley);
}

function showPath(){

    //polyline path object
    let object = {
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

    for(let i = 0; i < locations.length; i++)
    {
    object.data.geometry.coordinates.push(locations[i].coordinates);
    }

    map.addLayer({
    id: "routes",
    type: "line",
    source: object,
    layout: { "line-join": "round", "line-cap": "round" },
    paint: { "line-color": "#888", "line-width": 6 }
    });

}


//display markers
for (let i = 0; i < locations.length; i++)
{
	let location = locations[i];
	let marker = new mapboxgl.Marker({ "color": "#FF8C00" });
    marker.setLngLat(location.coordinates);

    let popup = new mapboxgl.Popup({ offset: 45});
    let text = "";


    if(i ==0 ){
        text = "location:" + location.description;
    }else{
         text = 'Name: '
                + location.addressee
                + '<br/>location: '
                + location.description
                + '<br/>Order #: '
                + location.packageNum 
                + '<br/>Sign req: ' 
                + location.signatureReq;
    }

    popup.setHTML(text);

	marker.setPopup(popup)

	// Display the marker.
	marker.addTo(map);

	// Display the popup.
	popup.addTo(map);
}


