"use strict"

let outputAreaRef = document.getElementById("outputArea");
let tableHTML = "<style>th, td { padding: 5px; }</style>";
const STATES = [false, true];

// Question 1
/**
 * (A'(C+B'))'A +C'B'A
 * = (A'C + A'B')'A + C'B'A [distributive]
 * = A'C + A'B' + AB'C'     [idempotence]
 * = A'C + (A'+A)B'C'        [distributive]
 * = A'C + B'C'              [complementary]   
 */

// Truth Table for Question 1
tableHTML += "<h4>Question 1: <h4>";
tableHTML += "<h2>(A'(C+B'))'A +C'B'A </h2>";
tableHTML += "<table border=\"1\"><tr>";
/* Set up your table header for each column here */
tableHTML += "<th>A</th>";
tableHTML += "<th>B</th>";
tableHTML += "<th>C</th>";
tableHTML += "<th>Original Expression</th>";
tableHTML += "<th>Simplified Expression: A'C + B'C'</th>";
tableHTML += "<th>Result</th>";
/* End setup */
tableHTML += "</tr>";

// Code for truth table here
for(let indexA = 0; indexA < STATES.length; indexA++)
{
    for(let indexB = 0; indexB < STATES.length; indexB++)
    {
        for(let indexC = 0; indexC < STATES.length; indexC++)
        {
            let A = STATES[indexA];
            let B = STATES[indexB];
            let C = STATES[indexC];
            let original = ((!A && (C||!B)) && !A ) || (!C && !B && A); //!((!A && (C||!B)) && A ) || (!C && !B && A)
            let simplified = (!A && C) || (!B && !C);   //A
            tableHTML += "<tr>";
            tableHTML += `<td>${A}</td>`;
            tableHTML += `<td>${B}</td>`;
            tableHTML += `<td>${C}</td>`;
            tableHTML += `<td>${original}</td>`;
            tableHTML += `<td>${simplified}</td>`;
            tableHTML += `<td>${original === simplified}</td>`;
            tableHTML += "</tr>";
        } 
    }
}

tableHTML += "</table>";
tableHTML += "<br/>";   //close the table

// Question 2
//AB+B'C+(A+B')'
/**
 * = AB + B'C + A'B  [de Morgan's]
 * = (A+A')B + B'C   [distributive]
 * = B + B'C         [complementary]
 */

// Truth Table for Question 2
tableHTML += "<h4>Question 2: <h4>";
tableHTML += "<h2>AB+B'C+(A+B')'</h2>";
tableHTML += "<table border=\"1\"><tr>";
/* Set up your table header for each column here */
tableHTML += "<th>A</th>";
tableHTML += "<th>B</th>";
tableHTML += "<th>C</th>";
tableHTML += "<th>Original Expression</th>";
tableHTML += "<th>Simplified Expression: B + C</th>";
tableHTML += "<th>Result</th>";
/* End setup */
tableHTML += "</tr>";

// Code for truth table here
for(let indexA = 0; indexA < STATES.length; indexA++)
{
    for(let indexB = 0; indexB < STATES.length; indexB++)
    {
        for(let indexC = 0; indexC < STATES.length; indexC++)
        {
            let A = STATES[indexA];
            let B = STATES[indexB];
            let C = STATES[indexC];
            let original = (A && B) || (!B && C) || !(A || !B);
            let simplified = (B || !B && C);    
            tableHTML += "<tr>";
            tableHTML += `<td>${A}</td>`;
            tableHTML += `<td>${B}</td>`;
            tableHTML += `<td>${C}</td>`;
            tableHTML += `<td>${original}</td>`;
            tableHTML += `<td>${simplified}</td>`;
            tableHTML += `<td>${original === simplified}</td>`;
            tableHTML += "</tr>";
        } 
    }
}

tableHTML += "</table>";
tableHTML += "<br/>";   //close the table

// Question 3
//C'(C'+ABB')+(A+B)'AB
/**
 * = C'(C' + 0) + (A+B)'AB [complementary]
 * = C'(C') + (A+B)'AB     [identity]
 * = C' + (A+B)'AB         [idempotence]
 * = C' + (A'B + AB')      [distributive]
 * = (A'B + AB') + C'      [commutative]
 */

