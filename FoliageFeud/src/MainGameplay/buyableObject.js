// JavaScript Document
var buyableObject = {
	purchased:false,
	name:"",
	price:0,
	buy:function()
	{
		if(gameplay.gold>=this.price&& this.purchased==false)
		{
			var strings = [];
			strings.push("you purchased the " + name+ " item! ");
			utility.writeText(menuSurface, strings, 32, 50, 64 * 4 - 10, 25, true);
			gameplay.gold=gameplay.gold-this.price;
			purchased=true;
		}
		
		
	},
	

};