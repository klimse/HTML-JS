/*
begin

declare function addDay(numDays), where parameter numDays is number of days to be incremented
    create Date() object assigned to variable now
    print current date
    add numDays to now
    print date after addition
end function

in main
declare number of days to be incremented
call function addDay

end
*/

"use strict";


function addDay(numDays){
    let now = new Date();


    console.log("Current Date: " + now.toDateString());

    now.setDate(now.getDate() + numDays);
    
    console.log("Date after " + numDays + " days: " + now.toDateString());

    return now;
}

//testcase
let numDays = 10;

addDay(numDays);

