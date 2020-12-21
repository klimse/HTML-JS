/*
 *Purpose: This file contains the generic function to generate JSONP queries, given a URL and a callback function.
 *Author: Monash University Malaysia ENG1003
 *Team: Team 130 for ENG 1003 S2 2020
 *Last Modified: 1st November 2020
 */

 //this function generates a JSONP query in the html file 
function webServiceRequest(url,data)
{
	// Build URL parameters from data object.
    let params = "";
    // For each key in data object...
    for (let key in data)
    {
        if (data.hasOwnProperty(key))
        {
            if (params.length == 0)
            {
                // First parameter starts with '?'
                params += "?";
            }
            else
            {
                // Subsequent parameter separated by '&'
                params += "&";
            }

            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(data[key]);

            params += encodedKey + "=" + encodedValue;
         }
    }
    let script = document.createElement('script');
    script.src = url + params;
    document.body.appendChild(script);
}
