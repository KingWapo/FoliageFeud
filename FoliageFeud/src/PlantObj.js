// Created by Batman

// All plant objects

/*var plant =
{
	name: "",
	sprite: "",
	harvested: false,
	leaf: "",
	color: ""
};*/

//var plantNames = ["brown", "orange", "red", "white", "yellow"];
var plantList = [];
var numRequested = 0;

// Creates a list of all possible plants
/*for (var i = 0; i < plantNames.length; i++)
{
	var newPlant = Object.create(plant);
	newPlant.name = plantNames[i];
	newPlant.sprite = new Image();
	newPlant.sprite.src = "../img/Plants/".concat(plantNames[i], ".png");
	plantList.push(newPlant);
}*/

function Plant(name, leaf, color)
{
	this.name = name;
	this.sprite = new Image();
	this.sprite.src = "../img/Plants/".concat(name, ".png");
	this.harvested = false;
	this.leaf = leaf;
	this.color = color;
}

plantList.push(new Plant("brown", "round", "brownish"));
plantList.push(new Plant("orange", "thorns", "orange and black"));
plantList.push(new Plant("red", "pointed", "red"));
plantList.push(new Plant("white", "bulb", "white"));
plantList.push(new Plant("yellow", "thin", "yellow"));

// Draws plants to screen and adds them as clickable objects
function growPlant(i, requested)
{
	var numPlants = Math.floor(Math.random() * 6) + 1;
	
	for (var j = 0; j < numPlants; j++)
	{
		do
		{
			var x = Math.floor((Math.random() * (64 * 12)) + 32 + (64 * 4));
			var y = Math.floor((Math.random() * (64 * 6)) + 32);
		} while(isIntersecting(x, y, 32, 32))
		
		if (requested)
		{
			addItem(x, y, plantList[i].sprite.width, plantList[i].sprite.height, harvestPlant);
			numRequested = numPlants;
		}
		else
			addItem(x, y, plantList[i].sprite.width, plantList[i].sprite.height, ignorePlant);
			
		drawingSurface.drawImage(plantList[i].sprite, x, y);
	}
}

// Switch gamemode to standard gameplay
function harvestPlant(i)
{
	console.debug("Plant Harvested");
	console.debug("--ADD MORE FUNCTIONALITY TO HARVEST FUNCTION");
	drawingSurface.clearRect(clickable[i].x, clickable[i].y, clickable[i].width, clickable[i].height);
	clickable.splice(i, 1);
	numRequested -= 1;
	
	// FIGURE OUT HOW TO REDRAW UNCLICKED OBJECTS
	
	if (numRequested <= 0)
		currentScreen = ScreenState.Gameplay;
}

// Ignore plant harvestPlant
function ignorePlant(i)
{
	console.debug("You selected the wrong flower");
}