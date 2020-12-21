/* 
begin main

Declare MAX number of iterations

for( i=0; i <MAX; i++){
    if( (i <=50 AND i is odd) OR (i >50 AND i is even) )
        print i;
}

end main
*/ 

const MAX = 100;

for(let i = 0; i<MAX; i++){
    if((i<=50) && (i%2==1) || (i>50 && ((i%2==0))))
        console.log(i);

}