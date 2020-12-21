/** 
 * main.js 
 * Purpose: This file contains code that runs on load for index.html
 * Organization: Monash University Malaysia
 * Assignment Title: ENG1003 S2 2020 Assignment 1b
 * Author: Kathryn Lim Shi En
 * Last Modified: 11 October 2020
 */
"use strict";

//this function displays lockers onto the page
function displayLockers(data)  
{
    let output = "";
    let displayRef = document.getElementById("lockerDisplay");

    updateLocalStorage(lockers);
    for (let i = 0; i < data.count; i ++)
    {
        //HEX to RGB code from https://css-tricks.com/converting-color-spaces-in-javascript/#hex-to-rgb
        let get_colour = data._lockers[i]._color 
        let r = 0, g = 0, b = 0;

        // if HEX digit is 3 digits
        if (get_colour.length == 4){
          r = "0x" + get_colour[1] + get_colour[1];
          g = "0x" + get_colour[2] + get_colour[2];
          b = "0x" + get_colour[3] + get_colour[3];
      
        // if HEX digit is 6 digits
        }else if (get_colour.length == 7){
          r = "0x" + get_colour[1] + get_colour[2];
          g = "0x" + get_colour[3] + get_colour[4];
          b = "0x" + get_colour[5] + get_colour[6];
        }
        
        //equation to find brightness from RGB value
        let brightness = Math.sqrt(0.299*(Math.pow(r,2)) + 0.587 * (Math.pow(g,2)) + 0.114 * (Math.pow(b,2)));
        let textColor = "";

        //if brightness value > 128, sets text color to black, as set it to white
        if(brightness > 128)
            textColor = "black";
            else   
                textColor = "white";

        //block to insert html code to display lockers
        output += '<div class="mdl-cell mdl-cell--4-col">';
        output += '<div class="mdl-card mdl-shadow--2dp locker" style="background-color:' + data._lockers[i]._color + '">';
        output += '<div class="mdl-card__title mdl-card--expand">';
        output += '<h2 style="color:' +  textColor  + ';">' + data._lockers[i]._id; +  '</h2>';
        output += '<h4 style="color:' + textColor + ';">' + "&nbsp;" + data._lockers[i]._label + "'s locker </h4>";
        output += "</div>";
        output += '<div class = "mdl-layout-spacer">';
        output += '<button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-color--white"  onclick="deleteIndexLocker(' +  i + ')" style="position: absolute; top: 0; right: 0;" id = "deleteIndexLocker">';
        output += '<i class="material-icons">delete</i></button>'
        output += "</div>";
        output += '<div class="mdl-card__actions mdl-card--border">';
        output += '<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"' + 'style="color:' + textColor + ';"' + 'onclick="view(' + i + ')">Open Locker</a>';
        output += '<div class="mdl-layout-spacer"></div>';
        output += '<i class="material-icons">lock</i>';
        output += "</div>";
        output += "</div>";
        output += "</div>";
        output += "</div>";
        output += "</div>"; 
    }

    displayRef.innerHTML = output;

}

//this function deletes a locker at the specified index
function deleteIndexLocker(index)
{
    if(confirm("Delete Locker?"))   //if user confirms to delete
    {
    lockers.removeLocker(lockers._lockers[index]._id);  //removes the locker from specified id
    updateLocalStorage(lockers);    //updates the local storage
    displayLockers(lockers);
    }
}

//this function adds a new locker, generates ID based on an increment from the last locker's ID
function addNewLocker()
{
        let i = (lockers.count) + 1;    //get next locker number
        let num = i.toString();

        let pad = "000";
        let strOut = pad.substring(0,pad.length-num.length) + num;
        
        if (lockers.count == 0){    //if no lockers
            let newID = "A" + strOut;
            lockers.addLocker(newID);   //adds a locker with new id
        }
        else{
            let getNum = lockers.getLocker(lockers.count-1);
            let getId = getNum._id;
            let sliceNum = getId.slice(1,4);
            let newNum = Number(sliceNum) + 1;
            let newOutStr = pad.substring(0,pad.length-num.length) + newNum;
            let newID = "A" + newOutStr;
            lockers.addLocker(newID);   //adds a locker with new ids
        }
    updateLocalStorage(lockers);
    displayLockers(lockers);  //display updated locker list
}

//this function opens the locker at specified index
function view(index)
{
    let indexStr = JSON.stringify(index);  
    localStorage.setItem(LOCKER_INDEX_KEY,indexStr);
    window.location = "view.html";  //redirect user to view.html
}

//display lockers on page load
displayLockers(lockers);
