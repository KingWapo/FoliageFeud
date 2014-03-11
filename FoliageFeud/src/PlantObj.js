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
function growPlant(i)
{
	
	for (var j = 0; j < Math.floor(Math.random() * 4) + 1; j++)
	{
		do
		{
			var x = Math.floor((Math.random() * (64 * 16)) + 32);
			var y = Math.floor((Math.random() * (64 * 6)) + 32);
		} while(isIntersecting(x, y, 32, 32))
		
		addItem(x, y, plantList[i].sprite.width, plantList[i].sprite.height, exitObserve);
		drawingSurface.drawImage(plantList[i].sprite, x, y);
	}
}

// Switch gamemode to standard gameplay
function exitObserve()
{
	currentScreen = ScreenState.Gameplay;
}