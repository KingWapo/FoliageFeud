// JavaScript Document
var shop ={
	display:true,
	adventure: Object.create(buyableObject),
	rockCoin: Object.create(buyableObject),
	waterCoin: Object.create(buyableObject),
	parsnipMask:Object.create(buyableObject),
	goggles:Object.create(buyableObject),
	mystery:Object.create(buyableObject),
	english:Object.create(buyableObject),
	Robot:Object.create(buyableObject),
	info:false,
	shopKeeperDisplay:false,
	parsnipBeaten: false,
	botnipBeaten: false,
	englishmanBeaten: false,
	allPlantsFound: false,
	siblingSprite: new Image(),
	
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
			425, 270, 128, 32
		);
		utility.drawImage(
			gameplaySurface, imgPrice,
			0, 0, imgPrice.width, imgPrice.height,
			425, 435, 128, 32
		);
			utility.drawImage(
			gameplaySurface, imgPrice,
			0, 0, imgPrice.width, imgPrice.height,
			595, 270, 128, 32
		);
		utility.drawImage(
			gameplaySurface, imgPrice,
			0, 0, imgPrice.width, imgPrice.height,
			595, 435, 128, 32
		);
	
		
		// the shop exit button
		utility.drawImage(
			gameplaySurface, imgExitButton,
			0, 0, imgExitButton.width, imgExitButton.height,
			932, 128, imgExitButton.width, imgExitButton.height
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
				utility.drawImage(
					menuSurface, imgRobotNipFront,
					0, 0, imgRobotNipFront.width, imgRobotNipFront.height,
					436, 308, 96,96
					
			);
			Robot.init();
			}
			else
			{
				utility.drawImage(
				gameplaySurface, imgMysterySprite,
				0, 0, imgMysterySprite.width, imgMysterySprite.height,
				425, 305, 128, 128
				);
			}
			// if parsnip is beaten draws the right sprite
			if(shop.parsnipBeaten)
			{
				utility.drawImage(
				gameplaySurface, imgNip,
				0, 0, imgNip.width, imgNip.height,
				265, 308, imgNip.width,imgNip.height
				);
			}
			else
			{
				utility.drawImage(
				gameplaySurface, imgMysterySprite,
				0, 0, imgMysterySprite.width, imgMysterySprite.height,
				260, 305, 128, 128
				);
			}
	//decides the sprite for your brother.			
	if (currentSprite == SpriteState.Boy || currentSprite == SpriteState.Girl)
	{
		this.siblingSprite = imgShopSibling;
	}
	else if (currentSprite == SpriteState.Boy2 || currentSprite == SpriteState.Girl2)
	{
		this.siblingSprite = imgShopSibling2;
	}
			if(shop.allPlantsFound)
			{
				utility.drawImage(
					gameplaySurface, this.siblingSprite,
					0, 0, imgShopSibling.width, imgShopSibling.height,
					90, 300, imgShopSibling.width,imgShopSibling.height
			);
			}
			else
			{
				utility.drawImage(
				gameplaySurface, imgMysterySprite,
				0, 0, imgMysterySprite.width, imgMysterySprite.height,
				94, 303, 128, 128
				);
			}
			if(shop.englishmanBeaten)
			{
				
				utility.drawImage(
					menuSurface, imgBritish,
					0, 0, imgBritish.width, imgBritish.height,
					604, 316, 96,96
				
			);
			this.english.init();
			}
			else
			{
				utility.drawImage(
				gameplaySurface, imgMysterySprite,
				0, 0, imgMysterySprite.width, imgMysterySprite.height,
				595, 303, 128, 128
				);
			}
		
			// shop keeper image
			utility.drawImage(
			gameplaySurface, this.siblingSprite,
			0, 0, imgShopSibling.width, imgShopSibling.height,
			750, 128, imgShopSibling.width,imgShopSibling.height
			);
			
			// shop keeper image
			utility.drawImage(
			gameplaySurface, imgMorphButton,
			0, 0, imgMorphButton.width, imgMorphButton.height,
			750, 320, imgMorphButton.width,imgMorphButton.height
			);
			
			utility.addClickItem(750, 320, imgMorphButton.width, imgMorphButton.height, this.changeSkin, [])
				
		
		//these must constantly be rendered in order to be display when needed.		
		shop.displayInfo();	
		shop.buttonHandler();
		shop.infoDisplay();
		shop.drawPrices();
		shop.initShop();
		
},
initShop:function()
{	
   //init the water Coin
	shop.goggles.price=30;
	shop.goggles.x=598;
	shop.goggles.y=138;
	shop.goggles.init();
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
	//init the parsnip sprit
	shop.parsnipMask.x=265;
	shop.parsnipMask.y=308;
	shop.parsnipMask.price=300;
	shop.parsnipMask.init();
	//init the unlockable brother sprite.
	shop.mystery.price=150;
	shop.mystery.x=96;
	shop.mystery.y=308;
	shop.mystery.init();
	//initate english
	shop.english.price=150;
	shop.english.x=604;
	shop.english.y=316;
	
	//initiate robot
	shop.Robot.price=150;
	shop.Robot.x=436;
	shop.Robot.y=308;
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

changeSkin: function(empty)
{
	console.debug("Changing Skin");
	if (shop.parsnipMask.purchased || shop.siblingSprite.purchased || shop.english.purchased || shop.Robot.purchased)
	{
		characterSelection.fromShop = true;
		characterSelection.init();
		currentScreen = ScreenState.CharacterSelection;
	}
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

	if(shop.goggles.description==true&&shop.goggles.purchased==false)
	{
		shop.goggles.buy();
		skillBook.swimLevel=skillBook.swimLevel+1;
	}
	shop.goggles.description=true;
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
buyEnglish:function()
{
	
	if(shop.english.description==true&&shop.english.purchased==false)
	{
		shop.english.buy();
	}
	shop.english.description=true;
	shop.info=true;
	
},
buyRobot:function()
{
	if(shop.Robot.description==true)
	{
		shop.Robot.buy();
	}
	shop.Robot.description=true;
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
		shop.goggles.description=false;
		shop.mystery.description=false;
		shop.english.description=false;
		shop.Robot.description=false;
	
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
		utility.addClickItem(932, 128, imgExitButton.width, imgExitButton.height,this.exitShop, "");
		utility.addClickItem( 96,138,imgAdventure.width,imgAdventure.height,this.buyAdventure,"");
		utility.addClickItem( 265,140,imgRock.width,imgRock.height,this.buyRock,"");
		utility.addClickItem( 429,140,imgWater.width,imgWater.height,this.buyWater,"");
		utility.addClickItem( 96,308,imgWater.width,imgWater.height,this.buyMystery,"");
		utility.addClickItem(750,128,imgShopSibling.width,imgShopSibling.height,this.shopKeeper,"");
		utility.addClickItem(265,308,imgNip.width,imgNip.height,this.buyParsnip,"");
		utility.addClickItem(598,138,128,128,this.buyWaterCoin);
		utility.addClickItem(436,308,128,128,this.buyRobot);
		utility.addClickItem(604,316,128,128,this.buyEnglish);
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
	utility.writeText(gameplaySurface, strings, 425, 290, 64 * 4, 20, false);
	strings.pop();
	strings.push(" 30 gold ");
	utility.writeText(gameplaySurface, strings, 605, 290, 64 * 4, 20, false);
	strings.pop();
	strings.push(" 300 gold ");
	utility.writeText(gameplaySurface, strings, 270 ,455, 64 * 4, 20, false);
	strings.pop();
	strings.push(" 150 gold ");
	utility.writeText(gameplaySurface, strings, 94, 455, 64 * 4, 20, false);
	strings.pop();
	strings.push("150 gold");
	utility.writeText(gameplaySurface, strings, 430, 455, 64 * 4, 20, false);
	strings.pop();
	strings.push("150 gold");
	utility.writeText(gameplaySurface, strings, 610, 455, 64 * 4, 20, false);
	
	
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
				if(gameplay.gold>=this.adventure.price && this.adventure.purchased==false)
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
				if(gameplay.gold>=this.waterCoin.price&&this.waterCoin.purchased==false)
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
	if(this.goggles.description==true)
	{
				var strings = [];
				strings.push(" The water coin increases your swim speed.  " );
				utility.writeText(menuSurface, strings, 245, 290, 64 * 4, 20, false);
				utility.drawImage(
				menuSurface, imgWater,
				0, 0, imgWater.width, imgWater.height,
				315, 155, imgWater.width,imgWater.height
			);
				
				if(gameplay.gold>=this.goggles.price&&this.goggles.purchased==false)
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
				if(gameplay.gold>=this.rockCoin.price&&this.rockCoin.purchased==false)
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
		
				if(shop.parsnipBeaten)
				{
					strings.push("Purchase this to become the dreaded Parsnip!" );
					utility.writeText(menuSurface, strings, 245, 290, 64 * 4, 20, false);
					utility.drawImage(
					menuSurface, imgNip,
					0, 0, imgNip.width, imgNip.height,
					315, 155, imgNip.width,imgNip.height		
					);
						if(gameplay.gold>=this.parsnipMask.price&& shop.parsnipBeaten&&this.parsnipMask.purchased==false)
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
				{
				utility.drawImage(
				menuSurface, imgTransButton,
				0, 0, imgTransButton.width, imgTransButton.height,
				402, 364, 64,64
				
				);
				}
					
				}
				else
				{
					var strings = [];
					strings.push("This unlocks once you have defeated the evil parsnip!" );
					utility.writeText(menuSurface, strings, 245, 290, 64 * 4, 20, false);
					utility.drawImage(
					menuSurface, imgMysterySprite,
					0, 0, imgMysterySprite.width, imgMysterySprite.height,
					315, 155, 96,96
			);
					
					
					
					
				}
			
				utility.addClickItem(402,364, 64,64,this.exitShop, "");
				
		
	}
	if(this.mystery.description==true)
	{
		if(shop.allPlantsFound==false)
		{
			var strings = [];
			strings.push("Collect all the plants to unlock this skin!" );
				utility.writeText(menuSurface, strings, 245, 290, 64 * 4, 20, false);
				utility.drawImage(
					menuSurface, imgMysterySprite,
					0, 0, imgMysterySprite.width, imgMysterySprite.height,
					315, 155, 96,96
			);
				
			
		
			
		}
		else
		{
			var strings = [];
			strings.push("Purchase this to become your brilliant scientist of a brother." );
				utility.writeText(menuSurface, strings, 245, 290, 64 * 4, 20, false);
				utility.drawImage(
					menuSurface, this.siblingSprite,
					0, 0, imgShopSibling.width, imgShopSibling.height,
					315, 155, imgShopSibling.width,imgShopSibling.height
					);
				
			if(gameplay.gold>=shop.mystery.price&& shop.mystery.purchased==false)
				{
					
					utility.drawImage(
				menuSurface, imgPurchaseButton,
				0, 0, imgPurchaseButton.width, imgPurchaseButton.height,
				402, 364, 64,64
				);
					utility.addClickItem(402,364, 64,64,this.buyMystery, "");
					utility.addClickItem(402,364, 64,64,this.exitShop, "");
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
		
		
	}
	// copied for english man beaten code.
	if(this.english.description==true)
	{
		var strings = [];
		
				if(shop.englishmanBeaten)
				{
					strings.push("Purchase this to become the wondering English man" );
					utility.writeText(menuSurface, strings, 245, 290, 64 * 4, 20, false);
					utility.drawImage(
					menuSurface, imgBritish,
					0, 0, imgBritish.width, imgBritish.height,
					315, 155, imgBritish.width,imgBritish.height		
					);
			if(gameplay.gold>=this.english.price&&this.englishmanBeaten&&this.english.purchased==false)
				{
					utility.drawImage(
				menuSurface, imgPurchaseButton,
				0, 0, imgPurchaseButton.width, imgPurchaseButton.height,
				402, 364, 64,64
			);
					utility.addClickItem(402,364, 64,64,this.buyEnglish, "");
					utility.addClickItem(402,364, 64,64,this.exitShop, "");
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
				else
				{
					var strings = [];
					strings.push("This unlocks once you have defeated the English man!" );
					utility.writeText(menuSurface, strings, 245, 290, 64 * 4, 20, false);
					utility.drawImage(
					menuSurface, imgMysterySprite,
					0, 0, imgMysterySprite.width, imgMysterySprite.height,
					315, 155, 96,96
			);	
				}
	}
	
	if(this.Robot.description==true)
	{
		var strings = [];
		
				if(shop.botnipBeaten)
				{
					strings.push("Purchase this to become the EVIL BOTNIP!!!!" );
					utility.writeText(menuSurface, strings, 245, 290, 64 * 4, 20, false);
					utility.drawImage(
					menuSurface, imgRobotNipFront,
					0, 0, imgRobotNipFront.width, imgRobotNipFront.height,
					315, 155, imgRobotNipFront.width,imgRobotNipFront.height		
					);
			if(gameplay.gold>=this.Robot.price&&this.botnipBeaten&&this.Robot.purchased==false)
				{
					utility.drawImage(
				menuSurface, imgPurchaseButton,
				0, 0, imgPurchaseButton.width, imgPurchaseButton.height,
				402, 364, 64,64
			);
					utility.addClickItem(402,364, 64,64,this.buyRobot, "");
					utility.addClickItem(402,364, 64,64,this.exitShop, "");
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
				else
				{
					var strings = [];
					strings.push("You must defeat the evil Botnip!" );
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
 
