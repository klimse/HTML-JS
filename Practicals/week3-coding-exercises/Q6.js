/*
begin main

Intialize grading scale
Initialize array
Declare counter = array length
Declare invalid mark array
Declare mark array

if(element==number){
    //using if else statements, assign grade
    //push element to mark array
}else{
    //push element to invalid mark array
}

//print mark array with grade in brackets
//print invalid mark array

end main
*/

let marks =[12,45,67,90,"dog",-1,true];
let code = " ";
let i = 0;
let MAX = marks.length -1 ;
let invalid_mark = [];
let valid_mark = [];
let code_arr = [];

while(i <= MAX){
    let temp = marks[i];
    if(Number.isInteger(temp) && temp >=0){ 
        process.stdout.write("Mark: "+ temp);
        
        if(temp>=80 && temp<=100){
            console.log("(" + "HD" + ")");
        }else if(temp >=70 && temp<=79){
            console.log("(" + "D" + ")");
        }else if(temp>=60 && temp<=69){
            console.log("(" + "C" + ")");
        }else if(temp>=50 && temp<=59){
            console.log("(" + "P" + ")");
        }else if(temp>=0 && temp<=49){
            console.log("(" + "N" + ")");
        }

    }else{
        invalid_mark.push(temp);
    }

i++;

}

//prints invalid marks array
let j = 0;
while(j < invalid_mark.length){
    console.log("Invalid Mark: " + invalid_mark[j]);
    j++;
}