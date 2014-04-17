// Created by Batman

// Information Screen

/*
var notFound = new Image();
notFound.src = "../img/Buttons/QuestionMark.png";

var prevPageButton = new Image();
prevPageButton.src = "../img/Buttons/arrowLeft.png";

var nextPageButton = new Image();
nextPageButton.src = "../img/Buttons/arrowRight.png";
*/

var curPlant = -1;
var curImage = 0;
var plantShown = false;
var imagePosX = 96;
var imagePosY = 528;
var delay = 0;
var curPolaroid = 0;
var polaroidOffset = 15;

var info = {
	// Variables
	tileSize: 105,
	curImgSize: 168,
	debugInfo: false,
	page: 0,
	plantsPerPage: 18,

	// Initialize info wall
	init: function()
	{
		utility.clearAll();
		curPlant = -1;
		
		backgroundSurface.drawImage(
			imgISpyBg,
			0, 0
		);
		
		var imgsPerRow = 6;
		var gapBetween = 32;//(1152 - (64 * 4) - (this.tileSize * imgsPerRow)) / (imgsPerRow + 1);
		
		// Display appropriate sprite for each plant
		for (var i = this.plantsPerPage * this.page; i < Math.min(this.plantsPerPage * (this.page + 1), plantList.length); i++)
		{
			var sprite = new Image();
			var x = ((this.tileSize + gapBetween - 12) * (i % imgsPerRow)) + (this.tileSize * 2) + gapBetween + 112;
			var y = ((this.tileSize + gapBetween + 4) * Math.floor((i % this.plantsPerPage) / imgsPerRow)) + gapBetween + 10;
			
			if (i === 0 || i === 3)
				x += 3;
				
			if (plantList[i].harvested || this.debugInfo)
			{
				sprite = plantList[i].sprite[0];
				utility.addClickItem(x, y, this.tileSize, this.tileSize, this.displayPlantInfo, [i]);
			}
			else
			{
				sprite = imgQuestionMark;
				utility.addClickItem(x, y, this.tileSize, this.tileSize, this.displayPlantNotFound, [i]);
			}

			backgroundSurface.drawImage
			(
				sprite,
				0, 0, sprite.width, sprite.height, x, y,
				this.tileSize, this.tileSize
			);
		}
		
		backgroundSurface.drawImage(
			imgInfoOverlay,
			0, 0
		);
		
		var xOffset = 48;
		var yOffset = 48;
		
		utility.addClickItem(324 + xOffset, 512 - yOffset, 64, 32, this.prevPage, '');
		utility.addClickItem(1152 - xOffset * 3, 512 - yOffset, 64, 32, this.nextPage, '');
		
		backgroundSurface.drawImage
		(
			imgLeftArrow,
			0, 0, imgLeftArrow.width, imgLeftArrow.height,
			324 + xOffset, 512 - yOffset, 64, 32
		);
		
		backgroundSurface.drawImage
		(
			imgRightArrow,
			0, 0, imgRightArrow.width, imgRightArrow.height,
			1152 - xOffset * 3, 512 - yOffset, 64, 32
		);
	},
	
	// Display plant info if harvested
	displayPlantInfo: function(i)
	{
		gameplaySurface.clearRect(0, 0, gameplayCanvas.width, gameplayCanvas.height);
		var strings = [];
		
		strings.push("Name: " + plantList[i].name);
		strings.push("Latin Name: " + plantList[i].lname);
		
		if (plantList[i].invasive)
			strings.push("Invasive species");

		utility.writeText(gameplaySurface, strings, 96, 64, 64 * 4, 25, true);
		
		curPlant = i;
		curImage = 0;
		plantShown = true;
	},

	// Display unharvested text
	displayPlantNotFound: function(i)
	{
		gameplaySurface.clearRect(0, 0, gameplayCanvas.width, gameplayCanvas.height);
		var strings = [];
		
		strings.push("This plant has not been found yet.");
		strings.push("To find this plant, explore more regions.");
					 
		utility.writeText(gameplaySurface, strings, 10, 50, 64 * 4, 25, true);
		
		curPlant = -1;
		plantShown = false;
		imagePosX = -256;
	},
	
	nextPage: function(i)
	{
		if (info.page < (plantList.length / info.plantsPerPage) - 1)
		{
			info.page += 1;
			info.init();
		}
		else
			console.debug("Already on last page");
	},
	
	prevPage: function(i)
	{
		if (info.page > 0)
		{
			info.page -= 1;
			info.init();
		}
		else
			console.debug("Already on first page");
	},
	
	update: function()
	{
		menuSurface.clearRect(0, 0, 1152, 512);
		
		if (plantShown)
		{
			if (delay % 60 === 0)
			{
				gameplaySurface.drawImage
				(
					plantList[curPlant].sprite[curImage], 0, 0,
					plantList[curPlant].sprite[curImage].width, plantList[curPlant].sprite[curImage].height,
					imagePosX, imagePosY, this.curImgSize, this.curImgSize
				);
			
				gameplaySurface.drawImage
				(
					imgInfoSmallOverlay[curPolaroid], 0, 0,
					imgInfoSmallOverlay[curPolaroid].width, imgInfoSmallOverlay[curPolaroid].height,
					imagePosX - polaroidOffset, imagePosY - polaroidOffset,
					imgInfoSmallOverlay[curPolaroid].width, imgInfoSmallOverlay[curPolaroid].height
				);
				
				curPolaroid = Math.floor(Math.random() * imgInfoSmallOverlay.length);
				
				curImage = (curImage + 1) % plantList[curPlant].sprite.length;
				imagePosY = 512;
				
			}
			
			delay = (delay + 1) % 60;
		
			menuSurface.drawImage
			(
				plantList[curPlant].sprite[curImage], 0, 0,
				plantList[curPlant].sprite[curImage].width, plantList[curPlant].sprite[curImage].height,
				imagePosX, imagePosY, this.curImgSize, this.curImgSize
			);
			
			menuSurface.drawImage
			(
				imgInfoSmallOverlay[curPolaroid], 0, 0,
				imgInfoSmallOverlay[curPolaroid].width, imgInfoSmallOverlay[curPolaroid].height,
				imagePosX - polaroidOffset, imagePosY - polaroidOffset,
				imgInfoSmallOverlay[curPolaroid].width, imgInfoSmallOverlay[curPolaroid].height
			);
			
			if (imagePosY > 256)
				imagePosY -= 16;
		}
	}
};