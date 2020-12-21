let alpha = 43.851;
let a = 24.75;

// a tan(alpha) = b

let rad = alpha*(Math.PI/180);

let b = a * Math.tan(rad);

let temp = Math.abs(b);
let result = temp.toFixed(2)

console.log(result);
