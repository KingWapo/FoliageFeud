// JavaScript Document
var buyableObject = {
	purchased:false,
	name:"",
	price:0,
	x:0,
	y:0,
	buy:function()
	{
		if(gameplay.gold>=this.price&& this.purchased===false)
		{
			var strings = [];
			strings.push("you purchased the " + this.name + " item! ");
			utility.writeText(menuSurface, strings, 240, 25, 64 * 4 - 10, 25, true);
			gameplay.gold=gameplay.gold-this.price;
			this.purchased=true;
			this.init();
		
			
		}
	
		
	},
	init:function()
	{
				if(this.purchased==true)
		{
			menuSurface.drawImage
			(
				imgSold,
				this.x,this.y
			);

				
		}
	}
		
	
	
	
	

};