
const birthdate = new Date('April 8, 2001');

let now = Date.now();

let elapsed = now - birthdate;
let temp = elapsed/3.154e+10; //converts ms to years
let age = temp.toPrecision(2);

console.log(age);