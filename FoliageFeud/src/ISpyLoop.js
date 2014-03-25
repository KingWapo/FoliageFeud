// Created by Batman

// ISpy game mode

// Environment constants
var MARSH   = "Marsh";
var WATER   = "Water";
var FOREST  = "Forest";
var CLIFF   = "Cliff";
var PRAIRIE = "Prairie";

// If not initialized, grow flowers
var initialized = false;

// Stores info on current instance
var observeInstance =
{
	region: "",
	environment: ""
}

//var bg = new Image();
//bg.src = "../img/ispywall.png";

// Initializes instance
function init()
{
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
	var requestedPlant = Math.floor(Math.random() * plantList.length);
	
	var strings = [];
	
	strings.push("Requested Plant: ".concat(plantList[requestedPlant].name));
	strings.push("Leaf Type: ".concat(plantList[requestedPlant].leaf));
	strings.push("Plant Color: ".concat(plantList[requestedPlant].color));
	strings.push("Harvested: ".concat(plantList[requestedPlant].harvested));
	
	writeText(menuSurface, strings, 10, 50, 64 * 4, 20);
	
	setRequestedPlant(requestedPlant);
	
	for (var i = 0; i < plantList.length; i++)
	{
		if (i === requestedPlant)
			growPlant(i, true);
		else
			growPlant(i, false);
	}
}

// Nothing to update
function update()
{
}

// Initializes if newly loaded, nothing otherwise
function render()
{
	if (!initialized)
	{
		clearClickHandler();
		
		drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
		init();
		initialized = true;
	}
}

// Updates loaded screens variables
loadScreens();