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

var girlImage = new Image();
girlImage.src = "../img/playButtonGirl.png";
var boyImage = new Image();
boyImage.src="../img/playButtonBoy.png";
var menuScreen = new Image();
menuScreen.src = "../img/menuscreen.png";

var play = Object.create(spriteObject);
play.sourceWidth = 256;
play.sourceHeight = 128;
play.width = 256;
play.height = 128;
play.x = (menuCanvas.width - play.width) / 2;
play.y = (menuCanvas.height - play.height) / 2 - 96;
addItem(play.x, play.y, play.width, play.height, playClicked);

var playBoy = Object.create(spriteObject);
playBoy.sourceWidth = 256;
playBoy.sourceHeight = 128;
playBoy.width = 256;
playBoy.height = 128;
playBoy.x = (menuCanvas.width - play.width) / 2;
playBoy.y = ((menuCanvas.height - play.height) / 2)+96;
addItem(playBoy.x, playBoy.y, playBoy.width, playBoy.height, playBoyClicked);


function playClicked()
{
	currentScreen = ScreenState.Gameplay;
	currentSprite = SpriteState.Girl;
}

function playBoyClicked()
{
	currentScreen = ScreenState.Gameplay;
	currentSprite = SpriteState.Boy;
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
		girlImage,
		play.x, play.y
		);
		
	menuSurface.drawImage(
		boyImage,
		playBoy.x, playBoy.y
		);
		
	backgroundSurface.drawImage(
		menuScreen,
		0, 0
		);
}

loadScreens();