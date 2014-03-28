// Created by Batman

// ISpy game mode

var ispy = {
	init: function()
	{
		clearClickHandler();
		
		backgroundSurface.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
		drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
		menuSurface.clearRect(0, 0, menuCanvas.width, menuCanvas.height);
		
		// Green gradient bg
		var grd = backgroundSurface.createLinearGradient(0, 0, 0, 512);
		grd.addColorStop(0, "darkgreen");
		grd.addColorStop(1, "limegreen");
		
		backgroundSurface.fillStyle = grd;
		backgroundSurface.fillRect(0, 0, 1152, 512);
		
		// Grey side panel
		var grd2 = drawingSurface.createLinearGradient(0, 0, 0, 512);
		grd2.addColorStop(0, "darkgrey");
		grd2.addColorStop(1, "grey");
		
		drawingSurface.fillStyle = grd2;
		drawingSurface.fillRect(0, 0, 64 * 4, 512);

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
			growPlants(curPlants, numImgs);
		else
			growPlants(curPlants, curPlants.length % numImgs);
	},

	// Nothing to update
	update: function()
	{
	},

	// Initializes if newly loaded, nothing otherwise
	render: function()
	{
	}
};