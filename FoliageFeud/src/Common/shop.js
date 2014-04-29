// JavaScript Document
var shop ={
	display:true,
	adventure: Object.create(buyableObject),
	rockCoin: Object.create(buyableObject),
	waterCoin: Object.create(buyableObject),
	info:false,
	shopKeeperDisplay:false,
	
render:function()
{
	utility.clearAll();	
		
		utility.drawImage(
			gameplaySurface, imgShopBg,
			0, 0, imgShopBg.width, imgShopBg.height,
			0, 0, imgShopBg.width, imgShopBg.height
		);
		utility.drawImage(
			gameplaySurface, imgExitButton,
			0, 0, imgExitButton.width, imgExitButton.height,
			932, 304, imgExitButton.width, imgExitButton.height
		);
	
		utility.drawImage(
			gameplaySurface, imgRock,
			0, 0, imgRock.width, imgRock.height,
			265, 140, imgRock.width,imgRock.height
			);
		
		utility.drawImage(
			gameplaySurface, imgWater,
			0, 0, imgWater.width, imgWater.height,
			429, 140, imgWater.width,imgWater.height
			);
			utility.drawImage(
			gameplaySurface, imgAdventure,
			0, 0, imgAdventure.width, imgAdventure.height,
			96, 138, imgAdventure.width,imgAdventure.height
			);
			
			utility.drawImage(
			gameplaySurface, imgShopSibling,
			0, 0, imgShopSibling.width, imgShopSibling.height,
			750, 300, imgShopSibling.width,imgShopSibling.height
			);
				
		
				
		shop.displayInfo();	
		shop.initShop();
		shop.buttonHandler();
		shop.infoDisplay();
		
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
	var strings=[];
			 strings.push(" gold: " + gameplay.gold);	
				menuSurface.drawImage(
						imgChest,
						785, 10
					);
					utility.writeText(menuSurface, strings, 840,45, 64 * 4 - 10, 25, true);
					strings.pop();
					
				strings.push("Click on the shop keeper for help using the shop." );
				utility.writeText(gameplaySurface, strings, 228, 28, 64 * 4, 20, true);
},

buyAdventure:function()
{
	if(shop.adventure.description==true&&shop.adventure.purchased==false)
	{
		shop.adventure.buy();
		skillBook.sprintLevel=1.75;
	}
	shop.info=true;
	shop.adventure.description=true;

	
	
		
},
buyRock:function()
{
	if(shop.rockCoin.description==true&& shop.rockCoin.purchased==false)
	{
		shop.rockCoin.buy();
		skillBook.climbLevel=2;
	}
	shop.info=true;
	shop.rockCoin.description=true;
	
	
},
buyWater:function()
{
	if(shop.waterCoin.description==true&&shop.waterCoin.purchased==false)
	
	{
		shop.waterCoin.buy();
		skillBook.swimLevel=2;
	}
	shop.info=true;
	shop.waterCoin.description=true;
},
shopKeeper:function()
{	
	shop.info=true;
	shop.shopKeeperDisplay=true;
},

exitShop:function()
{
	if(shop.info==false)
		{
			switchGamemode(ScreenState.Gameplay);
		}
		else
		{
			shop.info=false;
		}
		shop.adventure.description=false;
		shop.waterCoin.description=false;
		shop.rockCoin.description=false;
		shop.shopKeeperDisplay=false;
	
},
displayInfo:function()
{
				if(shop.info==true)
				{
					utility.drawImage(
					menuSurface,imgItemInfo,
					0,0,imgItemInfo.width,imgItemInfo.height,
					95,136,imgItemInfo.width,imgItemInfo.height
				)
				}				
},
buttonHandler:function()
{
	if(shop.info==false)
	{
		utility.addClickItem(932, 304, imgExitButton.width, imgExitButton.height,this.exitShop, "");
		utility.addClickItem( 96,138,imgAdventure.width,imgAdventure.height,this.buyAdventure,"");
		utility.addClickItem( 265,140,imgRock.width,imgRock.height,this.buyRock,"");
		utility.addClickItem( 429,140,imgWater.width,imgWater.height,this.buyWater,"");
		utility.addClickItem(750,300,imgShopSibling.width,imgShopSibling.height,this.shopKeeper,"");
		
	}
	if(shop.info==true)
	{
			utility.drawImage(
			menuSurface, imgExitButton,
			0, 0, imgExitButton.width, imgExitButton.height,
			338, 364, 64,64
			
		);
		if(this.shopKeeperDisplay==false)
		{	
		utility.drawImage(
			menuSurface, imgPurchaseButton,
			0, 0, imgPurchaseButton.width, imgPurchaseButton.height,
			402, 364, 64,64
			
		);
		}
			utility.addClickItem(338,364, 64,64,this.exitShop, "");
	}
	
},
infoDisplay:function()
{
	if(this.adventure.description==true)
	{
				var strings = [];
				strings.push(" The adventure hat increases your sprint speed." );
				utility.writeText(menuSurface, strings, 245, 290, 64 * 4, 25, true);
				utility.drawImage(
				menuSurface, imgAdventure,
				0, 0, imgAdventure.width, imgAdventure.height,
				315, 155, imgAdventure.width,imgAdventure.height
				
			);
			//if you have enough gold assigns the listener to the purchase button
				if(gameplay.gold>=this.adventure.price)
				{
					utility.addClickItem(402,364, 64,64,this.buyAdventure, "");
					utility.addClickItem(402,364, 64,64,this.exitShop, "");
				}
	}
	if(this.waterCoin.description==true)
	{
				var strings = [];
				strings.push(" The water coin increases your swim speed.  " );
				utility.writeText(menuSurface, strings, 245, 290, 64 * 4, 20, true);
				utility.drawImage(
				menuSurface, imgWater,
				0, 0, imgWater.width, imgWater.height,
				315, 155, imgWater.width,imgWater.height
			);
				if(gameplay.gold>=this.waterCoin.price)
				{
					utility.addClickItem(402,364, 64,64,this.buyWater, "");
					utility.addClickItem(402,364, 64,64,this.exitShop, "");
				}
	}
	if(this.rockCoin.description==true)
	{
		
				var strings = [];
				strings.push(" The rock coin increases your climb speed. " );
				utility.writeText(menuSurface, strings, 245, 290, 64 * 4, 20, true);
				utility.drawImage(
				menuSurface, imgRock,
				0, 0, imgRock.width, imgRock.height,
				315, 155, imgRock.width,imgRock.height
			);
				if(gameplay.gold>=this.rockCoin.price)
				{
					utility.addClickItem(402,364, 64,64,this.buyRock, "");
					utility.addClickItem(402,364, 64,64,this.exitShop, "");
				}
	}
	if(this.shopKeeperDisplay==true)
	{
				var strings = [];
				strings.push("Welcome to the shop! You can click on any item to see a description of the item. Hit exit to return to the base camp. If you don't have enough gold				explore other maps and complete quests to receive gold to unlock items! " );
					utility.writeText(menuSurface, strings, 245, 200, 64 * 4, 20, true);
		
	}
	
}
};
 
