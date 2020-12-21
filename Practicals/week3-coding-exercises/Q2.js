/* 
begin main

initialize main array, empty arrays for positive odd numbers and negative even numbers
initialize counters for each arrays
intialize MAX iterations for accessing main array

while{
    //For each element
        if(element >= 0){
            if(element is odd){
                //push element to positive even array
                //increment counter
            }

        }else{ //element is negative
            if(element is even){
                //pish element to negative even array
                //increment counter
            }
        }

        //increment counter for main array
}

//print positive even and negative odd array

end main
*/

let num_array = [54,-16,80,55,-74,73,26,5,-34,-73,19,63,-55,-61,65,-14,-19,-51,-17,-25];
let pos_odd = [];
let neg_even = [];
let i=0;
let count1=0;
let count2=0;
let MAX = num_array.length - 1;

while(i<=MAX){

    if(num_array[i]>=0){
        if(num_array[i]%2==1){
            pos_odd.push(num_array[i]);
            count1++;
         }
    }
    else{
        if(num_array[i]%2==0){
         neg_even[count2] = num_array[i];
         count2++;
     }
    }

    i++;

}

console.log("Positive odd list: ");
console.log(pos_odd);

console.log("Negative even list: ");
console.log(neg_even);