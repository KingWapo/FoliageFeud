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

function Plant(name, traits, numImages)
{
	this.name = name;
	this.sprite = [];
	
	for (var i = 0; i < numImages; i++)
	{
		this.sprite[i] = new Image();
		this.sprite[i].src = "../img/Plants/".concat(name, "/", i, ".png");
	}
	
	this.traits = traits;
	this.harvested = false;
}

// Creates a list of all possible plants
plantList.push(new Plant("Liverwort", ["No leaves or stem", "Flattened, branching thallus", "Found near moist, shady stream banks"], 6));
plantList.push(new Plant("Hair-Cap Moss", ["Pointed leaves", "Found in dense colonies in moist, acidic soils", "Specialized internal vascular tissues"], 6));
plantList.push(new Plant("Peat Moss", ["Forms large, deep colonies or floating mats", "Upright stems", "Spherical brown-to-black sporophyte capsules"], 8));

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

		var imgNum = Math.floor(Math.random() * curPlants[j].plant.sprite.length);
		
		gameplaySurface.drawImage(curPlants[j].plant.sprite[imgNum], x, y, imgSize, imgSize);
	}
}

// Switch gamemode to standard gameplay
function harvestPlant(i)
{
	console.debug("Plant Harvested");
	console.debug("--ADD MORE FUNCTIONALITY TO HARVEST FUNCTION");
	gameplaySurface.clearRect(clickable[i].x, clickable[i].y, clickable[i].width, clickable[i].height);
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