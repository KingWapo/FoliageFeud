// Created by Batman

// ISpy game mode

var ispy = {
	// Size of image on screen
	imgSize: 170,
	// Index of requested plant
	requestedPlant: 0,
	// Arrays of current plants and their sprites
	curPlants: [],
	curTraits: [],
	curSprites: [],
	
	// Initialize game mode
	init: function()
	{
		// Clear canvases and click handler
		utility.clearAll();
		
		// Add plants to ispy pool
		this.curPlants = plant.getMultiplePlants(3);
		this.curTraits = [];
		this.curSprites = [];
		
		// Add requested plant to ispy pool
		this.curPlants.push(this.requestedPlant);
		
		// Shuffle array
		this.curPlants = utility.shuffle(this.curPlants);
		
		// Get 2 random traits for the plant
		this.curTraits = plant.get2Traits(this.requestedPlant);

		for (var i = 0; i < this.curPlants.length; i++)
		{
			var imgNum = Math.floor(Math.random() * plantList[this.curPlants[i]].sprite.length);
			
			this.curSprites.push(plantList[this.curPlants[i]].sprite[imgNum]);
		}
	},
	
	// Draws objects to screen for game mode
	render: function()
	{
		utility.clearAll();
		var requested = this.curPlants.indexOf(this.requestedPlant);
		console.debug(requested, ", ", this.curPlants.length);
		
		// Plants in current list
		//console.debug("Current plant list: ", this.curPlants[0], ", ", this.curPlants[1], ", ", this.curPlants[2], ", ", this.curPlants[3]);
		
		// Write plant name and traits to screen
		var strings = [];
		
		// Add plant name to string array
		strings.push("Requested Plant: ".concat(plantList[this.requestedPlant].name));
		
		// Add traits to string array
		for (var j = 0; j < this.curTraits.length; j++)
		{
			strings.push(this.curTraits[j]);
		}
		
		utility.writeText(menuSurface, strings, 96, 64, 64 * 4, 25, false);
		
		// Draw plants on screen and add them to click handler
		for (var j = 0; j < this.curPlants.length; j++)
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
			
			if (this.curPlants[j] === this.requestedPlant)
				utility.addClickItem(x, y, this.imgSize, this.imgSize, this.harvestPlant, [j]);
			else
				utility.addClickItem(x, y, this.imgSize, this.imgSize, this.ignorePlant, [j]);
		
			utility.drawImage(
				backgroundSurface, imgISpyBg,
				0, 0, imgISpyBg.width, imgISpyBg.height,
				0, 0, imgISpyBg.width, imgISpyBg.height
			);
			
			utility.drawImage
			(
				gameplaySurface, this.curSprites[j],
				0, 0, this.curSprites[j].width, this.curSprites[j].height,
				x, y, this.imgSize, this.imgSize
			);
			utility.drawImage
			(
				gameplaySurface, imgISpyOverlay,
				0, 0, imgISpyOverlay.width, imgISpyOverlay.height,
				0, 0, 1152, 512
			);
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