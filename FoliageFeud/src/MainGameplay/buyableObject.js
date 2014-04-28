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
		buyableObject.writeDescription();
	},
	
	writeDescription:function()
	{
		if(this.description==true)
		{
			if(this.name=="adventure")
			{
				var strings = [];
				strings.push(" The adventure hat increases your sprint speed." );
				utility.writeText(menuSurface, strings, 32, 50, 64 * 4 - 10, 25, true);
			}
		}
	}
		
	
	
	
	

};