/*
begin

declare function daySuffix(day). receives day parameter and checks if it is a valid integer, then assigns appropriate suffix
    if(day == 1 OR day ends with 1 OR day is not eleven)
        return day with "st" suffix
        else if(day ==2 OR day ends with 2 OR day is not twelve)
            return day with "nd" suffix
            else if(day ==3 OR day ends with 3 OR dat is not thirteen)
                return day with "rd" suffix
                else if(day is a valid integer between 0 and 31)
                    return day with "th" suffix
                    else
                        return day and null


in main
initialize test case 
declare empty string output
for (i = 0; i<=31; i++){
    assign output to output from daySuffix with parameters of numbers 0 to 31
}

let output be assigned to invalid numbers as testcase
print output to console.

end
*/ 


"use strict";

function daySuffix(day)
{
    

    if(day == 1 || (day%10==1) && day!=11){
        return day + " : " + day + "st";
    }
    else if(day == 2 || (day%10==2) && day!=12){
        return day + " : " + day + "nd";
    }
    else if(day == 3 || (day%10==3) && day!=13){
        return day + " : " + day + "rd";
    }
    else if(Number.isInteger(day) && day>0 && day<=31){
        return day + " : " + day + "th";
    }else{
        return day + " : " + null;
    }
    
}

//test case
let output = "";
for (let i = 1; i <= 31; i++)
{
    output += daySuffix(i) + "\n";
}
output += daySuffix("dog") + "\n";
output += daySuffix(-1) + "\n";
output += daySuffix(100) + "\n";
output += daySuffix("d0g") + "\n";
console.log(output);
