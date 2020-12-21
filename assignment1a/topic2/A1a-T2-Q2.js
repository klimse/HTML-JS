"use strict";

function submitOrder(){

    let errorCode = false; //if true, throws an error and requests user to enter details again
    let errorType = " "; //error message for user

    let outputRef =  document.getElementById("resultArea");
    let output = "";

    //get reference for name field
    let nameRef = document.getElementById("name");     //get name ref (*p = &name)
    let name = nameRef.value;                         //local data variable = ref (x = p)
    if(!name){
        errorCode = true;
        errorType = "No name entered. Please enter your name. "
    }

    //get reference for mobile field
    let mobileRef = document.getElementById("mobile");
    let mobile = mobileRef.value;

    //get selected ingredients
    let meatRef = document.getElementsByName("meat");
    let meatSelected = " ";
    let meatPrice = 0;

    for (let i =0; i<meatRef.length; i++){
        if(meatRef[i].checked){
            meatSelected = meatRef[i].value;

            if(meatRef[i].id == "chicken"){
                meatPrice = 2;
            }else{
                meatPrice = 3;
            }
            break;  //exits if loop
        }else{
            meatSelected = "No Meat ";
        }
    }

    if(meatSelected == "No Meat "){
        errorCode = true;
        if(!errorType){
            errorType = "No Meat is selected. Please choose a meat! ";
        }else{
            errorType += "No Meat is selected. Please choose a meat! ";
        }
    }

    //checks if mobile number entered is a number. if not, throws an error
    if(isNaN(mobile) || mobile == ''){
        errorCode = true;
        errorType += "Invalid Mobile Number! Please try again!"
    }

    //gets selected cheese
    let cheeseRef = document.getElementsByName("cheese");
    let cheeseSel = " ";
    let cheesePrice = 0;

    for(let j=0; j<cheeseRef.length; j++){
        if(cheeseRef[j].checked){
            cheeseSel += cheeseRef[j].value + ", ";
            cheesePrice++;
        }
    }
    if (cheesePrice ==0){   
        cheeseSel = " no cheese ";
    }

   // get selected sauces
    let sauceRef = document.getElementsByName("sauce");
    let sauceSel = " ";
    let saucePrice = 0;

    for(let k=0; k<sauceRef.length; k++){
        if(sauceRef[k].checked){
            sauceSel+= sauceRef[k].value + ", ";
            saucePrice+=0.5;
        }
    }
    if(saucePrice ==0){
        sauceSel = " no sauce ";
    }

    //get selected vegetals
    let vegeRef = document.getElementsByName("vegetables");
    let vegeSel = [];
    let vegePrice = 0;

    for(let l=0; l<vegeRef.length; l++){
        if(vegeRef[l].checked){
            vegeSel += vegeRef[l].value + ", ";
            vegePrice++;
        }
    }
    if(vegePrice ==0){
        vegeSel = " no vegetables ";
    }
    
    //get spiccy level
    let spiceRef = document.getElementById("spiceLevel");
    let spicelvl = spiceRef.value;
    let spicePrice = 0;
        if(spicelvl == "None"){
            spicePrice = 0;
        }else if(spicelvl == "Mild"){
            spicePrice = 0.5;
        }else if(spicelvl == "Medium"){
            spicePrice = 0.5;
        }else if(spicelvl == "Extra"){
            spicePrice = 1;
        }

    //get selected beverage 
    let bevRef = document.getElementById("beverage");
    let bevSel = "";
    let bevPrice = 2;
        if(bevRef.value == "Coke ($2)" )
            bevSel = "Coke";
            else if(bevRef.value == "Mountain Dew ($2)" )
                bevSel = "Mountain Dew";
                else if(bevRef.value == "Sprite ($2)")
                    bevSel = "Sprite";
                        else if(bevRef.value == "Bunderberg ($2)")
                            bevSel = "Bunderberg";
                            else{
                                bevSel = " not selected";
                                bevPrice = 0;
                            }

    let totalPrice = 0;
    totalPrice = meatPrice + cheesePrice + saucePrice + vegePrice + bevPrice + spicePrice;

    //random number generator - generates a whole number between 1 to 999
    let randNum = Math.floor(Math.random() * (999 - 1) + 1);

    
    output = name +"," + " your order number is " + randNum + " and your total cost is: $"+ totalPrice + "<br/>";

    let output2 = "";

    output2 = "Your " + meatSelected + " Burger includes " + cheeseSel + sauceSel + vegeSel
               + " and is " + spicelvl + " spicy. " + " Your drink is " + bevSel + ". <br/>" + "Enjoy!";
    if(!errorCode){
    outputRef.innerHTML = output + output2;
    }else{
        outputRef.innerHTML = errorType;
    }


    //test line check price of each ingredient
    // outputRef.innerHTML = "\n" + output + meatSelected + meatPrice + " Cheese: " + cheeseSel + cheesePrice + " Sauces: " + sauceSel + saucePrice
    //                         + " Vegetables: " + vegeSel + vegePrice + " Spice Level: " + spicelvl + " Beverage: " + bevSel + bevPrice +"</br> Spice price:  " + spicePrice;


}

