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
	scale: 1,
	originalWidth: 1152,
	originalHeight: 512,
	debugSound: false,
	demo: false,
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
			
			
			// If image was clicked, runs specified function
			if (posx >= x && posx <= x + w &&
				posy >= y && posy <= y + h )
			{
				utility.clickable[i].func(utility.clickable[i].param);
			}
		}
	},
		/*handleMouseOver: function(event)
	{
		// Gets position of click
		var rect = gameplayCanvas.getBoundingClientRect();
		var posx = event.clientX;
		var posy = event.clientY;
		// Checks each object to see if it was clicked
		for (var i = 0; i < utility.mouseOver.length; i++)
		{
			if (posx >= utility.clickable[i].x && posx <= utility.clickable[i].x + utility.clickable[i].width &&
				posy >= utility.clickable[i].y && posy <= utility.clickable[i].y + utility.clickable[i].height)
			{
				console.debug("this is working I guess");
				utility.mouseOver[i].func(utility.mouseOver[i].param);
			}
				
				
			
		}
	},
	*/
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
			
			if (utility.curNumAssets === utility.totalNumAssets)
				mainUpdate();
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
	writeText: function(context, text, x, y, maxWidth, fontSize, isOutlined)
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
					
					if (isOutlined)
						context.strokeText(line, x, y);
						
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
			
			if (isOutlined)
				context.strokeText(line, x, y);
			
			y += fontSize * 2;
		}
		
		return [width, height];
	},
	
	// Write text to screen, wrapping if hits max width, and adding a click handler
	// clickHandler[0] is function
	// clickHandler[1] is array of parameters
	writeForClick: function(context, text, x, y, maxWidth, fontSize, isOutlined, clickHandler)
	{
		var size = utility.writeText(context, text, x, y, maxWidth, fontSize, isOutlined);
		utility.addClickItem(x - 5, y - fontSize, size[0] + 10, size[1] + 5, clickHandler[0], clickHandler[1]);
		
		
		context.fillStyle = "black";
		context.rect(x - 5, y - fontSize, size[0] + 10, size[1] + 5);
		context.stroke();
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
				else if (oldArray[i].name == "teleporter")
				{
					yVal += 64;
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
	}
};

window.addEventListener("click", utility.handleClick, false);
window.addEventListener("resize", utility.handleScale, false);
//window.addEventListener("mouseover",utility.handleMouseOver,false);


if (!utility.demo) // Here's where to load the assets not needed in the demo.
{
}

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
var imgParsnipSprite = utility.loadImage("../img/Player/drparsnip.png");
var imgDingleSprite = utility.loadImage("../img/Player/siblingMale.png");
var imgUnicornSprite = utility.loadImage("../img/Player/unicorn.png");
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
var imgShopSibling = utility.loadImage("../img/Player/siblingShop.png");
var imgItemInfo = utility.loadImage("../img/Backgrounds/iteminfo.png");
var imgPurchaseButton=utility.loadImage("../img/Buttons/exitButton.png");
var imgCompassBackground = utility.loadImage("../img/Backgrounds/compass.png");
var imgCompassArrow = utility.loadImage("../img/Backgrounds/compassarrow.png");
var imgLargeTextBox = utility.loadImage("../img/Backgrounds/textboxbig.png");
var imgSmallTextBox = utility.loadImage("../img/Backgrounds/textboxsmall.png");
var imgTrainingBackground = utility.loadImage("../img/Backgrounds/trainingicon.png");
var imgGoldCoin= utility.loadImage("../img/Tokens/speedToken.png");

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
cameraController.tilesheetMain = utility.loadImage("../img/Tiles/tilesheet.png");
cameraController.tilesheetForest = utility.loadImage("../img/Tiles/tilesheetForest.png");
cameraController.tilesheetMarsh = utility.loadImage("../img/Tiles/tilesheetMarsh.png");
cameraController.tilesheetHilly = utility.loadImage("../img/Tiles/tilesheetRocky.png");
worldEvent.coin.sprite = utility.loadImage("../img/Tokens/speedToken.png");
mainCamp.dingle.sprite = utility.loadImage("../img/Player/siblingMale.png");


var songMainTitle = utility.loadSong("../sounds/main menu/Who Likes to Party.mp3");
var songGameplayPrairie = utility.loadSong("../sounds/gameplay/Call to Adventure.mp3");
var songGameplayForest = utility.loadSong("../sounds/gameplay/Pamgaea.mp3");
var songGameplayMarsh = utility.loadSong("../sounds/gameplay/Sneaky Snitch.mp3");
var songGameplayHilly = utility.loadSong("../sounds/gameplay/Minstrel Guild.mp3");
var songGameplayCamp = utility.loadSong("../sounds/gameplay/The Builder.mp3");
var songWorldEvent = utility.loadSong("../sounds/world event/8bit Dungeon Boss.mp3");
var loadingStatus = ["Initializing previsualization matrix", "Analyzing reversal algorithms", "Packaging gui worms", "Constructing dynamic shaders", "Reversing polarity", "I can't allow you to do that, Dave", "Encrypting llamas", "Fixing code, and taking names, but I'm all out of names", "Debugging sassy goats"];
