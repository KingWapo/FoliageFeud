// JavaScript Document
var buyableObject = {
	purchased:false,
	name:"",
	price:0,
	x:0,
	y:0,
	description:false,
	
	buy:function()
	{
		this.purchased=true;
		gameplay.gold= gameplay.gold - this.price;	

	},
		
	
	init:function()
	{
				if(this.purchased==true)
		{
			gameplaySurface.drawImage
			(
				imgSold,
				this.x,this.y
			);

				
		}
		
	},
	
	
	
	
	
	

};