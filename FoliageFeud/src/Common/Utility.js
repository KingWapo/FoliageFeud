// Created by Batman

// Clickable object
// Stores location, size, and function to run when clicked
var clickObj = {
	x: 0,
	y: 0,
	w: 0,
	h: 0,
	func: "",
	param: ""
};

// Click Handler
var utility = {
	// List of clickable objects in current screen
	clickable: [],
	mouseOver:[],
	colors: [],
	totalNumAssets: 0,
	curNumAssets: 0,
	curSong: '',
	writting:false,
	textIndex: 0,
	textShown: false,
	onEsc: false,
	scale: 1,
	originalWidth: 1152,
	originalHeight: 512,
	debugSound: true,
	debugAll: true,
	
	// Clear screen and all objects from clickable
	clearAll: function()
	{
		this.clearClickHandler();
		this.clearSurfaces();
	},
	
	clearSurfaces: function()
	{
		backgroundSurface.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
		gameplaySurface.clearRect(0, 0, gameplayCanvas.width, gameplayCanvas.height);
		menuSurface.clearRect(0, 0, menuCanvas.width, menuCanvas.height);
	},
	
	drawImage: function(context, sprite, xSrc, ySrc, wSrc, hSrc, x, y, w, h)
	{
		context.drawImage
		(
			sprite,
			xSrc, ySrc, wSrc, hSrc,
			x * utility.scale, y * utility.scale, w * utility.scale, h * utility.scale
		);
	},
	
	drawTextBox: function(strings, width, func)
	{
		// width = "not in use"
		utility.textShown = true;
		if (utility.textIndex < strings.length)
		{
			utility.drawImage
			(
				menuSurface, imgLargeTextBox,
				0, 0, imgLargeTextBox.width, imgLargeTextBox.height,
				0, CANVAS_HEIGHT - 120, imgLargeTextBox.width, imgLargeTextBox.height
			);
			
			utility.writeText(menuSurface, [strings[utility.textIndex]], 16, CANVAS_HEIGHT - 72, 840, 20, false);
			utility.writeForClick(menuSurface, ["ENTER"], 800, CANVAS_HEIGHT - 136 + imgLargeTextBox.height, 100, 20, false, [utility.advanceText, ['']]);
		}
		else
			utility.exitText(func);
	},
	
	advanceText: function()
	{
		if (mainCamp.talkingInMainCamp)
		{
			if (mainCamp.broTalk <= 7 || mainCamp.broTalk >= 13) { }
			else if (mainCamp.broTalk != 12)
			{
				mainCamp.broTalk = (mainCamp.broTalk + 1) % (12);
			}
			else
			{
				mainCamp.exitToGameplay("");
			}
		}
		else
		{
			utility.textIndex += 1;
		}
	},
	
	exitText: function(func)
	{
		utility.textIndex = 0;
		utility.textShown = false;
		func();
	},
	
	handleScale: function()
	{
		var offset = 20;
		
		utility.scale = Math.min(1, Math.min(((window.innerWidth - offset) / utility.originalWidth), ((window.innerHeight - offset) / utility.originalHeight)));
		
		backgroundCanvas.setAttribute('width', utility.originalWidth * utility.scale);
		backgroundCanvas.setAttribute('height', utility.originalHeight * utility.scale);
		gameplayCanvas.setAttribute('width', utility.originalWidth * utility.scale);
		gameplayCanvas.setAttribute('height', utility.originalHeight * utility.scale);
		menuCanvas.setAttribute('width', utility.originalWidth * utility.scale);
		menuCanvas.setAttribute('height', utility.originalHeight * utility.scale);
		
		backgroundCanvas.style.left = ((window.innerWidth - backgroundCanvas.width) / 2) - 10 + "px";
		gameplayCanvas.style.left = ((window.innerWidth - gameplayCanvas.width) / 2) - 10 + "px";
		menuCanvas.style.left = ((window.innerWidth - menuCanvas.width) / 2) - 10 + "px";
		
		var description = document.getElementById('description');
		description.style.paddingTop = CANVAS_HEIGHT * utility.scale + 20 + "px";
		description.style.paddingLeft = backgroundCanvas.style.left;
		
		//console.debug(utility.scale);
	},
	
	// Add item to the list
	addClickItem: function(x, y, width, height, func, param)
	{
		var item = Object.create(clickObj);
		item.x = x;
		item.y = y;
		item.width = width;
		item.height = height;
		item.func = func;
		item.param = param;
		
		// Debug location of click items
		/*
		gameplaySurface.fillStyle = "black";
		gameplaySurface.rect(x, y, width, height);
		gameplaySurface.stroke();
		*/
		
		this.clickable.push(item);
	},
	// Add item to the list
	addMouseOver: function(x, y, width, height, func, param)
	{
		var item = Object.create(clickObj);
		item.x = x;
		item.y = y;
		item.width = width;
		item.height = height;
		item.func = func;
		item.param = param;
		
		// Debug location of click items
		/*menuSurface.fillStyle = "black";
		menuSurface.rect(x, y, width, height);
		menuSurface.stroke();*/
		
		utility.mouseOver.push(item);
		console.debug(utility.mouseOver[0].x);
		console.debug(item.x +" cheese  "+ item.y );
	},
	
	// Clear list
	clearClickHandler: function()
	{
		this.clickable = [];
	},
	
	// Determines if object was clicked, and runs function
	handleClick: function(event)
	{
		// Gets position of click
		var rect = gameplayCanvas.getBoundingClientRect();
		var posx = event.clientX - rect.left;
		var posy = event.clientY - rect.top;
	
		
		// Checks each object to see if it was clicked
		for (var i = 0; i < utility.clickable.length; i++)
		{
			var x = utility.clickable[i].x * utility.scale;
			var y = utility.clickable[i].y * utility.scale;
			var w = utility.clickable[i].width * utility.scale;
			var h = utility.clickable[i].height * utility.scale;
			
			//console.debug(posx+ " "+posy);
			// If image was clicked, runs specified function
			if (posx >= x && posx <= x + w &&
				posy >= y && posy <= y + h )
			{
				utility.clickable[i].func(utility.clickable[i].param);
			}
		}
	},
	
	loadImage: function(source)
	{
		try {
			utility.totalNumAssets += 1;
			
			var tempImage = new Image();
			tempImage.src = source;
			
			tempImage.addEventListener("load", utility.loadedAsset, false);
			
			return tempImage;
		} catch (err) { console.log("Art asset failed to load: " + err); }
	},
	
	loadSong: function(source)
	{
		try {
			utility.totalNumAssets += 1;
			
			var tempSong = new Audio(source);
			tempSong.loop = true;
			
			tempSong.addEventListener("canplay", utility.loadedAsset, false);
			
			return tempSong;
		} catch (err) { console.log("Sound asset failed to load: " + err); }
	},
	
	loadedAsset: function()
	{
		utility.clearAll();
		if (utility.curNumAssets < utility.totalNumAssets)
		{
			utility.curNumAssets += 1;
			
			var x = 76 * utility.scale;
			var y = 206 * utility.scale;
			var w = 1000 * utility.scale;
			var h = 100 * utility.scale;
			
			menuSurface.rect(x, y, w, h);
			menuSurface.stroke();
			
			menuSurface.fillStyle = "#006600";
			menuSurface.fillRect(x, y, w * (utility.curNumAssets / utility.totalNumAssets), h);
			
			utility.writeText(menuSurface, [loadingStatus[Math.floor(Math.random() * loadingStatus.length)]], 100, 270, CANVAS_WIDTH, 48, false);
			
			if (utility.curNumAssets === utility.totalNumAssets)
				//setTimeout(function(){
				mainUpdate();//}, 1000);
		}
	},
	
	// Shuffle array
	shuffle: function(array)
	{
		var curIndex = array.length;
		var tempVal;
		var randIndex;
		
		while (0 !== curIndex)
		{
			randIndex = Math.floor(Math.random() * curIndex);
			curIndex -= 1;
			
			tempVal = array[curIndex];
			array[curIndex] = array[randIndex];
			array[randIndex] = tempVal;
		}
		
		return array;
	},
	 
	// Write text to screen, wrapping if hits max width
	writeText: function(context, text, x, y, maxWidth, fontSize, hasStrikethrough)
	{
		var originalWidth = maxWidth;
		var originalSize = fontSize;
		
		x = x * utility.scale;
		y = y * utility.scale;
		maxWidth = maxWidth * utility.scale;
		fontSize = Math.floor(fontSize * utility.scale);
		
		context.fillStyle = "black";
		context.font = fontSize + "px ComingSoon";
		
		context.lineWidth = 1;
		context.strokeStyle = "black";
		
		var width = 0;
		var height = 0;
		
		for (var j = 0; j < text.length; j++)
		{
			var words = text[j].split(' ');
			var line = '';
			
			for (var i = 0; i < words.length; i++)
			{
				var testLine = line + words[i] + ' ';
				var metrics = context.measureText(testLine);
				var testWidth = metrics.width;
				
				if (testWidth > maxWidth && i > 0)
				{
						
					context.fillText(line, x, y);
					
					if (hasStrikethrough)
					{
						context.beginPath();
						context.strokeStyle = "black";
						context.lineWidth = 1;
						context.moveTo(x - (5 * utility.scale), y - (fontSize * .3));
						context.lineTo(x + context.measureText(line).width + (5 * utility.scale), y - (fontSize * .3));
						context.stroke();
					}
						
					line = words[i] + ' ';
					y += fontSize;
					height += originalSize;
				}
				else
				{
					if (testWidth > width * (maxWidth / originalWidth))
						width = testWidth * (originalWidth / maxWidth);
						
					line = testLine;
				}
			}
			
			context.fillText(line, x, y);
			
			height += originalSize;
			
			if (hasStrikethrough)
			{
				context.beginPath();
				context.strokeStyle = "black";
				context.lineWidth = 1;
				context.moveTo(x - (5 * utility.scale), y - (fontSize * .3));
				context.lineTo(x + context.measureText(line).width + (5 * utility.scale), y - (fontSize * .3));
				context.stroke();
			}
			
			y += fontSize * 2;
		}
		
		return [width, height];
	},
	
	// Write text to screen, wrapping if hits max width, and adding a click handler
	// clickHandler[0] is function
	// clickHandler[1] is array of parameters
	writeForClick: function(context, text, x, y, maxWidth, fontSize, hasStrikethrough, clickHandler)
	{
		var size = utility.writeText(context, text, x, y, maxWidth, fontSize, hasStrikethrough);
		utility.addClickItem(x - 5, y - fontSize, size[0] + 10, size[1] + 5, clickHandler[0], clickHandler[1]);
		
		/*
		context.fillStyle = "black";
		context.rect(x - 5, y - fontSize, size[0] + 10, size[1] + 5);
		context.stroke();
		*/
	},
	
	contains: function(array, element)
	{
		for (var i = 0; i < array.length; i++)
		{
			if (array[i] === element){
				//console.debug("found dupe");
				return true;
			}
		}
		
		return false;
	},
	
	clamp: function(val, minVal, maxVal)
	{
		return Math.min(maxVal, Math.max(val, minVal));
	},
	
	collisionDetection: function(chaseTheCollider, brandonTheCollidee)
	{
		if ( chaseTheCollider.x + 8 > brandonTheCollidee.x + brandonTheCollidee.width ||
			 chaseTheCollider.x + 8 + 48 < brandonTheCollidee.x ||
			 chaseTheCollider.y + 32 > brandonTheCollidee.y + brandonTheCollidee.height ||
			 chaseTheCollider.y + 32 + 32< brandonTheCollidee.y) {
			return false;
		}
		else {
			gameplaySurface.fillStyle = "black";
			gameplaySurface.rect(brandonTheCollidee.x, brandonTheCollidee.y, brandonTheCollidee.width, brandonTheCollidee.height);
			gameplaySurface.stroke();
			
			//console.debug('COLLIDING');
			return true;
		}
	},
	
	reorderArrayByY: function(array)
	{
		var oldArray = array;
		var newArray = [];
		var j = 0;
		while (j < oldArray.length)
		{
			if (oldArray[j].name == "empty")
			{
				oldArray.splice(j, 1);
			}
			else
				j++
		}
		while (oldArray.length > 0)
		{
			var minY = 9001;
			var index = -1;
			for (var i = 0; i < oldArray.length; i++)
			{
				var yVal = oldArray[i].y;
				if (oldArray[i].name == "player")
				{
					yVal += 32;
				}
				else if (oldArray[i].name == "tree")
				{
					yVal += 104;
				}
				else if (oldArray[i].name == "birch tree")
				{
					yVal += 40;
				}
				else if (oldArray[i].name == "praire grass")
				{
					yVal += 32;
				}
				else if (oldArray[i].name == "teleporter")
				{
					yVal += 64;
				}
				else if (oldArray[i].name == "observation point")
				{
					yVal = oldArray[i].lowestPos;
				}
				else if (oldArray[i].name == "training" ||
						 oldArray[i].name == "store" ||
						 oldArray[i].name == "main camp" ||
						 oldArray[i].name == "plants")
				{
					yVal += 128;
				}
				if (yVal < minY)
				{
					minY = yVal;
					index = i;
				}
			}
			newArray.push(oldArray[index]);
			oldArray.splice(index, 1);
		}
		return newArray;
	},
	
	startNewSong: function(newSong)
	{
		if (utility.curSong != '')
		{
			utility.curSong.pause();
		}
		
		if (utility.debugSound)
		{
			utility.curSong = newSong;
			utility.curSong.load();
			utility.curSong.play();
		}
	},
	
	debugDimensions: function(sprite)
	{
		console.debug("Sprite dimensions for " + sprite.name + " are: " + 
					  "x: " + sprite.x + " y: " + sprite.y + " w: " + sprite.width + " h: " + sprite.height + "\n" +
					  "source x: " + sprite.sourceX + " source y: " + sprite.sourceY + " source w: " + sprite.sourceWidth + " source h: " + sprite.sourceHeight);
	},
	
	drawEsc: function()
	{
		utility.writeForClick(menuSurface, ["Save"], CANVAS_WIDTH / 2 - 16, CANVAS_HEIGHT / 2 - 16, 200, 32, false, [function(){console.debug("clickyclick");if (gameplay.canSave)utility.setCookie();}, ['']]);
	},
	
	setCookie: function()
	{
		var d = new Date();
		d.setTime(d.getTime() + (365 * 100 * 24 * 60 * 60 * 1000));
		var cookie = "FoliageFeud=";
		cookie += currentSprite + ".";
		cookie += gameplay.gold + ".";
		
		var plantsFound = "";
		for (var i = 0; i < plantList.length; i++)
		{
			if (plantList[i].harvested)
				plantsFound += "1";
			else
				plantsFound += "0";
		}
		
		var plantsToFind = "";
		var regionsToVisit = "";
		for (var i = 0; i < quests.plantsToIdentify.length; i++)
		{
			plantsToFind += ("0" + quests.plantsToIdentify[i]).slice(-2);
			regionsToVisit += quests.regionsToVisit[i];
		}
		
		var finishedQuests = "";
		for (var i = 0; i < quests.finishedQuests.length; i++)
		{
			finishedQuests += ("0" + quests.finishedQuests[i]).slice(-2);
		}
		
		cookie += plantsFound + ".";
		cookie += plantsToFind + ".";
		cookie += regionsToVisit + ".";
		cookie += finishedQuests + ".";
		cookie += gameplay.visitedBrother + ".";
		cookie += shop.botnipBeaten + ".";
		cookie += shop.englishmanBeaten + ".";
		cookie += shop.allPlantsFound + ".";
		cookie += shop.parsnipBeaten + ".";
		cookie += skillBook.swimLevel + ".";
		cookie += skillBook.climbLevel + ".";
		cookie += skillBook.sprintLevel + ";";
		cookie += "expires=" + d.toGMTString();
		
		document.cookie = cookie;
	},
	
	getCookie: function(cname)
	{
		var name = cname + "=";
		var ca = document.cookie.split(';');
		
		for (var i = 0; i < ca.length; i++)
		{
			var c = ca[i].trim();
			if (c.indexOf(name) == 0)
				return c.substring(name.length, c.length);
		}
		
		return "";
	},
	
	checkCookie: function()
	{
		var player = utility.getCookie("FoliageFeud");
		
		if (player != "")
		{
			console.debug("Welcome back, player!");
			
			var data = player.split('.');
			
			currentSprite = parseInt(data[0]);
			gameplay.gold = parseInt(data[1]);
			
			for (var i = 0; i < data[2].length; i++)
			{
				if (i < plantList.length && data[2][i] == "1")
					plantList[i].harvested = true;
			}
			
			for (var i = 0; i < data[3].length / 2; i++)
			{
				quests.plantsToIdentify.push((parseInt(data[3][i * 2]) * 10) + parseInt(data[3][i * 2 + 1]));
				quests.regionsToVisit.push(parseInt(data[4][i]));
			}
			
			for (var i = 0; i < data[5].length / 2; i++)
			{
				quests.finishedQuests.push((parseInt(data[5][i * 2]) * 10) + parseInt(data[5][i * 2 + 1]));
				console.debug(quests.finishedQuests[i], " ", plantList[quests.finishedQuests[i]].name);
			}
			
			gameplay.visitedBrother = data[6] == "true" ? true : false;
			shop.botnipBeaten = data[7] == "true" ? true : false;
			shop.englishmanBeaten = data[8] == "true" ? true : false;
			shop.allPlantsFound = data[9] == "true" ? true : false;
			shop.parsnipBeaten = data[10] == "true" ? true : false;
			
			skillBook.swimLevel = parseInt(data[11]);
			skillBook.climbLevel = parseInt(data[12]);
			skillBook.sprintLevel = parseInt(data[13]);
			
			gameplay.canSave = true;
			gameplay.loadingSave = true;
			currentScreen = ScreenState.Gameplay;
			
			console.debug("sprite: ", currentSprite);
			console.debug("gold: ", gameplay.gold);
			console.debug("plants: ", data[2]);
			console.debug("quests: ", data[3]);
			console.debug("regions: ", data[4]);
			console.debug("finished: ", data[5]);
			console.debug("brother: ", gameplay.visitedBrother);
			console.debug("bot beat: ", shop.botnipBeaten);
			console.debug("dean beat: ", shop.englishmanBeaten);
			console.debug("plants found: ", shop.allPlantsFound);
			console.debug("snip beat: ", shop.parsnipBeaten);
			console.debug("swim: ", skillBook.swimLevel);
			console.debug("climb: ", skillBook.climbLevel);
			console.debug("sprint: ", skillBook.sprintLevel);
		}
		else
		{
			console.debug("No player data available.");
		}
	}
};