// Truth Table for Question 3
tableHTML += "<h4>Question 3: <h4>";
tableHTML += "<h2>C'(C'+ABB')+(A+B)'AB </h2>";
tableHTML += "<table border=\"1\"><tr>";
/* Set up your table header for each column here */
tableHTML += "<th>A</th>";
tableHTML += "<th>B</th>";
tableHTML += "<th>C</th>";
tableHTML += "<th>Original Expression</th>";
tableHTML += "<th>Simplified Expression: (A'B + AB') + C' </th>";
tableHTML += "<th>Result</th>";
/* End setup */
tableHTML += "</tr>";

// Code for truth table here
for(let indexA = 0; indexA < STATES.length; indexA++)
{
    for(let indexB = 0; indexB < STATES.length; indexB++)
    {
        for(let indexC = 0; indexC < STATES.length; indexC++)
        {
            let A = STATES[indexA];
            let B = STATES[indexB];
            let C = STATES[indexC];
            let original = (!C && (!C || (A && B && !B)) ) || !((A || B) && A && B);  //(!C && (!C || (A && B && !B)) ) || !((A || B) && A && B);
            let simplified = ( (!A && B) || (A && !B) )|| !C;   //change this
            tableHTML += "<tr>";
            tableHTML += `<td>${A}</td>`;
            tableHTML += `<td>${B}</td>`;
            tableHTML += `<td>${C}</td>`;
            tableHTML += `<td>${original}</td>`;
            tableHTML += `<td>${simplified}</td>`;
            tableHTML += `<td>${original === simplified}</td>`;
            tableHTML += "</tr>";
        } 
    }
}

tableHTML += "</table>";
tableHTML += "<br/>";   //close the table

// Question 4
//(X+Y+Z)X'Y'Z'+(X+Y')'+(X+X'YX)'
/**
 * = (X+Y+Z)X'Y'Z' + (X'Y) + (X+X'YX)'   [deMorgan's law]
 * = (X+Y+Z)X'Y'Z' + (X'Y) + (X+Y(0))'   [complementary]
 * = (X+Y+Z)X'Y'Z' + (X'Y) + X'          [identity]
 * = (X+Y+Z)X'Y'Z' + X'                  [absorption]
 * = XX'Y'Z' + X'YY'Z' + X'Y'ZZ' + X'    [distributive]
 * = (0)Y'Z' + (0)X'Z' + (0)X'Y' + X'    [complementary]
 * = 0 + 0 + 0 + X'                      [annulment] 
 * = X'                                  [identity]
 */

// Truth Table for Question 4
tableHTML += "<h4>Question 4: <h4>";
tableHTML += "<h2>(X+Y+Z)X'Y'Z'+(X+Y')'+(X+X'YX)' </h2>";
tableHTML += "<table border=\"1\"><tr>";
/* Set up your table header for each column here */
tableHTML += "<th>A</th>";
tableHTML += "<th>B</th>";
tableHTML += "<th>C</th>";
tableHTML += "<th>Original Expression</th>";
tableHTML += "<th>Simplified Expression: X' </th>";
tableHTML += "<th>Result</th>";
/* End setup */
tableHTML += "</tr>";

// Code for truth table here
for(let indexX = 0; indexX < STATES.length; indexX++)
{
    for(let indexY = 0; indexY < STATES.length; indexY++)
    {
        for(let indexZ = 0; indexZ < STATES.length; indexZ++)
        {
            let X = STATES[indexX];
            let Y = STATES[indexY];
            let Z = STATES[indexZ];
            let original = ((X || Y || Z) && (!X && !Y && !Z)) || !(X || !Y) || !(X || (!X && Y && X)); //((X || Y || Z) && (!X && !Y && !Z)) || !(X || !Y) || !(X || (!X && Y && X));
            let simplified = !X;
            tableHTML += "<tr>";
            tableHTML += `<td>${X}</td>`;
            tableHTML += `<td>${Y}</td>`;
            tableHTML += `<td>${Z}</td>`;
            tableHTML += `<td>${original}</td>`;
            tableHTML += `<td>${simplified}</td>`;
            tableHTML += `<td>${original === simplified}</td>`;
            tableHTML += "</tr>";
        } 
    }
}

tableHTML += "</table>";
tableHTML += "<br/>";   //close the table


outputAreaRef.innerHTML = tableHTML;