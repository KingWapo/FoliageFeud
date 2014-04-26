// Created by Batman

CANVAS_WIDTH = 1152;
CANVAS_HEIGHT = 512;

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
	totalNumImages: 0,
	curNumImages: 0,
	writting:false,
	scale: 1,
	originalWidth: 1152,
	originalHeight: 512,
	
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
		utility.totalNumImages += 1;
		
		var tempImage = new Image();
		tempImage.src = source;
		
		tempImage.addEventListener("load", utility.loadedImage, false);
		
		return tempImage;
	},
	
	loadedImage: function()
	{
		utility.curNumImages += 1;
		
		//console.debug('total: ', utility.totalNumImages, ' - loaded: ', utility.curNumImages);
		var x = 76 * utility.scale;
		var y = 206 * utility.scale;
		var w = 1000 * utility.scale;
		var h = 100 * utility.scale;
		
		menuSurface.rect(x, y, w, h);
		menuSurface.stroke();
		
		menuSurface.fillStyle = "#006600";
		menuSurface.fillRect(x, y, w * (utility.curNumImages / utility.totalNumImages), h);
		
		if (utility.curNumImages === utility.totalNumImages)
			mainUpdate();
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
		
		//if (!isOutlined)
			context.fillStyle = "black";
		//else
			//context.fillStyle = "white";
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
					
					//if (isOutlined)
						//context.strokeText(line, x, y);
						
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
			
			//if (isOutlined)
				//context.strokeText(line, x, y);
			
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
		utility.addClickItem(x, y - fontSize, size[0], size[1], clickHandler[0], clickHandler[1]);
		
		/*
		context.fillStyle = "black";
		context.rect(x, y - fontSize, size[0], size[1]);
		context.stroke();
		*/
	},
	
	contains: function(array, element)
	{
		for (var i = 0; i < array.length; i++)
		{
			if (array[i] === element){
				return true;
			}
		}
		
		return false;
	},
	
	clamp: function(val, minVal, maxVal)
	{
		return Math.max(minVal, Math.min(val, maxVal));
	},
	
	collisionDetection: function(chaseTheCollider, brandonTheCollidee)
	{
		if ( chaseTheCollider.x > brandonTheCollidee.x + brandonTheCollidee.width ||
			 chaseTheCollider.x + chaseTheCollider.width < brandonTheCollidee.x ||
			 chaseTheCollider.y > brandonTheCollidee.y + brandonTheCollidee.height ||
			 chaseTheCollider.y + chaseTheCollider.height < brandonTheCollidee.y) {
			return false;
		}
		else {
			return true;
		}
	}
};

window.addEventListener("click", utility.handleClick, false);
window.addEventListener("resize", utility.handleScale, false);
//window.addEventListener("mouseover",utility.handleMouseOver,false);

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
var imgMap1 = utility.loadImage("../img/Buttons/MapButton.png");
var imgMapBackground = utility.loadImage("../img/Backgrounds/mapSelectionBackground.png");
var imgMapTilesheet = utility.loadImage("../img/Tiles/MapTilesheet.png");
var imgGirlButton = utility.loadImage("../img/Buttons/playButtonGirl.png");
var imgBoyButton = utility.loadImage("../img/Buttons/playButtonBoy.png");
var imgExitButton = utility.loadImage("../img/Buttons/exitButton.png");
var imgLeftArrow = utility.loadImage("../img/Buttons/arrowLeft.png");
var imgRightArrow = utility.loadImage("../img/Buttons/arrowRight.png");
var imgQuestionMark = utility.loadImage("../img/Buttons/QuestionMark.png");
var imgMaleSprite = utility.loadImage("../img/Player/characterMale.png");
var imgFemaleSprite = utility.loadImage("../img/Player/characterFemale.png");
var imgTimer = utility.loadImage("../img/WorldEvent/timer.png");
var imgTimerBg = utility.loadImage("../img/WorldEvent/timerBackground.png");
var imgCheckmark = utility.loadImage("../img/WorldEvent/checkmark.png");
var imgShopBg = utility.loadImage(" ../img/Backgrounds/shopscreen.png");
var imgAdventure =utility.loadImage("../img/Hats/explorer.png");
var imgSold = utility.loadImage("../img/Tokens/purchased.png");
var imgWater= utility.loadImage("../img/Tokens/purchased.png");
var imgRock= utility.loadImage("../img/Tokens/rockCoin.png");
var imgChest=utility.loadImage("../img/moneyicon.png");
var imgWater=utility.loadImage("../img/Tokens/waterCoin.png");
var imgNip=utility.loadImage("../img/Tokens/drparsniptoken.png");





createScenery.tilesheet = utility.loadImage("../img/Tiles/tilesheet.png");

worldEvent.wall.sprite = utility.loadImage("../img/WorldEvent/WALL.png");
gameplay.mainCamp.sprite = utility.loadImage("../img/Tiles/mainCamp.png");
gameplay.player.sprite = utility.loadImage("../img/Player/characterMale.png");
gameplay.observationInstance.sprite = utility.loadImage("../img/Tokens/exclamationPoint.png");
gameplay.blueCoin.sprite = utility.loadImage("../img/Tokens/waterToken.png");
gameplay.grayCoin.sprite = utility.loadImage("../img/Tokens/rockToken.png");
gameplay.speedCoin.sprite = utility.loadImage("../img/Tokens/speedToken.png");
gameplay.teleporter.sprite = utility.loadImage("../img/Tiles/teleporterfinal.png");
gameplay.training.sprite = utility.loadImage("../img/Tiles/training.png");
gameplay.store.sprite = utility.loadImage("../img/Tiles/shop.png");


