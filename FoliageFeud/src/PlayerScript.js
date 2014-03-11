// Created by Iron Man

// The main player class

// Set up the orientation of the map
var mapOrientation = Math.floor(Math.random() * 4);
console.debug("Map Orientation: " + mapOrientation);

// Enum to determine the screen the game is currently at
Direction = {
	Idle: 0,
	Right: 1,
	Left: 2,
	Down: 3,
	Up: 4
};

var player = {
	// Sprite Located on sheet
	sourceX: 0,
	sourceY: 0,
	sourceWidth: 64,
	sourceHeight: 64,
	
	// Animation info
	numOfFrames: 9,
	currentFrame: 0,
	
	//Update Animation Function
	updateAnimation: function()
	{
		if (this.direction !== Direction.Idle)
		{
			this.sourceX = this.currentFrame * this.sourceWidth;
			
			this.currentFrame += 1;
			if ( this.currentFrame === this.numOfFrames ) {
				this.currentFrame = 0;
			}
		}
	},
	
	// Gameplay info
	x: 0,
	y: 0,
	width: 64,
	height: 64,
	vx: 0,
	vy: 0,
	speed: 4,
	sprite: new Image(),
	direction: Direction.Idle
}

var observationInstance = {
	sourceX: 0,
	sourceY: 0,
	sourceWidth: 64,
	sourceHeight: 64,
	
	numOfFrames: 30,
	currentFrame: 0,
	
	//Update Animation Function
	updateAnimation: function()
	{
		this.sourceX = this.currentFrame * this.sourceWidth;
			
		this.currentFrame += 1;
		if ( this.currentFrame === this.numOfFrames ) {
			this.currentFrame = 0;
		}
		
		if (this.atLowestPos === true)
		{
			this.vy = -12;
			this.atLowestPos = false;
		}
		
		if (this.atLowestPos === false && this.vy < 12)
		{
			this.vy += this.gravity;
		}
		
		this.y += this.vy;
		
		if (this.y >= this.lowestPos)
		{
			this.y = this.lowestPos;
			this.vy = 0;
			this.atLowestPos = true;
		}
	},
	
	x: 0,
	y: 0,
	vy: 0,
	width: 64,
	height: 64,
	gravity: 2,
	lowestPos: 0,
	atLowestPos: true,
	
	sprite: new Image()
}

var cameraLoaded = false;
var onPause = false;

// Load the CameraController
var cc = document.createElement("script");
cc.type = "text/javascript";
cc.src = "CameraController.js";
document.body.appendChild(cc);


// Load the image files
//player.sprite.addEventListener("load", loadHandler, false);
player.sprite.src = "../img/characterMale.png";

observationInstance.sprite.src = "../img/exclamationPoint.png";

//Arrow key codes
var LEFT = 37;
var UP = 38;
var RIGHT = 39;
var DOWN = 40;
var ENTER = 13;

//Directions
var moveLeft = false;
var moveUp = false;
var moveRight = false;
var moveDown = false;

//Add keyboard listeners
window.addEventListener("keydown", function(event)
{
	if (!onPause)
	{
	  switch(event.keyCode)
	  {
		  case LEFT:
			moveLeft = true;
			break;  
		
		  case UP:
			moveUp = true;
			break;
			
		  case RIGHT:
			moveRight = true;
			break; 
		
		  case DOWN:
			moveDown = true;
			break;
		
	  }
	}
	
}, false);

window.addEventListener("keyup", function(event)
{
	if (onPause)
	{
		if (event.keyCode == ENTER)
		{
			console.debug("Exit Pause");
			onPause = false;
		}
	}
	else
	{
	  switch(event.keyCode)
	  {   
		  case LEFT:
			moveLeft = false;
			break;  
			
		  case UP:
			moveUp = false;
			break;
			
		  case RIGHT:
			moveRight = false;
			break; 
		
		  case DOWN:
			moveDown = false;
			break;
		
		  
		  case ENTER:
			console.debug("Enter Pause");
			onPause = true;
			break;
	  }
    }
}, false);



function update()
{
	checkMovement();
	
	if ( cameraLoaded && collisionDetection(player, observationInstance))
	{
		currentScreen = ScreenState.Observation;
	}
	
	updateAnimation();
	
	if (onPause)
	{
	}
}

function updateAnimation()
{
	player.updateAnimation();
	observationInstance.updateAnimation();
}

function checkMovement()
{
	// Set velocity in the direction of the key that is pressed.
	if (moveRight && !moveLeft)
	{
		player.vx = player.speed;
		if (player.direction !== Direction.Right) {
			player.direction = Direction.Right;
		}
	}
	if (moveLeft && !moveRight)
	{
		player.vx = -player.speed;
		if (player.direction !== Direction.Left) {
			player.direction = Direction.Left;
		}
	}
	if (moveUp && !moveDown)
	{
		player.vy = -player.speed;
		if (player.direction !== Direction.Up) {
			player.direction = Direction.Up;
		}
	}
	if (moveDown && !moveUp)
	{
		player.vy = player.speed;
		if (player.direction !== Direction.Down) {
			player.direction = Direction.Down;
		}
	}
	
	// Set the velocity to zero if no direction is pressed.
	if (!moveRight && !moveLeft)
	{
		player.vx = 0;
	}
	if (!moveDown && !moveUp)
	{
		player.vy = 0;
	}
	
	if (!moveRight && !moveLeft && !moveDown && !moveUp)
	{
		if (player.direction !== Direction.Idle) {
			if (player.direction == Direction.Right) {
				player.currentFrame = 0;
				player.sourceX = 0;
			}
			else if (player.direction == Direction.Left) {
				player.currentFrame = 1;
				player.sourceX = player.sourceWidth;
			}
			else if (player.direction == Direction.Up) {
				player.currentFrame = 3;
				player.sourceX = 3 * player.sourceWidth;
			}
			else if (player.direction == Direction.Down) {
				player.currentFrame = 2;
				player.sourceX = 2 * player.sourceWidth;
			}
			player.direction = Direction.Idle;
		}
	}
	
	if (cameraLoaded)
	{
		player.x = clamp(player.x + player.vx, 0, gameWorld.width - player.width);
		player.y = clamp(player.y + player.vy, 0, gameWorld.height - player.height);
		cameraUpdate();
	}
}

function render()
{
	if (cameraLoaded)
	{
		cameraRender();
		
		drawingSurface.drawImage
		  (
			observationInstance.sprite, 
			observationInstance.sourceX, observationInstance.sourceY, 
			observationInstance.sourceWidth, observationInstance.sourceHeight,
			Math.floor(observationInstance.x), Math.floor(observationInstance.y), 
			observationInstance.width, observationInstance.height
		  );
	}
	
	  
	drawingSurface.drawImage
      (
        player.sprite, 
        player.sourceX, player.sourceY + player.direction * player.sourceHeight, 
        player.sourceWidth, player.sourceHeight,
        Math.floor(player.x), Math.floor(player.y), 
        player.width, player.height
      );
	  
	  
}

function clamp(val, minVal, maxVal)
{
	return Math.max(minVal, Math.min(val, maxVal));
}


// Randomly places the observationInstance on the map
function placeObservationEvent()
{
	var obsX = Math.random() * gameWorld.width - observationInstance.width;
	var obsY = Math.random() * gameWorld.height - observationInstance.height;
	
	observationInstance.x = obsX;
	observationInstance.y = obsY;
	observationInstance.lowestPos = obsY;
	
	console.debug("x: " + obsX + " y: " + obsY);
}

loadScreens();