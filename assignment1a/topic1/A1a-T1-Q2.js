/*
begin

in main
declare test marks array

declare function checkMarkValid(mark). accepts marks as parameter
declare bool type valid

if(mark >= 0 AND mark <= 100 AND mark is an integer){
    valid = true;
}else{
    valid = false;
}

function returns valid value

in main 
for(i=0  i < marks array size; i++){
    print each marks and their validity
}

end
*/ 

"use strict";

function checkMarkValid(mark)
{
    let valid = 0;

    if(mark >= 0 && mark <=100 && Number.isInteger(mark)){
       valid = true;
    }else{
        valid = false;
    }


    return valid;
}

//test case
let marks = [12,45,67,900,"dog",-1,true];

for(let i = 0; i < marks.length ; i++){
    console.log(marks[i] + " : " + checkMarkValid(marks[i]));
}