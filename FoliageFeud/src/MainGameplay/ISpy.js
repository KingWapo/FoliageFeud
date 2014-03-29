// Created by Batman

// ISpy game mode

var ispy = {
	// Size of image on screen
	imgSize: 256,
	// Index of requested plant
	requestedPlant: -1,
	
	// Initialize game mode
	init: function()
	{
		// Clear canvases and click handler
		utility.clearAll();
		
		// Green gradient bg
		var grd = backgroundSurface.createLinearGradient(0, 0, 0, 512);
		grd.addColorStop(0, "darkgreen");
		grd.addColorStop(1, "limegreen");
		
		backgroundSurface.fillStyle = grd;
		backgroundSurface.fillRect(0, 0, 1152, 512);
		
		// Grey side panel
		var grd2 = gameplaySurface.createLinearGradient(0, 0, 0, 512);
		grd2.addColorStop(0, "darkgrey");
		grd2.addColorStop(1, "grey");
		
		gameplaySurface.fillStyle = grd2;
		gameplaySurface.fillRect(0, 0, 64 * 4, 512);
		
		// Add unharvested plants to ispy pool
		var curPlants = [];
		
		for (var i = 0; i < plantList.length; i++)
		{
			if (!plantList[i].harvested)
			{
				var listObject = {
					plant: plantList[i],
					index: i
				};
				
				curPlants.push(listObject);
			}
		}
		
		/**
		ADD SHUFFLE FUNCTION TO UTILITY
		**/
		
		// Set number of images on screen
		var numImgs = 3;
	
		if (curPlants.length >= numImgs)
			this.growPlants(curPlants, numImgs);
		else if (curPlants.length > 0)
			this.growPlants(curPlants, curPlants.length % numImgs);
	},
	
	// Draws objects to screen for game mode
	growPlants: function(curPlants, i)
	{
		// Pick requested plant from first i elements in array
		var requested = Math.floor(Math.random() * i);

		// Get index of that plant
		this.requestedPlant = curPlants[requested].index;
		
		// Write plant name and traits to screen
		var strings = [];
		
		strings.push("Requested Plant: ".concat(plantList[this.requestedPlant].name));
		
		for (var j = 0; j < plantList[this.requestedPlant].traits.length; j++)
		{
			strings.push("Trait[".concat(j, "]: ", plantList[this.requestedPlant].traits[j]));
		}
		
		utility.writeText(menuSurface, strings, 10, 50, 64 * 4, 20);
		
		// Draw plants on screen and add them to click handler
		for (var j = 0; j < i; j++)
		{
			var x = ((this.imgSize  + 32)* j) + (64 * 4.5);
			var y = 128;
			
			if (curPlants[j].index === this.requestedPlant)
				utility.addClickItem(x, y, this.imgSize, this.imgSize, this.harvestPlant);
			else
				utility.addClickItem(x, y, this.imgSize, this.imgSize, this.ignorePlant);

			var imgNum = Math.floor(Math.random() * curPlants[j].plant.sprite.length);
			
			gameplaySurface.drawImage(curPlants[j].plant.sprite[imgNum], x, y, this.imgSize, this.imgSize);
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
	}
};