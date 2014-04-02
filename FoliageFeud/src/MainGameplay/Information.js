// Created by Batman

// Information Screen

var notFound = new Image();
notFound.src = "../img/Buttons/QuestionMark.png";

var info = {
	// Variables
	tileSize: 128,
	debugInfo: false,

	// Initialize info wall
	init: function()
	{
		utility.clearAll();
		
		// Blue gradient bg
		var grd = backgroundSurface.createLinearGradient(0, 0, 0, 512);
		grd.addColorStop(0, "darkblue");
		grd.addColorStop(1, "blue");
		
		backgroundSurface.fillStyle = grd;
		backgroundSurface.fillRect(0, 0, 1152, 512);
		
		// Grey side panel
		var grd2 = gameplaySurface.createLinearGradient(0, 0, 0, 512);
		grd2.addColorStop(0, "darkgrey");
		grd2.addColorStop(1, "black");
		
		gameplaySurface.fillStyle = grd2;
		gameplaySurface.fillRect(0, 0, 64 * 4, 512);
		
		var imgsPerRow = 6;
		var gapBetween = (1152 - (64 * 4) - (this.tileSize * imgsPerRow)) / (imgsPerRow + 1);
		
		// Display appropriate sprite for each plant
		for (var i = 0; i < plantList.length; i++)
		{
			var sprite = new Image();
			var x = ((this.tileSize + gapBetween) * (i % imgsPerRow)) + (this.tileSize * 2) + gapBetween;
			var y = ((this.tileSize + gapBetween) * Math.floor(i / imgsPerRow)) + gapBetween;
			
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
	},

	// Display plant info if harvested
	displayPlantInfo: function(i)
	{
		var strings = [];
		
		strings.push("Name: ".concat(plantList[i].name));

		utility.writeText(menuSurface, strings, 10, 50, 64 * 4, 20);
		
		var r = Math.floor(Math.random() * plantList[i].sprite.length);
		menuSurface.drawImage
		(
			plantList[i].sprite[r], 0, 0,
			plantList[i].sprite[r].width, plantList[i].sprite[r].height,
			0, 256, 256, 256
		); // SET TO PICK RANDOM
	},

	// Display unharvested text
	displayPlantNotFound: function(i)
	{
		var strings = [];
		
		strings.push("This plant has not been found yet.");
		strings.push("To find this plant, explore more regions.");
					 
		utility.writeText(menuSurface, strings, 10, 50, 64 * 4, 20);
		
		this.curPlant = -1;
	}
};