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
var plantDisplayed = false;
var curImage = 0;
var movingUp = true;
var imagePosX = 96;
var imagePosY = 528;
var delay = 0;
var period = 30;
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
	},
	
	render: function()
	{
		utility.clearAll();
		
		utility.drawImage(
			backgroundSurface, imgISpyBg,
			0, 0, imgISpyBg.width, imgISpyBg.height,
			0, 0, imgISpyBg.width, imgISpyBg.height
		);
		
		var imgsPerRow = 6;
		var gapBetween = 32;
		
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

			utility.drawImage
			(
				backgroundSurface, sprite,
				0, 0, sprite.width, sprite.height, x, y,
				this.tileSize, this.tileSize
			);
		}
		
		utility.drawImage(
			backgroundSurface, imgInfoOverlay,
			0, 0, imgInfoOverlay.width, imgInfoOverlay.height,
			0, 0, imgInfoOverlay.width, imgInfoOverlay.height
		);
		
		var xOffset = 48;
		var yOffset = 48;
		
		utility.addClickItem(324 + xOffset, 512 - yOffset, 64, 32, this.prevPage, '');
		utility.addClickItem(1152 - xOffset * 3, 512 - yOffset, 64, 32, this.nextPage, '');
		
		utility.drawImage
		(
			backgroundSurface, imgLeftArrow,
			0, 0, imgLeftArrow.width, imgLeftArrow.height,
			324 + xOffset, 512 - yOffset, 64, 32
		);
		
		utility.drawImage
		(
			backgroundSurface, imgRightArrow,
			0, 0, imgRightArrow.width, imgRightArrow.height,
			1152 - xOffset * 3, 512 - yOffset, 64, 32
		);
		
		if (plantDisplayed)
		{
			if (curPlant != -1)
			{
				gameplaySurface.clearRect(0, 0, gameplayCanvas.width, gameplayCanvas.height);
				var strings = [];
				
				strings.push("Name: " + plantList[curPlant].name);
				strings.push("Latin Name: " + plantList[curPlant].lname);
				
				if (plantList[curPlant].invasive)
					strings.push("Invasive species");

				utility.writeText(gameplaySurface, strings, 96, 64, 64 * 4, 25, false);
			}
			else
			{
				gameplaySurface.clearRect(0, 0, gameplayCanvas.width, gameplayCanvas.height);
				var strings = [];
				
				strings.push("This plant has not been found yet.");
				strings.push("To find this plant, explore more regions.");
							 
				utility.writeText(gameplaySurface, strings, 96, 64, 64 * 4, 25, false);
			}
		}
	},
	
	// Display plant info if harvested
	displayPlantInfo: function(i)
	{
		curPlant = i;
		console.debug(plantList[i].name);
		plantDisplayed = true;
		curImage = 0;
		delay = 0;
		imagePosY = -256;
	},

	// Display unharvested text
	displayPlantNotFound: function(i)
	{
		curPlant = -1;
		plantDisplayed = true;
		imagePosY = -256;
	},
	
	nextPage: function(i)
	{
		if (info.page < (plantList.length / info.plantsPerPage) - 1)
		{
			info.page += 1;
			info.init();
			plantDisplayed = false;
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
			plantDisplayed = false;
		}
		else
			console.debug("Already on first page");
	},
	
	update: function()
	{
		menuSurface.clearRect(0, 0, 1152, 512);
		
		if (curPlant >= 0)
		{
			if (delay % period === 0)
			{
				/*gameplaySurface.drawImage
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
				);*/
				if (delay < period || delay === period * 3)
					movingUp = true;
				else if (delay >= period * 2)
					movingUp = false;
				
				if (delay === 0)
				{
					curPolaroid = Math.floor(Math.random() * imgInfoSmallOverlay.length);
				
					curImage = (curImage + 1) % plantList[curPlant].sprite.length;
					imagePosY = 512;
				}
			}
			
			delay = (delay + 1) % (period * 3);
		
			utility.drawImage
			(
				menuSurface, plantList[curPlant].sprite[curImage], 0, 0,
				plantList[curPlant].sprite[curImage].width, plantList[curPlant].sprite[curImage].height,
				imagePosX, imagePosY, this.curImgSize, this.curImgSize
			);
			
			utility.drawImage
			(
				menuSurface, imgInfoSmallOverlay[curPolaroid], 0, 0,
				imgInfoSmallOverlay[curPolaroid].width, imgInfoSmallOverlay[curPolaroid].height,
				imagePosX - polaroidOffset, imagePosY - polaroidOffset,
				imgInfoSmallOverlay[curPolaroid].width, imgInfoSmallOverlay[curPolaroid].height
			);
			
			if (imagePosY > 256 && movingUp)
				imagePosY -= (256 + 32) / period;
			else if (!movingUp)
				imagePosY += (256 + 32) / period;
		}
	}
};