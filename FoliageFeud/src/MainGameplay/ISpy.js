// Created by Batman

// ISpy game mode

var ispy = {
	// Size of image on screen
	imgSize: 256,
	// Index of requested plant
	requestedPlant: 0,
	background: new Image(),
	
	// Initialize game mode
	init: function()
	{
		this.background.src = "../img/Backgrounds/iSpyMenu.png";
		// Clear canvases and click handler
		utility.clearAll();
		
		backgroundSurface.drawImage(
			this.background,
			0, 0
		);
		
		// Green gradient bg
		/*
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
		*/
		
		// Add unharvested plants to ispy pool
		var curPlants = [];
		
		for (var i = 0; i < 2; i++){
			var plantIndex;
			
			if (curPlants.length < 1)
				plantIndex = plant.getRandUnHarvested();
			else
			{
				do
				{
					plantIndex = plant.getRandUnHarvested();
				} while (utility.contains(curPlants, plantIndex));
			}
				
			curPlants.push(plantIndex);
		}
		
		curPlants.push(this.requestedPlant);
		
		curPlants = utility.shuffle(curPlants);
		
		// Set number of images on screen
		var numImgs = 3;
	
		if (curPlants.length > numImgs)
			this.growPlants(curPlants, numImgs);
		else if (curPlants.length > 0)
			this.growPlants(curPlants, curPlants.length);
	},
	
	// Draws objects to screen for game mode
	growPlants: function(curPlants, i)
	{
		var requested = curPlants.indexOf(this.requestedPlant);
		console.debug(requested, ", ", curPlants.length);
		
		// Write plant name and traits to screen
		var strings = [];
		
		strings.push("Requested Plant: ".concat(plantList[this.requestedPlant].name));
		
		// 3 can go off screen
		for (var j = 0; j < 2; j++)
		{
			strings.push("Trait[".concat(j, "]: ", plant.getRandTrait(this.requestedPlant)));
		}
		
		utility.writeText(menuSurface, strings, 32, 50, 64 * 4 - 10, 25, true);
		
		// Draw plants on screen and add them to click handler
		for (var j = 0; j < i; j++)
		{
		//console.debug("loop: ", j, ", ", i);
			var x = ((this.imgSize  + 32)* j) + (64 * 4.5);
			var y = 128;
			
			if (curPlants[j] === this.requestedPlant)
				utility.addClickItem(x, y, this.imgSize, this.imgSize, this.harvestPlant, [j]);
			else
				utility.addClickItem(x, y, this.imgSize, this.imgSize, this.ignorePlant, [j]);

			var imgNum = Math.floor(Math.random() * plantList[curPlants[j]].sprite.length);
			
			gameplaySurface.drawImage(plantList[curPlants[j]].sprite[imgNum], x, y, this.imgSize, this.imgSize);
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