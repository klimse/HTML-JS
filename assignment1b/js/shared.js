/** 
 * shared.js 
 * Purpose: This file contains shared code that runs on both view.html and index.html
 * Organization: Monash University Malaysia
 * Assignment Title: ENG1003 S2 2020 Assignment 1b
 * Author: Kathryn Lim Shi En
 * Last Modified: 11 October 2020
 */

"use strict";
//Constants used as KEYS for LocalStorage
const LOCKER_INDEX_KEY = "selectedLockerIndex";
const LOCKER_DATA_KEY = "lockerLocalData";

//Locker class
class Locker
{
    constructor(id)
    {
        this._id= id;
        this._label= "";
        this._locked= false;
        this._pin= "";
        this._color= '#' + Math.random().toString(16).substr(2,6); //generates random color for new lockers
        this._contents= "";

    }

    //accessors
    get id()
    {
        return this._id;
    }

    get label()
    {
        return this._label;
    }

    get locked()
    {
        return this._locked;
    }

    get pin()
    {
        return this._pin;
    }

    get color()
    {
        return this._color;
    }

    get contents()
    {
        return this._contents;
    }    

    //mutators
    set label(newLabel)
    {
        this._label = newLabel;
    }

    set locked(state)
    {
        this._locked = state;
    }

    set pin(pin)
    {
        this._pin = pin;
    }

    set color(color)
    {
        this._color = color;
    }

    set contents(newContent)
    {
        this._contents = newContent;
    }

    //methods
   fromData(data)
    {
        this._id = data._id;
        this._label= data._label;
        this._locked= data._locked;
        this._pin= data._pin;
        this._color= data._color;
        this._contents= data._contents;
    }

}

//LockerList class
class LockerList
{
    constructor()
    {
        this._lockers = [];
    }

    //accessors
    //returns a locker array
    get lockers()
    {
        return this._lockers;
    }

    //returns length of lockers array
    get count()
    {
        return this._lockers.length;
    }
    
    //methods
    //creates new instance of Locker with provided id and adds it to _lockers array
    addLocker(id)
    {
        let newLocker = new Locker(id);

        this._lockers.push(newLocker); //pushes newLocker onto lockers array
    }

    //returns the Locker at index posn of the _lockers array
    getLocker(index)
    {
        return this._lockers[index];
    }

    //removes the Locker with the specified id from the _lockers array
    removeLocker(id)
    {
        for(let i =0; i<this.count; i++)
        {
            if(this._lockers[i]._id == id)
            {
                this._lockers.splice(i,1);
            }
            console.log(this._lockers);
        }

    }

    fromData(data)
    {
        this._lockers = data._lockers;
    }

}

// Global LockerList instance variable
let lockers = new LockerList();

//this function checks if browser supports Local Storage
function checkIfDataExistsLocalStorage()
{
    let keyData = localStorage.getItem(LOCKER_DATA_KEY);
       
    if(typeof keyData !== 'undefined') {
            if (keyData !== null) {
                if(keyData !== undefined) {
                    if(keyData ==="") {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
}

//this function updates the browser's LocalStorage 
function updateLocalStorage(data)
{

    data = JSON.stringify(data);
    localStorage.setItem(LOCKER_DATA_KEY,data);

}

//this function returns data from LocalStorage
function getDataLocalStorage()
{

    let data = localStorage.getItem(LOCKER_DATA_KEY);

    try
    {
        data = JSON.parse(data);
    }
    catch (error)
    {
        console.log(error);
    }
    finally
    {
        return data;
    }
}

//this function checks if LocalStorage already has data written in it
if(checkIfDataExistsLocalStorage()) {
    lockers.fromData(getDataLocalStorage());
}
else {   //if no data, generates default locker
    lockers.addLocker("A001"); //adds default locker
    updateLocalStorage(lockers);
}

