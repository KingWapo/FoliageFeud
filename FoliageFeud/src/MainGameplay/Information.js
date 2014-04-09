// Created by Batman

// Information Screen

var notFound = new Image();
notFound.src = "../img/Buttons/QuestionMark.png";

var prevPageButton = new Image();
prevPageButton.src = "../img/Buttons/arrowLeft.png";

var nextPageButton = new Image();
nextPageButton.src = "../img/Buttons/arrowRight.png";

var curPlant = -1;
var curImage = 0;
var plantShown = false;
var imagePosX = -256;
var delay = 0;

var info = {
	// Variables
	tileSize: 128,
	debugInfo: false,
	page: 0,
	plantsPerPage: 18,

	// Initialize info wall
	init: function()
	{
		utility.clearAll();
		curPlant = -1;
		
		// Blue gradient bg
		var grd = backgroundSurface.createLinearGradient(0, 0, 0, 512);
		grd.addColorStop(0, "darkblue");
		grd.addColorStop(1, "blue");
		
		backgroundSurface.fillStyle = grd;
		backgroundSurface.fillRect(0, 0, 1152, 512);
		
		// Grey side panel
		var grd2 = backgroundSurface.createLinearGradient(0, 0, 0, 512);
		grd2.addColorStop(0, "darkgrey");
		grd2.addColorStop(1, "black");
		
		backgroundSurface.fillStyle = grd2;
		backgroundSurface.fillRect(0, 0, 64 * 4, 512);
		
		var imgsPerRow = 6;
		var gapBetween = (1152 - (64 * 4) - (this.tileSize * imgsPerRow)) / (imgsPerRow + 1);
		
		// Display appropriate sprite for each plant
		for (var i = this.plantsPerPage * this.page; i < Math.min(this.plantsPerPage * (this.page + 1), plantList.length); i++)
		{
			var sprite = new Image();
			var x = ((this.tileSize + gapBetween) * (i % imgsPerRow)) + (this.tileSize * 2) + gapBetween;
			var y = ((this.tileSize + gapBetween) * Math.floor((i % this.plantsPerPage) / imgsPerRow)) + gapBetween;
			
			if (plantList[i].harvested || this.debugInfo)
			{
				sprite = plantList[i].sprite[0];
				utility.addClickItem(x, y, this.tileSize, this.tileSize, this.displayPlantInfo, [i]);
			}
			else
			{
				sprite = notFound;
				utility.addClickItem(x, y, this.tileSize, this.tileSize, this.displayPlantNotFound, [i]);
			}

			gameplaySurface.drawImage
			(
				sprite,
				0, 0, sprite.width, sprite.height, x, y,
				this.tileSize, this.tileSize
			);
		}
		
		var xOffset = 32;
		var yOffset = 48;
		
		utility.addClickItem(256 + xOffset, 512 - yOffset, 64, 32, this.prevPage, '');
		utility.addClickItem(1152 - xOffset * 3, 512 - yOffset, 64, 32, this.nextPage, '');
		
		gameplaySurface.drawImage
		(
			prevPageButton,
			0, 0, prevPageButton.width, prevPageButton.height,
			256 + xOffset, 512 - yOffset, 64, 32
		);
		
		gameplaySurface.drawImage
		(
			nextPageButton,
			0, 0, nextPageButton.width, nextPageButton.height,
			1152 - xOffset * 3, 512 - yOffset, 64, 32
		);
	},

	// Display plant info if harvested
	displayPlantInfo: function(i)
	{
		menuSurface.clearRect(0, 0, menuCanvas.width, menuCanvas.height);
		var strings = [];
		
		strings.push("Name: " + plantList[i].name);
		strings.push("Latin Name: " + plantList[i].lname);
		
		if (plantList[i].invasive)
			strings.push("Invasive species");

		utility.writeText(menuSurface, strings, 10, 50, 64 * 4 - 10, 25, true);
		
		curPlant = i;
		plantShown = true;
	},

	// Display unharvested text
	displayPlantNotFound: function(i)
	{
		var strings = [];
		
		strings.push("This plant has not been found yet.");
		strings.push("To find this plant, explore more regions.");
					 
		utility.writeText(menuSurface, strings, 10, 50, 64 * 4, 25, true);
		
		curPlant = -1;
		curImage = 0;
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
		if (curPlant >= 0)
		{
			if (delay % 60 === 0)
			{
				curImage = (curImage + 1) % plantList[curPlant].sprite.length;
				imagePosX = -256;
			}
			
			delay = (delay + 1) % 60;
		
			menuSurface.drawImage
			(
				plantList[curPlant].sprite[curImage], 0, 0,
				plantList[curPlant].sprite[curImage].width, plantList[curPlant].sprite[curImage].height,
				imagePosX, 256, 256, 256
			);
			
			if (imagePosX < 0)
				imagePosX += 16;
		}
	}
};