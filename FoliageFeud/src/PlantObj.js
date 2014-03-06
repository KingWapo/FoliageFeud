// Created by Batman

// All plant objects

var plant =
{
	name: "",
	sprite: ""
};

var plantNames = ["brown", "orange", "red", "white", "yellow"];
var plantList = [];

// Creates a list of all possible plants
for (var i = 0; i < plantNames.length; i++)
{
	var newPlant = Object.create(plant);
	newPlant.name = plantNames[i];
	newPlant.sprite = new Image();
	newPlant.sprite.src = "../img/Plants/".concat(plantNames[i], ".png");
	plantList.push(newPlant);
}

// Draws plants to screen and adds them as clickable objects
function growPlant(i, x, y)
{
	addItem(x, y, plantList[i].sprite.width, plantList[i].sprite.height, exitObserve);
	
	drawingSurface.drawImage(plantList[i].sprite, x, y);
}

// Switch gamemode to standard gameplay
function exitObserve()
{
	currentScreen = ScreenState.Gameplay;
}