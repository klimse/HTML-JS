/*
begin

declare function sortCountries(dataArray, order), where dataArray is sample array to be passed and order is boolean to determine sorting by ascending or descending

    if(order == true){
        sort dataArray in ascending order
        return dataArray
    }else {
        sort dataArray in descending order
        return dataArray
    }

    end function

    in main
    declare sample country array
    call function sortCountries, pass array and true
    print array
    call function sortCountries, pass array and false
    print array

    end main

end
*/

"use strict";

function sortCountries(dataArray, order){

    if(order){
     return dataArray.sort();
    }else{
        dataArray.sort();
        return dataArray.reverse();
    }

}

//testcase
let countryArray =["Sri Lanka","Afghanistan","Malaysia","Botswana","Cameroon","Singapore","Vietnam","India"];

console.log("Ascending : "+sortCountries(countryArray,true));
console.log("Descending : "+sortCountries(countryArray,false));
