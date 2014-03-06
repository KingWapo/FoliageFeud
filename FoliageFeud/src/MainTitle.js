// Created by Iron Man 2/26/2014

// The Main Title Screen

//var canvas = document.querySelector("canvas");
var playArea = document.getElementById("playArea");

var play = document.createElement("a");
play.text = "Play";
play.href = "javascript:playClicked()";
document.body.appendChild(play);

function playClicked()
{
	currentScreen = ScreenState.Gameplay;
	document.body.removeChild(play);
}

function update()
{
}

function render()
{
	drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
}

loadScreens();