window.addEventListener("click", utility.handleClick, false);
window.addEventListener("resize", utility.handleScale, false);
window.addEventListener("keyup", function(event)
{
	switch (event.keyCode)
	{
		case 27: //esc
			if (!gameplay.onPause)
			{
				gameplay.enterPause();
				utility.onEsc = true;
			}
			else
			{
				gameplay.exitPause();
				utility.onEsc = false;
			}
			break;
		case ENTER:
			//console.debug("enter pressed");
			if (utility.textShown)
			{
				utility.advanceText();
				//console.debug("advanced");
			}
			break;
	}
}, false);

var imgCommonBg = utility.loadImage("../img/Backgrounds/commonBackground.png");
var imgMenuBg = utility.loadImage("../img/Backgrounds/menuscreen.png");
var imgISpyBg = utility.loadImage("../img/Backgrounds/iSpyScreen.png");
var imgISpyOverlay = utility.loadImage("../img/Backgrounds/iSpyOverlay.png");
var imgInfoSmallOverlay = [];
imgInfoSmallOverlay.push(utility.loadImage("../img/Backgrounds/infoOverlay00.png"));
imgInfoSmallOverlay.push(utility.loadImage("../img/Backgrounds/infoOverlay01.png"));
imgInfoSmallOverlay.push(utility.loadImage("../img/Backgrounds/infoOverlay02.png"));
var imgInfoOverlay = utility.loadImage("../img/Backgrounds/informationOverlay.png");
var imgQuestLog = utility.loadImage("../img/Backgrounds/questlog.png");
var imgMap1 = utility.loadImage("../img/Maps/Map1.PNG");
var imgForestMap = utility.loadImage("../img/Maps/forest.PNG");
var imgMarshMap = utility.loadImage("../img/Maps/marsh.PNG");
var imgHillyMap = utility.loadImage("../img/Maps/hilly.PNG");
var imgMapBackground = utility.loadImage("../img/Backgrounds/mapSelectionBackground.png");
var imgMapTilesheet = utility.loadImage("../img/Tiles/MapTilesheet.png");
var imgMapLegend = utility.loadImage("../img/Tiles/MapDirectionTiles.png");
var imgGirlButton = utility.loadImage("../img/Buttons/playButtonGirl.png");
var imgBoyButton = utility.loadImage("../img/Buttons/playButtonBoy.png");
var imgExitButton = utility.loadImage("../img/Buttons/exitButton.png");
var imgLeftArrow = utility.loadImage("../img/Buttons/arrowLeft.png");
var imgRightArrow = utility.loadImage("../img/Buttons/arrowRight.png");
var imgLeftDrawnArrow = utility.loadImage("../img/Buttons/arrowDrawnLeft.png");
var imgRightDrawnArrow = utility.loadImage("../img/Buttons/arrowDrawnRight.png");
var imgQuestionMark = utility.loadImage("../img/Buttons/QuestionMark.png");
var imgInfoButton = utility.loadImage("../img/Buttons/infoButton.png");
var imgMaleSprite = utility.loadImage("../img/Player/characterMale.png");
var imgFemaleSprite = utility.loadImage("../img/Player/characterFemale.png");
var imgMaleDiverseSprite = utility.loadImage("../img/Player/characterMaleDiverse.png");
var imgFemaleDiverseSprite = utility.loadImage("../img/Player/characterFemaleDiverse.png");
var imgParsnipSprite = utility.loadImage("../img/Player/drparsnip.png");
var imgDingleSprite = utility.loadImage("../img/Player/siblingMale.png");
var imgBlackDingleSprite = utility.loadImage("../img/Player/siblingMaleDiverse.png");
var imgUnicornSprite = utility.loadImage("../img/Player/unicorn.png");
var imgBotnipSprite = utility.loadImage("../img/Player/botnip.png");
var imgEnglishmanSprite = utility.loadImage("../img/Player/britishWanderer.png");
var imgTimer = utility.loadImage("../img/WorldEvent/timer.png");
var imgTimerBg = utility.loadImage("../img/WorldEvent/timerBackground.png");
var imgCheckmark = utility.loadImage("../img/WorldEvent/Checkmark.png");
var imgInvasivemark = utility.loadImage("../img/WorldEvent/Invasive Mark.png");
var imgShopBg = utility.loadImage(" ../img/Backgrounds/shopscreen.png");
var imgAdventure =utility.loadImage("../img/Hats/explorer.png");
var imgSold = utility.loadImage("../img/Tokens/purchased.png");
var imgWater= utility.loadImage("../img/Tokens/purchased.png");
var imgRock= utility.loadImage("../img/Tokens/rockCoin.png");
var imgChest=utility.loadImage("../img/moneyicon.png");
var imgWater=utility.loadImage("../img/Tokens/waterCoin.png");
var imgNip=utility.loadImage("../img/Tokens/drparsniptoken.png");
var imgShopSibling = utility.loadImage("../img/Player/siblingHR.png");
var imgShopSibling2 = utility.loadImage("../img/Player/siblingDiverseHR.png");
var imgItemInfo = utility.loadImage("../img/Backgrounds/iteminfo.png");
var imgPurchaseButton=utility.loadImage("../img/Buttons/buyButton.png");
var imgCompassBackground = utility.loadImage("../img/Backgrounds/compass.png");
var imgCompassArrow = utility.loadImage("../img/Backgrounds/compassarrow.png");
var imgLargeTextBox = utility.loadImage("../img/Backgrounds/textboxbig.png");
var imgSmallTextBox = utility.loadImage("../img/Backgrounds/textboxsmall.png");
var imgTrainingBackground = utility.loadImage("../img/Backgrounds/trainingicon.png");
var imgGoldCoin= utility.loadImage("../img/Tokens/speedToken.png");
var imgPrice=utility.loadImage("../img/Buttons/shopbuybutton.png");
var imgBackgroundMainCamp = utility.loadImage("../img/Backgrounds/plantsBackground.png");
var imgPostItNote = utility.loadImage("../img/Backgrounds/plantsUnderlay01.png");
var imgTransButton = utility.loadImage("../img/Buttons/buyButtonTransperent.png");
var imgMysterySprite= utility.loadImage("../img/Player/siblingShopSecret.png");

