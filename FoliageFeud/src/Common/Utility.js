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
	colors: [],
	totalNumImages: 0,
	curNumImages: 0,
	writting:false,
	
	
	// Clear screen and all objects from clickable
	clearAll: function()
	{
		this.clearClickHandler();
		
		backgroundSurface.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
		gameplaySurface.clearRect(0, 0, gameplayCanvas.width, gameplayCanvas.height);
		menuSurface.clearRect(0, 0, menuCanvas.width, menuCanvas.height);
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
		menuSurface.rect(x, y, width, height);
		menuSurface.stroke();
		*/
		
		this.clickable.push(item);
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
			// If image was clicked, runs specified function
			if (posx >= utility.clickable[i].x && posx <= utility.clickable[i].x + utility.clickable[i].width &&
				posy >= utility.clickable[i].y && posy <= utility.clickable[i].y + utility.clickable[i].height)
			{
				utility.clickable[i].func(utility.clickable[i].param);
			}
		}
	},
	
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
		
		menuSurface.rect(76, 206, 1000, 100);
		menuSurface.stroke();
		
		menuSurface.fillStyle = "#006600";
		menuSurface.fillRect(76, 206, 1000 * (utility.curNumImages / utility.totalNumImages), 100);
		
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
		context.fillStyle = "white";
		context.font = fontSize + "px Evilgreen";
		
		context.lineWidth = 1;
		context.strokeStyle = "black";
		
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
				}
				else
				{
					line = testLine;
				}
			}
			
			context.fillText(line, x, y);
			
			if (isOutlined)
				context.strokeText(line, x, y);
			
			y += fontSize * 2;
		}
	},
	
	// Write text to screen, wrapping if hits max width, and adding a click handler
	// clickHandler[0] is function
	// clickHandler[1] is array of parameters
	writeForClick: function(context, text, x, y, maxWidth, fontSize, isOutlined, clickHandler)
	{
		context.fillStyle = "white";
		context.font = fontSize + "px Evilgreen";
		
		context.lineWidth = 1;
		context.strokeStyle = "black";
		
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
					
					height += fontSize;
				}
				else
				{
					line = testLine;
				}
			}
			
			context.fillText(line, x, y);
			
			if (isOutlined)
				context.strokeText(line, x, y);
			
			height += fontSize;
			
			utility.addClickItem(x, y - height, testWidth, height, clickHandler[0], clickHandler[1]);
			
			y += fontSize * 2;
		}
	},
	
	contains: function(array, element)
	{
		for (var i = 0; i < array.length; i++)
		{
			if (array[i] === element){
				console.debug("found dupe");
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

var imgCommonBg = utility.loadImage("../img/Backgrounds/commonBackground.png");
var imgMenuBg = utility.loadImage("../img/Backgrounds/menuscreen.png");
var imgISpyBg = utility.loadImage("../img/Backgrounds/iSpyScreen.png");
var imgISpyOverlay = utility.loadImage("../img/Backgrounds/iSpyOverlay.png");
var imgInfoSmallOverlay = [];
imgInfoSmallOverlay.push(utility.loadImage("../img/Backgrounds/infoOverlay00.png"));
imgInfoSmallOverlay.push(utility.loadImage("../img/Backgrounds/infoOverlay01.png"));
imgInfoSmallOverlay.push(utility.loadImage("../img/Backgrounds/infoOverlay02.png"));
var imgInfoOverlay = utility.loadImage("../img/Backgrounds/informationOverlay.png");
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


createScenery.tilesheet = utility.loadImage("../img/Tiles/tilesheet.png");

worldEvent.wall.sprite = utility.loadImage("../img/WorldEvent/WALL.png");

gameplay.player.sprite = utility.loadImage("../img/Player/characterMale.png");
gameplay.observationInstance.sprite = utility.loadImage("../img/Tokens/exclamationPoint.png");
gameplay.blueCoin.sprite = utility.loadImage("../img/Tokens/waterToken.png");
gameplay.grayCoin.sprite = utility.loadImage("../img/Tokens/rockToken.png");
gameplay.speedCoin.sprite = utility.loadImage("../img/Tokens/speedToken.png");
gameplay.teleporter.sprite = utility.loadImage("../img/Tiles/telelporter.png");
gameplay.training.sprite = utility.loadImage("../img/Tiles/training.png");
gameplay.store.sprite = utility.loadImage("../img/Tiles/shop.png");
gameplay.mainCamp.sprite = utility.loadImage("../img/Tiles/mainCamp.png");
baseCamp.shop();
shop.drawShop();
