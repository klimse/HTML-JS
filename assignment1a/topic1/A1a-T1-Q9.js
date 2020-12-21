/*
begin

in function findPrimes
declare function findPrimes(min,max), min as floor value and max as ceiling value to find range of prime numbers
    initialize empty array result
    
    for(i = min; i<max ; i++){
        if i is prime number
            put i into result
    }

    print size of result array to show how many prime numbers are present
    return result array
end function

in main
call findPrimes
pass min and max value
print array of prime numbers
end main

end
*/

"use strict";

function findPrimes(min, max){
 let result = [];
 let j = 0;
 let m =2;

    for(let i=min; i<max; i++){
        for( m = 2; m <= i; m++){   //generate numbers m>1 to m<=i
            if(i%m == 0){           //if i is divisible by m, (this loops divides i by all numbers that comes before it)
                break;              //breaks out of the m for loop and proceeds to if(i==m) statement
            }
        }
        if(i==m){                      //if i is equal to m (and also because it is divisible by numbers <m,). if not, for loop continues
            result[j] = i;              //then i is a prime number, add i to result array
            j++;
        }
    }

console.log("There are " + result.length + " prime numbers");
return result;

}

//testcase
console.log(findPrimes(20,150));