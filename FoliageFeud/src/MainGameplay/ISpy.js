// Created by Batman

// ISpy game mode

var ispy = {
	// Size of image on screen
	imgSize: 170,
	// Index of requested plant
	requestedPlant: 0,
	
	// Initialize game mode
	init: function()
	{
		// Clear canvases and click handler
		utility.clearAll();
		
		backgroundSurface.drawImage(
			imgISpyBg,
			0, 0
		);
		
		// Add unharvested plants to ispy pool
		var curPlants = plant.getMultipleUnHarvested(3);
		
		// Add requested plant to ispy pool
		curPlants.push(this.requestedPlant);
		
		// Shuffle array
		curPlants = utility.shuffle(curPlants);
		
		this.growPlants(curPlants, curPlants.length);
	},
	
	// Draws objects to screen for game mode
	growPlants: function(curPlants, i)
	{
		var requested = curPlants.indexOf(this.requestedPlant);
		console.debug(requested, ", ", curPlants.length);
		
		// Plants in current list
		console.debug("Current plant list: ", curPlants[0], ", ", curPlants[1], ", ", curPlants[2], ", ", curPlants[3]);
		
		// Write plant name and traits to screen
		var strings = [];
		
		// Add plant name to string array
		strings.push("Requested Plant: ".concat(plantList[this.requestedPlant].name));
		
		// Get 2 random traits for the plant
		var curTraits = plant.get2Traits(this.requestedPlant);
		
		// Add traits to string array
		for (var j = 0; j < curTraits.length; j++)
		{
			strings.push(curTraits[j]);
		}
		
		utility.writeText(menuSurface, strings, 96, 64, 64 * 4, 25, true);
		
		// Draw plants on screen and add them to click handler
		for (var j = 0; j < i; j++)
		{
			//console.debug("loop: ", j, ", ", i);
			var x;
			var y;
			
			switch (j)
			{
				case 0:
					x = 472;
					y = 54;
					break;
				case 1:
					x = 720;
					y = 32;
					break;
				case 2:
					x = 528;
					y = 286;
					break;
				case 3:
					x = 796;
					y = 260;
					break;
			}
			//var x = 1152 - (256 * (2 - (j % 2))) - 64;
			//var y = 256 * Math.floor(j / 2);
			
			if (curPlants[j] === this.requestedPlant)
				utility.addClickItem(x, y, this.imgSize, this.imgSize, this.harvestPlant, [j]);
			else
				utility.addClickItem(x, y, this.imgSize, this.imgSize, this.ignorePlant, [j]);

			var imgNum = Math.floor(Math.random() * plantList[curPlants[j]].sprite.length);
			
			gameplaySurface.drawImage(plantList[curPlants[j]].sprite[imgNum], x, y, this.imgSize, this.imgSize);
			gameplaySurface.drawImage(imgISpyOverlay, 0, 0, 1152, 512);
		}
	},

	// Handle correct guess
	harvestPlant: function(i)
	{
		// Clear image from screen and clickable array
		gameplaySurface.clearRect(utility.clickable[i].x, utility.clickable[i].y, utility.clickable[i].width, utility.clickable[i].height);
		utility.clickable.splice(i, 1);
		
		// Show that plant was harvested
		plantList[ispy.requestedPlant].harvested = true;
		
		// Reset requested plant index
		ispy.requestedPlant = -1;

		// Exit game mode
		exiting[currentScreen] = true;
	},

	// Handle incorrect guess
	ignorePlant: function(i)
	{
		console.debug("You selected the wrong flower");
	},
	
	setRequested: function(plantIndex)
	{
		ispy.requestedPlant = plantIndex;
	}
};