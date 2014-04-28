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
var moreInfoDisplayed = false;
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
			
			if (i % (imgsPerRow * 3) === 0 || i % (imgsPerRow * 3) === 3)
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
		
		var arrowX = 640;
		var arrowY = 456;
		var rightOffset = 96;
		
		if (info.page > 0)
		{
			utility.drawImage
			(
				backgroundSurface, imgLeftDrawnArrow,
				0, 0, imgLeftDrawnArrow.width, imgLeftDrawnArrow.height,
				arrowX, arrowY, 64, 32
			);
			
			utility.addClickItem(arrowX, arrowY, 64, 32, this.prevPage, '');
		}
		
		if (info.page < (plantList.length / info.plantsPerPage) - 1)
		{
			utility.drawImage
			(
				backgroundSurface, imgRightDrawnArrow,
				0, 0, imgRightDrawnArrow.width, imgRightDrawnArrow.height,
				arrowX + rightOffset, arrowY, 64, 32
			);
			
			utility.addClickItem(arrowX + rightOffset, arrowY, 64, 32, this.nextPage, '');
		}
		
		utility.writeForClick(backgroundSurface, ["Exit"], arrowX + (rightOffset * 4), arrowY + 26, 60, 20, false, [this.exitInfo, ['']]);
		
		gameplaySurface.clearRect(0, 0, gameplayCanvas.width, gameplayCanvas.height);
		var strings = [];
		
		if (plantDisplayed)
		{
			if (curPlant != -1)
			{
				strings.push("Name: " + plantList[curPlant].name);
				strings.push("Latin Name: " + plantList[curPlant].lname);
				
				if (plantList[curPlant].invasive)
					strings.push("Invasive species");
				
				utility.addClickItem(64, 40, 32, 32, this.moreInfo, '');
				
				utility.drawImage
				(
					backgroundSurface, imgInfoButton,
					0, 0, imgInfoButton.width, imgInfoButton.height,
					64, 40, 32, 32
				);
				
				if (moreInfoDisplayed)
				{
					utility.clearClickHandler();
					
					utility.drawImage
					(
						gameplaySurface, imgQuestLog,
						0, 0, imgQuestLog.width, imgQuestLog.height,
						500, 0, imgQuestLog.width, imgQuestLog.height
					);
					
					var traits = [];
					
					for (var i = 0; i < plantList[curPlant].traits.length; i++)
					{
						traits.push(plantList[curPlant].traits[i]);
					}
					
					utility.writeText(gameplaySurface, [plantList[curPlant].name], 575, 55, 275, 25, false);
					utility.writeText(gameplaySurface, traits, 575, 110, 360, 20, false);
					
					utility.writeForClick(gameplaySurface, ["Exit"], 875, 55, 50, 20, false, [this.lessInfo, ['']]);
				}
			}
			else
			{
				strings.push("This plant has not been found yet.");
				strings.push("To find this plant, explore more regions.");
			}
		}
		else
		{
			strings.push("Click on an image to view information about that plant.");
			
			var plantCount = 0;
			
			for (var i = 0; i < plantList.length; i++)
			{
				if (plantList[i].harvested)
					plantCount++;
			}
			
			strings.push("You have discovered " + plantCount + " plant");
			
			if (plantCount != 1)
				strings[1] += "s.";
				
			strings[1] += "  Complete more quests to find them all!";
		}
		
		utility.writeText(gameplaySurface, strings, 96, 64, 64 * 4, 25, false);
	},
	
	exitInfo: function()
	{
		exiting[currentScreen] = true;
	},
	
	// Display plant info if harvested
	displayPlantInfo: function(i)
	{
		curPlant = i;
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
		moreInfoDisplayed = false;
		imagePosY = -256;
	},
	
	moreInfo: function()
	{
		moreInfoDisplayed = true;
	},
	
	lessInfo: function()
	{
		moreInfoDisplayed = false;
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