var imgLoadGameButton = utility.loadImage("../img/Buttons/loadButton.png");
var imgNewGameButton = utility.loadImage("../img/Buttons/newButton.png");
var imgDemoButton = utility.loadImage("../img/Buttons/demoButton.png");
var imgCreditsButton = utility.loadImage("../img/Buttons/creditsButton.png");

var imgBoyTalking = utility.loadImage("../img/Player/characterMaleForward.png");
var imgSwimGoggles = utility.loadImage("../img/Hats/swimming.png");

var imgVsPlayer = utility.loadImage("../img/Backgrounds/vsPlayer.png");
var imgVsBotnip = utility.loadImage("../img/Backgrounds/vsBotnip.png");
var imgVsParsnip = utility.loadImage("../img/Backgrounds/vsParsnip.png");
var imgVsParsnipSecond = utility.loadImage("../img/Backgrounds/vsParsnipSecond.png");
var imgVsEnglishman = utility.loadImage("../img/Backgrounds/vsEnglishman.png");
var imgVsNature = utility.loadImage("../img/Backgrounds/vsNature.png");


createScenery.tilesheet = utility.loadImage("../img/Tiles/tilesheet.png");
gameplay.mainCamp.sprite = utility.loadImage("../img/Tiles/missions.png");
gameplay.player.sprite = utility.loadImage("../img/Player/characterMale.png");
gameplay.observationInstance.sprite = utility.loadImage("../img/Tokens/exclamationPoint.png");
gameplay.blueCoin.sprite = utility.loadImage("../img/Tokens/waterToken.png");
gameplay.grayCoin.sprite = utility.loadImage("../img/Tokens/rockToken.png");
gameplay.goldCoin.sprite = utility.loadImage("../img/Tokens/speedToken.png");
gameplay.teleporter.sprite = utility.loadImage("../img/Tiles/teleporterFinal.png");
gameplay.training.sprite = utility.loadImage("../img/Tiles/training.png");
gameplay.store.sprite = utility.loadImage("../img/Tiles/shop.png");
gameplay.plants.sprite = utility.loadImage("../img/Tiles/plants.png");
gameplay.parsnip.sprite = utility.loadImage("../img/Player/drparsnip.png");
gameplay.unicorn.sprite = utility.loadImage("../img/Player/unicorn.png");
gameplay.botnip.sprite = utility.loadImage("../img/Player/botnip.png");
gameplay.englishman.sprite = utility.loadImage("../img/Player/britishWanderer.png");
cameraController.tilesheetMain = utility.loadImage("../img/Tiles/tilesheet.png");
cameraController.tilesheetForest = utility.loadImage("../img/Tiles/tilesheetForest.png");
cameraController.tilesheetMarsh = utility.loadImage("../img/Tiles/tilesheetMarsh.png");
cameraController.tilesheetHilly = utility.loadImage("../img/Tiles/tilesheetRocky.png");
worldEvent.coin.sprite = utility.loadImage("../img/Tokens/speedToken.png");
mainCamp.dingle.sprite = utility.loadImage("../img/Player/siblingMale.png");


var songMainTitle = utility.loadSong("../sounds/main menu/Radio Martini.mp3");
var songGameplayPrairie = utility.loadSong("../sounds/gameplay/Call to Adventure.mp3");
var songGameplayForest = utility.loadSong("../sounds/gameplay/Pamgaea.mp3");
var songGameplayMarsh = utility.loadSong("../sounds/gameplay/Sneaky Snitch.mp3");
var songGameplayHilly = utility.loadSong("../sounds/gameplay/Minstrel Guild.mp3");
var songGameplayCamp = utility.loadSong("../sounds/gameplay/The Builder.mp3");
var songWorldEvent = utility.loadSong("../sounds/world event/8bit Dungeon Boss.mp3");
var songEndScene = utility.loadSong("../sounds/end scene/Black Vortex.mp3");
var songMatching = utility.loadSong("../sounds/matching/Evil Plan FX.mp3");

var loadingStatus = ["Initializing previsualization matrix", "Analyzing reversal algorithms", "Packaging gui worms", "Constructing dynamic shaders", "Reversing polarity", "I can't allow you to do that, Dave", "Encrypting llamas", "Fixing code, and taking names, but I'm all out of names", "Debugging sassy goats"];
