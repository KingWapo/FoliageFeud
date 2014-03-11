// Created by Batman

// All plant objects

var plant =
{
	name: "",
	sprite: ""
};

var plantNames = ["brown", "orange", "red", "white", "yellow"];
var plantList = [];
var originOffset = 64;

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
	
	for (var j = 0; j < Math.floor(Math.random() * 4) + 1; j++)
	{
		var newX = Math.floor(Math.random() * originOffset) - (originOffset / 2);
		var newY = Math.floor(Math.random() * originOffset) - (originOffset / 2);
		drawingSurface.drawImage(plantList[i].sprite, x + newX, y + newY);
	}
}

// Switch gamemode to standard gameplay
function exitObserve()
{
	currentScreen = ScreenState.Gameplay;
}