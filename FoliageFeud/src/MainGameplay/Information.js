// Created by Batman

// Information Screen

var notFound = new Image();
notFound.src = "../../img/Buttons/QuestionMark.png";

var info = {
	// Variables
	tileSize: 128,
	curPlant: '',
	curImg: 0,

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
		
		// Display appropriate sprite for each plant
		for (var i = 0; i < plantList.length; i++)
		{
			var sprite = new Image();
			var x = (this.tileSize * (i % 5)) + (this.tileSize * 2) + (4 * i) + 4;
			var y = ((this.tileSize + 4) * Math.floor(i / 5)) + 4;
			
			if (plantList[i].harvested)
			{
				sprite = plantList[i].sprite[0];
				utility.addClickItem(x, y, this.tileSize, this.tileSize, this.displayPlantInfo);
			}
			else
			{
				sprite = notFound;
				utility.addClickItem(x, y, this.tileSize, this.tileSize, this.displayPlantNotFound);
			}
				
			
			gameplaySurface.drawImage
			(
				sprite,
				0, 0, sprite.width, sprite.height, x, y,
				this.tileSize,
				this.tileSize
			);
		}
	},

	// Display plant info if harvested
	displayPlantInfo: function(i)
	{
		this.curPlant = plantList[i];
		
		var strings = [];
		
		strings.push("Name: ".concat(curPlant.name));

		utility.writeText(menuSurface, strings, 10, 50, 64 * 4, 20);
	},

	// Display unharvested text
	displayPlantNotFound: function(i)
	{
		var strings = [];
		
		strings.push("This plant has not been found yet.");
		strings.push("To find this plant, explore more regions.");
					 
		utility.writeText(menuSurface, strings, 10, 50, 64 * 4, 20);
	},
	
	update: function()
	{
		if (curPlant != '')
		{
			menuSurface.drawImage
			(
				curPlant.sprite[curImg], 0, 0,
				curPlant.sprite[curImg].width, curPlant.sprite[curImg].height,
				0, 256, 256, 256
			); // SET TO PICK RANDOM
			
			curImg = curImg % curPlant.sprite.length;
		}
	}
};