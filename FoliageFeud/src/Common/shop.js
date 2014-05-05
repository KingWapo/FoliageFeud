// JavaScript Document
var shop ={
	display:true,
	adventure: Object.create(buyableObject),
	rockCoin: Object.create(buyableObject),
	waterCoin: Object.create(buyableObject),
	parsnipMask:Object.create(buyableObject),
	superWaterCoin:Object.create(buyableObject),
	mystery:Object.create(buyableObject),
	info:false,
	shopKeeperDisplay:false,
	parsnipBeaten: false,
	botnipBeaten: false,
	englishmanBeaten: false,
	allPlantsFound: false,
	
render:function()
{
	utility.clearAll();	
	shop.drawPrices();
	// draws all the shop images 
		utility.drawImage(
			gameplaySurface, imgShopBg,
			0, 0, imgShopBg.width, imgShopBg.height,
			0, 0, imgShopBg.width, imgShopBg.height
		);
		
		//the price  backgrounds 
		utility.drawImage(
			gameplaySurface, imgPrice,
			0, 0, imgPrice.width, imgPrice.height,
			94, 435, 128, 32
		);
		utility.drawImage(
			gameplaySurface, imgPrice,
			0, 0, imgPrice.width, imgPrice.height,
			94, 270, 128, 32
		);
		
		utility.drawImage(
			gameplaySurface, imgPrice,
			0, 0, imgPrice.width, imgPrice.height,
			260, 270, 128, 32
		);
		
		utility.drawImage(
			gameplaySurface, imgPrice,
			0, 0, imgPrice.width, imgPrice.height,
			260, 435, 128, 32
		);
		utility.drawImage(
			gameplaySurface, imgPrice,
			0, 0, imgPrice.width, imgPrice.height,
			430, 270, 128, 32
		);
		utility.drawImage(
			gameplaySurface, imgPrice,
			0, 0, imgPrice.width, imgPrice.height,
			430, 435, 128, 32
		);
			utility.drawImage(
			gameplaySurface, imgPrice,
			0, 0, imgPrice.width, imgPrice.height,
			600, 270, 128, 32
		);
		utility.drawImage(
			gameplaySurface, imgPrice,
			0, 0, imgPrice.width, imgPrice.height,
			600, 435, 128, 32
		);
		utility.drawImage(
			gameplaySurface, imgPrice,
			0, 0, imgPrice.width, imgPrice.height,
			765, 270, 128, 32
		);
		utility.drawImage(
			gameplaySurface, imgPrice,
			0, 0, imgPrice.width, imgPrice.height,
			930, 270, 128, 32
		);
		// the shop exit button
		utility.drawImage(
			gameplaySurface, imgExitButton,
			0, 0, imgExitButton.width, imgExitButton.height,
			932, 304, imgExitButton.width, imgExitButton.height
		);
		
	//draws the specific coins
		utility.drawImage(
			gameplaySurface, imgRock,
			0, 0, imgRock.width, imgRock.height,
			265, 140, imgRock.width,imgRock.height
			);
			
		utility.drawImage(
			gameplaySurface, imgWater,
			0, 0, imgWater.width, imgWater.height,
			598, 138, imgWater.width,imgWater.height
			);
		//for the second water coin
		utility.drawImage(
			gameplaySurface, imgSwimGoggles,
			0, 0, imgSwimGoggles.width, imgSwimGoggles.height,
			429, 140, imgSwimGoggles.width,imgSwimGoggles.height
			);
			utility.drawImage(
			gameplaySurface, imgAdventure,
			0, 0, imgAdventure.width, imgAdventure.height,
			96, 138, imgAdventure.width,imgAdventure.height
			);
			// checks if you have completed the game then draws the mystery sprite or the shop keeper sprite
			if(shop.botnipBeaten)
			{
				// Botnip sprite forward
			}
			else
			{
				utility.drawImage(
				gameplaySurface, imgMysterySprite,
				0, 0, imgMysterySprite.width, imgMysterySprite.height,
				97, 308, 128, 128
				);
			}
			if(shop.parsnipBeaten)
			{
				utility.drawImage(
				gameplaySurface, imgNip,
				0, 0, imgNip.width, imgNip.height,
				765, 138, imgNip.width,imgNip.height
				);
			}
			else
			{
				utility.drawImage(
				gameplaySurface, imgMysterySprite,
				0, 0, imgMysterySprite.width, imgMysterySprite.height,
				97, 308, 128, 128
				);
			}
			if(shop.allPlantsFound)
			{
				// brother sprite forward (Changes based off ethnicity of self)
			}
			else
			{
				utility.drawImage(
				gameplaySurface, imgMysterySprite,
				0, 0, imgMysterySprite.width, imgMysterySprite.height,
				97, 308, 128, 128
				);
			}
			if(shop.englishmanBeaten)
			{
				// british Wanderer sprite forward
			}
			else
			{
				utility.drawImage(
				gameplaySurface, imgMysterySprite,
				0, 0, imgMysterySprite.width, imgMysterySprite.height,
				97, 308, 128, 128
				);
			}
			utility.drawImage(
			gameplaySurface, imgAdventure,
			0, 0, imgAdventure.width, imgAdventure.height,
			934, 138, imgAdventure.width,imgAdventure.height
			);
			// shop keeper image
			utility.drawImage(
			gameplaySurface, imgShopSibling,
			0, 0, imgShopSibling.width, imgShopSibling.height,
			750, 300, imgShopSibling.width,imgShopSibling.height
			);
				
		
		//these must constantly be rendered in order to be display when needed.		
		shop.displayInfo();	
		shop.initShop();
		shop.buttonHandler();
		shop.infoDisplay();
		shop.drawPrices();
		
},
initShop:function()
{	
   //init the water Coin
	shop.superWaterCoin.price=30;
	shop.superWaterCoin.x=97;
	shop.superWaterCoin.y=308;
	shop.superWaterCoin.init();
	//init the adventure hat
	shop.adventure.price=30;
	shop.adventure.x=96;
	shop.adventure.y=138;
	shop.adventure.init();
	//init the rockCoin
	shop.rockCoin.price=10;
	shop.rockCoin.x=265;
	shop.rockCoin.y=140;
	shop.rockCoin.init();
	//init the second water coin
	shop.waterCoin.price=30;
	shop.waterCoin.x=429;
	shop.waterCoin.y=140;
	shop.waterCoin.init();	
	//inti the parsnip sprit
	shop.parsnipMask.x=765;
	shop.parsnipMask.y=138;
	shop.parsnipMask.price=300;
	shop.parsnipMask.init();
	//int the mystery sprite
	shop.mystery.price=300;
	shop.mystery.x=598;
	shop.mystery.y=138;
	shop.mystery.init();
	
	var strings=[];
			 strings.push(" gold: " + gameplay.gold);	
				menuSurface.drawImage(
						imgChest,
						785, 10
					);
					utility.writeText(menuSurface, strings, 840,45, 64 * 4 - 10, 25, false);
					strings.pop();
					
				strings.push("Click on the shop keeper for help using the shop." );
				utility.writeText(gameplaySurface, strings, 228, 28, 64 * 4, 20, false);
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
buyParsnip:function()
{
	if(shop.parsnipMask.description==true&&shop.parsnipMask.purchased==false)
	{
	
		shop.parsnipMask.buy();
		
		
	}

	shop.parsnipMask.description=true;
	shop.info=true;
	
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
		skillBook.swimSprint=true;
		
	}
	
	
	

	shop.info=true;
	shop.waterCoin.description=true;
	

},
buyWaterCoin:function()
{

	if(shop.superWaterCoin.description==true&&shop.superWaterCoin.purchased==false)
	{
		shop.superWaterCoin.buy();
		skillBook.swimLevel=skillBook.swimLevel+1;
	}
	shop.superWaterCoin.description=true;
	shop.info=true;
	
},
buyMystery:function()
{
	if(shop.mystery.description==true&&shop.mystery.purchased==false)
	{
		shop.mystery.buy();
		
	}
	shop.mystery.description=true;
	shop.info=true;
	
	
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
		shop.parsnipMask.description=false;
		shop.superWaterCoin.description=false;
		shop.mystery.description=false;
	
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
		utility.addClickItem( 97,308,imgWater.width,imgWater.height,this.buyWaterCoin,"");
		utility.addClickItem(750,300,imgShopSibling.width,imgShopSibling.height,this.shopKeeper,"");
		utility.addClickItem(765,138,imgNip.width,imgNip.height,this.buyParsnip,"");
		utility.addClickItem(598,138,128,128,this.buyMystery);
		
	}
	if(shop.info==true)
	{
			utility.drawImage(
			menuSurface, imgExitButton,
			0, 0, imgExitButton.width, imgExitButton.height,
			338, 364, 64,64
			
		);
		
			utility.addClickItem(338,364, 64,64,this.exitShop, "");
	}
	
},
//draws the prices below the items on top of the image.
drawPrices:function()
{
	var strings=[];				
	strings.push("30 gold" );
	utility.writeText(gameplaySurface, strings, 110, 290, 64 * 4, 20, false);
	strings.pop();
	strings.push(" 10 gold ");
	utility.writeText(gameplaySurface, strings, 270, 290, 64 * 4, 20, false);
	strings.pop();
	strings.push(" 30 gold ");
	utility.writeText(gameplaySurface, strings, 440, 290, 64 * 4, 20, false);
	strings.pop();
	strings.push(" 150 gold ");
	utility.writeText(gameplaySurface, strings, 620, 290, 64 * 4, 20, false);
	strings.pop();
	strings.push(" 300 gold ");
	utility.writeText(gameplaySurface, strings, 780, 290, 64 * 4, 20, false);
	strings.pop();
	strings.push(" 30 gold ");
	utility.writeText(gameplaySurface, strings, 94, 460, 64 * 4, 20, false);
	strings.pop();
	
},

