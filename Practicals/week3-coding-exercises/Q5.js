/*
begin main

Declare width = 9
//column = width

//Loop asterisk over each width number
//only print width number of asterisks for 1st and last rows
//2nd row onward, print asterisk on width - (n - column)

//for(i = 0 ; while i < width; i++){
    for(column = 0; column < width; column++){
        //if first row, and i=0, column will loop width amount of times to print asterisk
        //2nd row onwards, i!=0, column will loop width amount of times to print blank space
        //print asterisk when column reaches width - 1 - row number. (asterisk is printed at position width - row)
    }
}

end main
*/

let width = 9;

for(let i=0; i<width; i++){
    for(let column = 0; column<width; column++){
        if(i == 0 || i == width - 1 || column == width - i){
            process.stdout.write("*"); //console.log automatically outputs to new line
        }else{
            process.stdout.write(" ")
        }
    }
    console.log("");
}