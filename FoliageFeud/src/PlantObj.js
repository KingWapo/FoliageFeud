// Created by Brandon Felch

// All plant objects

var plant =
{
	name: "",
	sprite: new Image(),
	srcX: 0,
	srcY: 0,
	srcW: 64,
	srcH: 64,
	x: 0,
	y: 0,
	w: 32,
	h: 32
}

var plantNames = ["brown", "orange", "red", "white", "yellow"];
//var plantList = [];

/* function growPlants(i, x, y)
{
	var newPlant = Object.create(plant);
	newPlant.name = plantNames[i];
	newPlant.sprite.src = "../img/".concat(plantNames[i], ".png");
	newPlant.x = x;
	newPlant.y = y;
	
	return newPlant;
} */

/* for (var i = 0; i < plantNames.length; i++)
{
	plantList.push(growPlants(i, 64 * i, 100));
} */

function clickHandler()
{
	currentScreen = ScreenState.Gameplay;
}