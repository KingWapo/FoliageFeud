// JavaScript Document
var shop ={
	display:true,
	adventure: Object.create(buyableObject),
	rockCoin: Object.create(buyableObject),
	waterCoin: Object.create(buyableObject),
	
	
drawShop:function()
{
gameplay.writtingClear();	
		
		utility.drawImage(
			menuSurface, imgShopBg,
			0, 0, imgShopBg.width, imgShopBg.height,
			0, 0, imgShopBg.width, imgShopBg.height
		);
<<<<<<< HEAD
		utility.drawImage(
			menuSurface, imgExitButton,
			0, 0, imgExitButton.width, imgExitButton.height,
			1152 - 320, 512 - 160, imgExitButton.width, imgExitButton.height
=======
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
>>>>>>> ec0544643252dc7180cc6ac9a6087f05eaa3e258
		);
		menuSurface.drawImage(
			imgNip,
			599, 140
		);
		menuSurface.drawImage(
		imgQuestionMark,
			766,307
		);
	
		
		
		shop.initShop();
		utility.addClickItem(932, 304, imgExitButton.width, imgExitButton.height, gameplay.writtingClear, "");
		utility.addClickItem( 96,138,imgAdventure.width,imgAdventure.height,this.buyAdventure,"");
		utility.addClickItem( 265,140,imgRock.width,imgRock.height,this.buyRock,"");
		utility.addClickItem( 429,140,imgWater.width,imgWater.height,this.buyWater,"");
		utility.addClickItem(759,300,imgQuestionMark.width,imgQuestionMark.height,this.loadInfo,"");
		
		
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
	if(gameplay.gold>=adventure.price)
		{
			skillBook.sprintLevel=2;	
		}
		
},
buyRock:function()
{
	shop.rockCoin.buy();
	if(gameplay.gold>=shop.rockCoin.price)
		{
			skillBook.climbLevel=2;	
		}
	
},
buyWater:function()
{
	shop.waterCoin.buy();
	if(gameplay.gold>=shop.waterCoin.price)
		{
			skillBook.swimLevel=2;	
		}
	
	
	
},
debug:function()
{
	console.debug("HAT!!!!!!!!!!");
},
loadInfo:function()
{
	console.debug(" hmmm this will do. ");
	gameplay.writtingClear();
	shop.drawInfo();

	
},
drawInfo:function()
{
	utility.clearClickHandler();
		menuSurface.drawImage(
			imgCommonBg,
			0, 0
		);
		menuSurface.drawImage(
			imgExitButton,
			932, 304
		);
			menuSurface.drawImage(
			imgAdventure,
			96, 140
		);
		menuSurface.drawImage(
			imgRock,
			433, 140
		);
		menuSurface.drawImage(
			imgWater,
			97, 306
			);
			menuSurface.drawImage(
			imgNip,
			433, 306
		);
		menuSurface.drawImage(
			imgRightArrow,
			1006, 270
		);
		menuSurface.drawImage(
			imgLeftArrow,
			950, 270
		);
		utility.addClickItem(932, 304, imgExitButton.width, imgExitButton.height, shop.redrawShop, "");
		var strings = [];
		strings.push(" Info Screen ");
		utility.writeText(menuSurface, strings, 240, 25, 64 * 4 - 10, 25, true);
		strings.pop();
		strings.push(" Buy the adventure hat in order to increase your sprint speed.");
		utility.writeText(menuSurface,strings,260,150,160,20,true); 
		strings.pop();
		strings.push(" Buy the Rock Coin to pass through large Rocks.");
		utility.writeText(menuSurface,strings,599,150,160,20,true); 
		strings.pop();
		strings.push(" Buy the Water Coin to increase your swim speed and allow you to swim through rapids.");
		utility.writeText(menuSurface,strings,260,315,160,20,true); 
		strings.pop();
		strings.push("Buy the parsnip costume to become the villain himself!");
		utility.writeText(menuSurface,strings,599,315,160,20,true);
		
		
	
	
	
	
},
redrawShop:function()
{
	utility.clearClickHandler();
	shop.drawShop();
	
}
};
 
