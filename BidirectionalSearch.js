
/*
time 1: 10.5ms
time 2: 12.6ms
time 3: 15.8ms
time 4: 14.9ms
time 5: 9.2ms

average time: 12.6ms
*/ 

function bidirectionalSearchTest(data){
    let counter = 0; //counter for array searching
    let mid = (data.length) / 2;
    let index = 0;
   

//picks object from array at the (middle of array - counter) index and checks emergency property
   
    while(counter <= mid) {

            if(data[mid - counter].emergency == true){  //if there's an emergy at index
                    return data[mid - counter].address;
            }else if(data[mid + counter].emergency == true)
            {  //if no emergency at index
                        return data[mid + counter].address;
            }

            counter++;

    }

    return null;

}

