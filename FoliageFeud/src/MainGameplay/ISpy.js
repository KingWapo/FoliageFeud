// Created by Batman

// ISpy game mode

var ispy = {
	imgSize: 256,
	requestedPlant: -1,
	
	init: function()
	{
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

		// Write requested plant info and display plant
		/*var requestedPlant = Math.floor(Math.random() * plantList.length);
		
		var strings = [];
		
		strings.push("Requested Plant: ".concat(plantList[requestedPlant].name));
		strings.push("Leaf Type: ".concat(plantList[requestedPlant].leaf));
		strings.push("Plant Color: ".concat(plantList[requestedPlant].color));
		strings.push("Harvested: ".concat(plantList[requestedPlant].harvested));
		
		writeText(menuSurface, strings, 10, 50, 64 * 4, 20);*/
		
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
		
		var numImgs = 3;
	
		if (curPlants.length >= numImgs)
			this.growPlants(curPlants, numImgs);
		else if (curPlants.length > 0)
			this.growPlants(curPlants, curPlants.length % numImgs);
	},
	
	// Draws plants to screen and adds them as clickable objects
	growPlants: function(curPlants, i)
	{
		var requested = Math.floor(Math.random() * i);

		this.requestedPlant = curPlants[requested].index;
		
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

	// Switch gamemode to standard gameplay
	harvestPlant: function(i)
	{
		console.debug("Plant Harvested");
		console.debug("--ADD MORE FUNCTIONALITY TO HARVEST FUNCTION");
		gameplaySurface.clearRect(utility.clickable[i].x, utility.clickable[i].y, utility.clickable[i].width, utility.clickable[i].height);
		utility.clickable.splice(i, 1);
		
		plantList[ispy.requestedPlant].harvested = true;
		ispy.requestedPlant = -1;

		exiting[currentScreen] = true;
	},

	// Ignore plant harvestPlant
	ignorePlant: function(i)
	{
		console.debug("You selected the wrong flower");
	}
};