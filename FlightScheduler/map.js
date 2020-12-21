/*
 *Purpose: This file contains the initialization for the Mapbox API, as well as the access token variable. The center of the map is set to 
 *			Melbourne, Australia as default.
 *Team: Team 130 for ENG 1003 S2 2020
 *Author: Kathryn Lim 32115245
 *Last Modified: 1st November 2020
 */

"use strict";

mapboxgl.accessToken = "pk.eyJ1Ijoia2F0aHJ5bmxpbSIsImEiOiJja2Z5dTR5NngxcWQ1MnVzOTh0dmNjNXJlIn0.TAErnGryS6Yn3-d5afm4xQ";

let map = new mapboxgl.Map({
	container: 'map',
	center: [144.9648731,-37.8182711],
	zoom: 8,
	style: 'mapbox://styles/mapbox/streets-v11'
});