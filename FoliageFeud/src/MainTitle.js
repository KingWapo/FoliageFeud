// Created by Iron Man 2/26/2014

// The Main Title Screen

//var canvas = document.querySelector("canvas");
//var playArea = document.getElementById("playArea");

/*
var play = document.createElement("a");
play.text = "Play";
play.href = "javascript:playClicked()";
document.body.appendChild(play);
*/

var playImage = new Image();
playImage.src = "../img/playButton.png";

var menuScreen = new Image();
menuScreen.src = "../img/menuscreen.png";

var play = Object.create(spriteObject);
play.sourceWidth = 256;
play.sourceHeight = 128;
play.width = 256;
play.height = 128;
play.x = (menuCanvas.width - play.width) / 2;
play.y = (menuCanvas.height - play.height) / 2;

addItem(play.x, play.y, play.width, play.height, playClicked);

function playClicked(i)
{
	currentScreen = ScreenState.Gameplay;
}

function update()
{
}

function render()
{
	backgroundSurface.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
	drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
	menuSurface.clearRect(0, 0, menuCanvas.width, menuCanvas.height);
	
	menuSurface.drawImage(
		playImage,
		play.x, play.y
		);
		
	backgroundSurface.drawImage(
		menuScreen,
		0, 0
		);
}

loadScreens();