/*
begin
declare fahrenheit as some value

declare function fahrenheitToCelsius(fahrenheit)
declare celcius
celcius = fahrenheit - 32 multiplied by (5/9)
fix celcius to 3 decimal places
return result

output result

end
*/

"use strict";

function fahrenheitToCelsius(fahrenheit)
{
  //  let celcius= 0;

  let celcius = (fahrenheit - 32) * (5/9);
    let converted = celcius.toFixed(3);

    return converted;
 
}

//test case
let fahrenheit = 90;
console.log("Temperature in celcius: " + fahrenheitToCelsius(fahrenheit));