infoDisplay:function()
{
	if(this.adventure.description==true)
	{
				var strings = [];
				strings.push(" The adventure hat increases your sprint speed." );
				utility.writeText(menuSurface, strings, 245, 290, 64 * 4, 25, false);
				utility.drawImage(
				menuSurface, imgAdventure,
				0, 0, imgAdventure.width, imgAdventure.height,
				315, 155, imgAdventure.width,imgAdventure.height
				
			);
			//if you have enough gold assigns the listener to the purchase button
				if(gameplay.gold>=this.adventure.price)
				{
					utility.drawImage(
			menuSurface, imgPurchaseButton,
			0, 0, imgPurchaseButton.width, imgPurchaseButton.height,
			402, 364, 64,64
			);
					utility.addClickItem(402,364, 64,64,this.buyAdventure, "");
					utility.addClickItem(402,364, 64,64,this.exitShop, "");
				}
				else
				utility.drawImage(
			menuSurface, imgTransButton,
			0, 0, imgTransButton.width, imgTransButton.height,
			402, 364, 64,64
			);
	}
	if(this.waterCoin.description==true)
	{
				var strings = [];
				strings.push(" The water Goggles allow you to Sprint while swimming." );
				utility.writeText(menuSurface, strings, 245, 290, 64 * 4, 20, false);
				utility.drawImage(
				menuSurface, imgSwimGoggles,
				0, 0, imgSwimGoggles.width, imgSwimGoggles.height,
				315, 155, imgSwimGoggles.width,imgSwimGoggles.height
			);
				if(gameplay.gold>=this.superWaterCoin.price)
				{
					utility.addClickItem(402,364, 64,64,this.buyWater, "");
					utility.addClickItem(402,364, 64,64,this.exitShop, "");
					utility.drawImage(
				menuSurface, imgPurchaseButton,
				0, 0, imgPurchaseButton.width, imgPurchaseButton.height,
				402, 364, 64,64
			);
				}
				else
				utility.drawImage(
			menuSurface, imgTransButton,
			0, 0, imgTransButton.width, imgTransButton.height,
			402, 364, 64,64
			);
				
				
	}
	if(this.superWaterCoin.description==true)
	{
				var strings = [];
				strings.push(" The water coin increases your swim speed.  " );
				utility.writeText(menuSurface, strings, 245, 290, 64 * 4, 20, false);
				utility.drawImage(
				menuSurface, imgWater,
				0, 0, imgWater.width, imgWater.height,
				315, 155, imgWater.width,imgWater.height
			);
				
				if(gameplay.gold>=this.superWaterCoin.price&&this.superWaterCoin.description==true)
				{
					utility.addClickItem(402,364, 64,64,this.buyWaterCoin, "");
					utility.addClickItem(402,364, 64,64,this.exitShop, "");
					utility.drawImage(
					menuSurface, imgPurchaseButton,
					0, 0, imgPurchaseButton.width, imgPurchaseButton.height,
					402, 364, 64,64
					);
				}
				else
				{
					utility.drawImage(
				    menuSurface, imgTransButton,
				    0, 0, imgTransButton.width, imgTransButton.height,
				    402, 364, 64,64
			);
				}
	}
	
	if(this.rockCoin.description==true)
	{
		
				var strings = [];
				strings.push(" The rock coin increases your climb speed. " );
				utility.writeText(menuSurface, strings, 245, 290, 64 * 4, 20, false);
				utility.drawImage(
				menuSurface, imgRock,
				0, 0, imgRock.width, imgRock.height,
				315, 155, imgRock.width,imgRock.height
			);
				if(gameplay.gold>=this.rockCoin.price)
				{
					utility.addClickItem(402,364, 64,64,this.buyRock, "");
					utility.addClickItem(402,364, 64,64,this.exitShop, "");
					utility.drawImage(
			menuSurface, imgPurchaseButton,
			0, 0, imgPurchaseButton.width, imgPurchaseButton.height,
			402, 364, 64,64
			);
				}
				else
				utility.drawImage(
			menuSurface, imgTransButton,
			0, 0, imgTransButton.width, imgTransButton.height,
			402, 364, 64,64
			);
	}
	if(this.shopKeeperDisplay==true)
	{
				var strings = [];
				strings.push("Welcome to the shop! You can click on any item to see a description of the item. Hit exit to return to the base camp. If you don't have enough gold				explore other maps and complete quests to receive gold to unlock items! " );
					utility.writeText(menuSurface, strings, 245, 200, 64 * 4, 20, false);
		
	}
	if(this.parsnipMask.description==true)
	{
		var strings = [];
		
				
				strings.push(" Once you purchase this hit the = button to become professor parsnip " );
				utility.writeText(menuSurface, strings, 245, 290, 64 * 4, 20, false);
				utility.drawImage(
				menuSurface, imgNip,
				0, 0, imgNip.width, imgNip.height,
				315, 155, imgNip.width,imgNip.height
			);
				if(gameplay.gold>=this.parsnipMask.price)
				{
					utility.drawImage(
			menuSurface, imgPurchaseButton,
			0, 0, imgPurchaseButton.width, imgPurchaseButton.height,
			402, 364, 64,64
			);
					utility.addClickItem(402,364, 64,64,this.buyParsnip, "");
					utility.addClickItem(402,364, 64,64,this.exitShop, "");
				}
				else
				utility.drawImage(
			menuSurface, imgTransButton,
			0, 0, imgTransButton.width, imgTransButton.height,
			402, 364, 64,64
			);
		
	}
	if(this.mystery.description==true)
	{
		if(gameplay.victory==false)
		{
			var strings = [];
			strings.push(" you have not completed the game yet.Once you defeat evil professor Parsnip this will be unlocked" );
				utility.writeText(menuSurface, strings, 245, 290, 64 * 4, 20, false);
				utility.drawImage(
				menuSurface, imgMysterySprite,
				0, 0, imgMysterySprite.width, imgMysterySprite.height,
				315, 155, 96,96
			);
		}
		
		
		
	}
	
	
	
}
};
 
