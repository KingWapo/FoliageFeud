// Created by Batman

// All plant objects

// Environment constants
var MARSH   = "Marsh";
var WATER   = "Water";
var FOREST  = "Forest";
var CLIFF   = "Cliff";
var PRAIRIE = "Prairie";

//var plantNames = ["brown", "orange", "red", "white", "yellow"];
var plantList = [];
var imgSize = 256;
var requestedPlant = -1;

function Plant(name, leaf, color, region)
{
	this.name = name;
	this.sprite = new Image();
	this.sprite.src = "../img/Plants/".concat(name, ".png");
	this.harvested = false;
	this.leaf = leaf;
	this.color = color;
	this.region = region;
}

// Creates a list of all possible plants
plantList.push(new Plant("Wild Ginger", "kidney-shaped", "brown or red", MARSH));
plantList.push(new Plant("Hepatica", "three-lobed", "pink, purple, blue, or white", MARSH));
plantList.push(new Plant("Blood Root", "sheath-like and multi-lobed", "white", MARSH));
plantList.push(new Plant("Dutchman's Breeches", "teardrop-shaped", "pink or white", MARSH));
plantList.push(new Plant("Violet", "heart-shaped", "violet, blue, yellow, white, or cream", MARSH));

function startInstance(curPlants)
{
	var numImgs = 3;
	
	if (curPlants.length >= numImgs)
		growPlants(curPlants, numImgs);
	else
		growPlants(curPlants, curPlants.length % numImgs);
}

// Draws plants to screen and adds them as clickable objects
function growPlants(curPlants, i)
{
	var requested = Math.floor(Math.random() * i);
	
	requestedPlant = curPlants[requested].index;
	
	for (var j = 0; j < i; j++)
	{
		var x = ((imgSize  + 32)* j) + (64 * 4.5);
		var y = 128;
		
		if (requested === j)
			addItem(x, y, imgSize, imgSize, harvestPlant);
		else
			addItem(x, y, imgSize, imgSize, ignorePlant);

		drawingSurface.drawImage(curPlants[j].plant.sprite, x, y, imgSize, imgSize);
	}
}

// Switch gamemode to standard gameplay
function harvestPlant(i)
{
	console.debug("Plant Harvested");
	console.debug("--ADD MORE FUNCTIONALITY TO HARVEST FUNCTION");
	drawingSurface.clearRect(clickable[i].x, clickable[i].y, clickable[i].width, clickable[i].height);
	clickable.splice(i, 1);
	
	plantList[requestedPlant].harvested = true;
	requestedPlant = -1;

	currentScreen = ScreenState.Gameplay;
}

// Ignore plant harvestPlant
function ignorePlant(i)
{
	console.debug("You selected the wrong flower");
}