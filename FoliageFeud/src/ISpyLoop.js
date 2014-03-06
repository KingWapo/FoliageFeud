// Created by Brandon Felch

// ISpy game mode

// Environment constants
var MARSH   = "Marsh";
var WATER   = "Water";
var FOREST  = "Forest";
var CLIFF   = "Cliff";
var PRAIRIE = "Prairie";

var observeInstance =
{
	region: "",
	environment: ""
}

var canvas = document.querySelector("canvas");
var drawingSurface = canvas.getContext("2d");

function update()
{
	requestAnimFrame(update);

	render();
}

function render()
{
	// Sets sprite path
	// Draws sprite to canvas
	for (var i = 0; i < plantNames.length; i++)
	{
		var sprite = new Image();
		sprite.src = "../img/Plants/".concat(plantNames[i], ".png");
		drawingSurface.drawImage(sprite, 64 * i, 100);
	}
}

//Last call should change the state to loaded and all previous states to false
for (var i = 0; i < screensLoaded.length; i++)
{
	if (i == currentScreen) {
		screensLoaded[i] = true;
	}
	else {
		screensLoaded[i] = false;
	}
}