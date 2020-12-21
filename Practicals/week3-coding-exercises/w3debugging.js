let orderBook = {
	sell:[],
	buy:[]
};

let orders =[
	{
		trader:"Tian Goh",
		buy:true,
		sell:false,
		price:10,
		quantity:100
	},
	{
		trader:"Nisal De Silva",
		buy:false,
		sell:true,
		price:10,
		quantity:50
	},
	{
		trader:"Jonny Low",
		buy:false,
		sell:true,
		price:11,
		quantity:100
	},
	{
		trader:"Arvind Kaur",
		buy:false,
		sell:true,
		price:10,
		quantity:100
	}
];


for(let i=0;i<orders.length;i++)
{
	//for verifications
	let orderValidity=true;

	if(
		orders[i].price<=0 ||
		orders[i].quantity<=0 ||
		Number.isInteger(orders[i].quantity)|| //to check if orders is integer
		orders[i].trader==="" ||
		(typeof orders[i].buy !== "boolean") ||
		(typeof orders[i].sell !== "boolean")
	)
	{
	   orderValidity=false;
	}

	if((orders[i].buy) &&  orderValidity)
	{

        //if(orderBook.sell.length===0) //changed to comparison operator
		if(orderBook.sell.length==0)	// no orders to match 
		{
			orderBook.buy.push(orders[i]);
			continue;
		}

		let addOrderToBuySide = true;
		for(let j=0;j<orderBook.sell.length;j++)
		{
			if(orderBook.sell[j].price<=orders[i].price)
			{

				if(orderBook.sell[j].quantity>orders[i].quantity)
				{
					orderBook.sell[j].quantity-=orders[i].quantity;
					break;
				}
				else if(orderBook.sell[j].quantity===orders[i].quantity)
				{
					orderBook.sell.splice(j,1);
					addOrderToBuySide = false;
					break;
				}
				else
				{
					orders[i].quantity-=orderBook.sell[j].quantity;
					orderBook.sell.splice(j,1);
				}
			}
		}
		if(addOrderToBuySide)
		{
			orderBook.buy.push(orders[i]);
		}
	}

	else if((orders[i].sell) && orderValidity)
	{
        //if(orderBook.buy.length=0)
        if(orderBook.buy.length==0) //changed to compare instead of assignment op
		{
			orderBook.sell.push(orders[i]);
			continue;
		}

		let addOrderToSellSide = true;
		for(let j=0;j<orderBook.buy.length;j++)
		{   
            //if(orderBook.buy[j].price<=orders[i].price)
			if(orderBook.buy[j].price>=orders[i].price) //changed from <= to >=  
			{
				if(orderBook.buy[j].quantity>orders[i].quantity)
				{
					orderBook.buy[j].quantity-=orders[i].quantity;
					break;
				}
				else if(orderBook.buy[j].quantity===orders[i].quantity)
				{
					orderBook.buy.splice(j,1);
                    addOrderToSellSide =false;
                    addOrderToBuySide =false; //added this
					break;
				}
				else
				{
					orders[i].quantity+=orderBook.buy[j].quantity;
					//orders[i].quantity-=orderBook.buy[j].quantity;
					orderBook.buy.splice(j,1);
			  }
		  }
	}

	if(addOrderToSellSide)
	{
		orderBook.sell.push(orders[i]);
	}
	else
	{
		orderValidity=false;
	}

	if(!orderValidity)
	{
		console.log("order at index "+i+" is invalid!");
	}
}

// printing order book
for(let side in orderBook)
{
	let output ="";
	output +=side+" side orders\n\n";

	for(let k=0;k<orderBook[side].length;k++)
	{
		for(let prop in orderBook[side][k])
		{
			output += prop+": "+orderBook[side][k][prop]+"\n";
		}
		output +="\n";
	}
	console.log(output);
}

} //missing bracket