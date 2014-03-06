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