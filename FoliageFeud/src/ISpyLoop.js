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
	var grd = drawingSurface.createLinearGradient(0, 0, 0, 512);
	grd.addColorStop(0, "darkgreen");
	grd.addColorStop(1, "limegreen");
	
	drawingSurface.fillStyle = grd;
	drawingSurface.fillRect(0, 0, 1152, 512);

	var requestedPlant = Math.floor(Math.random() * plantList.length);
	
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