/*
begin main

Intialize test income value
Initialize tax owed = 0
Declare 2% taxable income (levy) variable (*0.02)


if(income>= 0 AND income<=18200){
    tax = 0;
}else if(income >=18201 AND income <=37000){

   // 19c for each $1 over $18200
    //tax = 0.19 * Math.floor(income);

}else if(income >= 37001 AND income<= 90000){

    //$3572 + 32.5c for each $1 over $37000
    //tax = 3572 + (0.325 * Math.floor(income));

}else if(income >= 90001 AND income <=180000){

    //$20797 + 37c for each $1 over $90000
    //tax = 20797 + (0.37 * Math.floor(income));

}else if(income >= 180001){

    //$54097 + 45c for each $1 over $180000
    //tax = 54097 + (0.45 * Math.floor(income))

}

Declare total tax variable
//total tax = tax + (income * 0.02);
print $ + total tax amount to two decimal places

end main
*/

let income = 127050;
let tax = 0;
let levy = 0.02;
let total_tax=0;

if(income>= 0 && income<=18200){
    tax = 0;

    }
     else if(income >=18201 && income <=37000){
         tax = 0.19 * (Math.floor(income)-18200);

     }
      else if(income >= 37001 && income<= 90000){
             tax = 3572 + (0.325 * (Math.floor(income)-37000));

      }
       else if(income >= 90001 && income <=180000){
                 tax = 20797 + (0.37 * (Math.floor(income)-90000));

        }
         else if(income >= 180001){
                    tax = 54097 + (0.45 *( Math.floor(income)-180000 ));

          }

  total_tax = tax + (income * levy);
  console.log("$" + total_tax.toFixed(2)); 


