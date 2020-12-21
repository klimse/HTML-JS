/** 
 * view.js 
 * Purpose: This file contains code that runs on load for view.html
 * Organization: Monash University Malaysia
 * Assignment Title: ENG1003 S2 2020 Assignment 1b
 * Author: Kathryn Lim Shi En
 * Last Modified: 11 October 2020
 */

"use strict";

//this function displays contents inside the locker
function displayLockerInfo(locker)
{
    
    let deleteButtonRef =  document.getElementById("deleteLocker"); //reference to register a mouse click on the delete Locker button
    deleteButtonRef.addEventListener("click", deleteThisLocker);    //event listener to run deleteThisLocker function upon mouse click
    //block to display locker components
    document.getElementById("lockerColor").value = locker._color;
    document.getElementById("lockerLabel").value = locker._label;
    let updateContentRef = document.getElementById("lockerContents");
    updateContentRef.innerHTML = locker._contents; 
}

//this function unlocks the locker with a user input PIN
function unlock(locker) 
{    
    let message = "";
    let inputPin = prompt("Enter Locker PIN:");

    if(inputPin !== locker._pin) {   
        alert("Wrong Pin Entered!"); //popup that pin is wrong
        locker._locked = true;
        window.location = "index.html"; //redirect user to view.html
    }else {
        locker._locked = false;   //set locker as unlocked state
        locker._pin = ""; //clears locker pin
        displayLockerInfo(locker); //displays locker info
    }
}

//this function deletes a locker from within a locker
function deleteThisLocker()
{
    // Confirmation dialog 
    if (confirm("Delete This Locker?")) {
        lockers.removeLocker(lockers._lockers[index]._id);     //remove locker with the specified id
        updateLocalStorage(lockers); //updates local storage with locker list
        window.location = "index.html"; //redirects user to main page
        alert("Locker deleted!");   //inform user it is deleted
        displayLockers(lockers);    
    }

}

//this function locks the locker with a user specified pin
function lockLocker()
{
    if(confirm("Confirm to lock this locker?")){    
        let inputPin = prompt("Enter locker PIN:");
        if(inputPin) {                                        //if user does not click cancel
            let confirmPin = prompt("Confirm PIN again");
                if(confirmPin) {                              //if user does not click cancel
                    if(confirmPin==inputPin ) {
                        //create references to the elements
                        let labelRef = document.getElementById("lockerLabel").value;
                        let colorRef = document.getElementById("lockerColor").value;
                        let contentRef = document.getElementById("lockerContents").value;   

                        //block to update locker info
                        lockers._lockers[index]._pin = confirmPin;
                        lockers._lockers[index]._locked = true;
                        lockers._lockers[index]._label = labelRef;
                        lockers._lockers[index]._contents = contentRef;
                       //block to update color from the color picker in settings
                        let checkString = lockers._lockers[index]._color;
                        let confirmString = checkString.toUpperCase();
                        let newColorRef = "#" + colorRef
                        if (newColorRef != confirmString) {
                            lockers._lockers[index]._color = newColorRef;
                        }

                        updateLocalStorage(lockers);
                        alert("Locker is Locked!");
                        window.location = "index.html";       //redirects user to main page

                        }else {                               //if confirmation pin does not match initial pin
                            alert("PIN does not match!");   
                         }
                }       
        }
    }
            
}

//this function closes the locker without locking it
function closeLocker()
{
    if(confirm("Close the locker without locking?")) {
        //create references to the elements
        let labelRef = document.getElementById("lockerLabel").value;
        let colorRef = document.getElementById("lockerColor").value;
        let contentRef = document.getElementById("lockerContents").value;   
        
        lockers._lockers[index]._label = labelRef;
        lockers._lockers[index]._contents  = contentRef;

        //block to update color from the color picker in settings
        let checkString = lockers._lockers[index]._color;
        let confirmString = checkString.toUpperCase();
        let newColorRef = "#" + colorRef
        if (newColorRef != confirmString) {
            lockers._lockers[index]._color = newColorRef;
        }
        
        updateLocalStorage(lockers);
        alert("Locker is closed, but not locked!");
        window.location = "index.html"; //redirects user to main page
    }
    else {
        
        return false;
    }

}



let index = localStorage.getItem(LOCKER_INDEX_KEY); // Retrieves the stored index from local storage
let locker = lockers.getLocker(index); // using the getLocker method, retrieves the current Locker instance


if(locker._locked == true) {
    unlock(locker);
}else {
    displayLockerInfo(locker);
}