// JavaScript Document
var shop ={
	display:true,
	adventure: Object.create(buyableObject),
	rockCoin: Object.create(buyableObject),
	waterCoin: Object.create(buyableObject),
	
	
drawShop:function()
{
	
		
		menuSurface.drawImage(
			imgShopBg,
			0, 0
		);
		menuSurface.drawImage(
			imgExitButton,
			932, 304
		);
		menuSurface.drawImage(
			imgAdventure,
			96, 138
		);
		menuSurface.drawImage(
			imgRock,
			265, 140
		);
		menuSurface.drawImage(
			imgWater,
			429, 140
		);
		menuSurface.drawImage(
			imgNip,
			599, 140
		);
	
	
		
		
			this.initShop();
		utility.addClickItem(932, 304, imgExitButton.width, imgExitButton.height, gameplay.writtingClear, "");
		utility.addClickItem( 96,138,imgAdventure.width,imgAdventure.height,this.buyAdventure,"");
		utility.addClickItem( 265,140,imgRock.width,imgRock.height,this.buyRock,"");
		utility.addClickItem( 429,140,imgWater.width,imgWater.height,this.buyWater,"");
		
	
		
		
},
initShop:function()
{
	shop.adventure.price=1;
	shop.adventure.name="Adventure Hat";
	shop.adventure.x=96;
	shop.adventure.y=138;
	shop.adventure.init();
	shop.rockCoin.price=5;
	shop.rockCoin.name="Rock Coin";
	shop.rockCoin.x=265;
	shop.rockCoin.y=140;
	shop.rockCoin.init();
	shop.waterCoin.price=0;
	shop.waterCoin.name="Water Coin";
	shop.waterCoin.x=429;
	shop.waterCoin.y=140;
	shop.waterCoin.init();
	
},
buyAdventure:function()
{
	shop.adventure.buy();
	skillBook.sprintLevel=2;
},
buyRock:function()
{
	shop.rockCoin.buy();
	skillBook.climbLevel=2;
	
},
buyWater:function()
{
	shop.waterCoin.buy();
	skillBook.swimLevel=2;
	
}
	
};


