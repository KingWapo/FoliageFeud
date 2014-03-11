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

var bg = new Image();
bg.src = "../img/ispywall.png";

// Initializes instance
function init()
{
	drawingSurface.drawImage
		(
			bg, 
			0, 0, 1152, 512,
			0, 0, 1152, 512
		  );
		  
	for (var i = 0; i < plantList.length; i++)
	{
		var x = Math.floor((Math.random() * (64 * 16)) + 32);
		var y = Math.floor((Math.random() * (64 * 6)) + 32);
		
		growPlant(i, x, y);
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