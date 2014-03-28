// Created by Iron Man

// The main player class

// Set up the orientation of the map
var mapOrientation = Math.floor(Math.random() * 4);
console.debug("Map Orientation: " + mapOrientation);

var listOfGameObjectMaps = [];
var currentLocation = 0;

// Enum to determine the animation to be played
Animation = {
	Idle: 0,
	Right: 1,
	Left: 2,
	Down: 3,
	Up: 4,
	WorldEventRight: 5
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
		if (this.animation !== Animation.Idle)
		{
			this.sourceX = this.currentFrame * this.sourceWidth;
			
			this.currentFrame += 1;
			if ( this.currentFrame === this.numOfFrames ) {
				this.currentFrame = 0;
			}
		}
	},
	
	// Gameplay info
	x: 192,
	y: 256,
	width: 64,
	height: 64,
	vx: 0,
	vy: 0,
	speed: 4,
	walkSpeed: 4,
	runSpeed: 10,
	sprite: new Image(),
	animation: Animation.Idle
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
var blueCoin =
{
	sourceX: 0,
	sourceY: 0,
	sourceWidth: 64,
	sourceHeight: 64,
	numOfFrames: 10,
	currentFrame: 0,
	visible: true,
	update:0,
	updateAnimation: function()
	{
			if(this.update===0)
			{
					this.sourceX = this.currentFrame * this.sourceWidth;
			
					this.currentFrame += 1;
					
				if ( this.currentFrame === this.numOfFrames )
				 {
					this.currentFrame = 0;	
				 }
					
			}
	this.update = (this.update+1)%2;
	},
	x: 20,
	y: 20,
	width: 64,
	height: 64,
	
	sprite: new Image()
	
}
var grayCoin =
{
	sourceX: 0,
	sourceY: 0,
	sourceWidth: 64,
	sourceHeight: 64,
	visible: true,
	x: 20,
	y: 20,
	width: 64,
	height: 64,
	
	sprite: new Image()
	
}

var cameraLoaded = false;
var pauseLoaded = false;
var mapBuilt = false;
var onPause = false;

// Load the image files
player.sprite.src = "../../img/Player/characterMale.png";
updateSprite();
setInterval(updateSprite, 100);

// Load the image files
function updateSprite()
{
	/*
	switch(currentSprite)
	{
		case SpriteState.Boy:
			player.sprite.src = "../img/Player/characterMale.png";
		break;
		
		case SpriteState.Girl:
			player.sprite.src = "../img/Player/characterFemale.png";
		break;	
	}
	*/
}

observationInstance.sprite.src = "../../img/Tokens/exclamationPoint.png";
blueCoin.sprite.src=  "../../img/Tokens/waterToken.png";
grayCoin.sprite.src=  "../../img/Tokens/cat.png";


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
	if (event.keyCode == 16)
	{
		player.speed = player.runSpeed;
	}
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
	if (event.keyCode == 16)
	{
		player.speed = player.walkSpeed;
	}
	if (onPause)
	{
		if (event.keyCode == ENTER)
		{
			console.debug("Exit Pause");
			mapBuilt = false;
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
			moveDown = false;
			moveLeft = false;
			moveRight = false;
			moveUp = false;
			break;
		}
	}
	
}, false);


function gameplayUpdate()
{
	if (onPause)
	{
		if (!mapBuilt)
		{
			buildInGameMap();
			mapBuilt = true;
		}
	}
	else if (screensLoaded[ScreenState.WorldEvent])
	{
		worldEventUpdate();
	}
	else if (screensLoaded[ScreenState.Gameplay])
	{
		checkMovement();
	
		if ( cameraLoaded && collisionDetection(player, observationInstance))
		{
			currentScreen = ScreenState.Observation;
		}	
		//check for collisions with collidables.
		if(cameraLoaded)
		{
			if (!screensLoaded[ScreenState.WorldEvent])
			{
				for( i=0; i<collidables.length; i++)
				{
					var wCount=0;
					if ( collisionDetection(player, collidables[i]) && collidables[i].name=="water" && skillBook.swim==false)
					{
						collide();
				
						if(wCount===0)
						{
							message("water");
							
						}
						wCount++;
						if(wCount===3000)
						{
							wCount=0;
						}
					}
					if ( collisionDetection(player, collidables[i]) && collidables[i].name=="tree")
					{
						collide();
					}	
					if ( collisionDetection(player, blueCoin) && blueCoin.visible==true)
					{
						skillBook.swim=true;
						blueCoin.visible=false;
						message("swim")
					
					}
					if ( collisionDetection(player, grayCoin) && grayCoin.visible==true)
					{
						skillBook.climb=true;
						grayCoin.visible=false;
						message("climb");
					
					}				
				}
			}
		}
		
		updateAnimation();
	}
}
function collide()
{
	playerSpeed=0;
	/*
	if(player.animation==Animation.Right)
	{
		player.x=player.x-16;
		
	}
	if(player.animation==Animation.Left)
	{
		player.x=player.x+16;
	}
	
	if(player.animation==Animation.Up)
	{
		player.y=player.y+16;
	}
	if(player.animation==Animation.Down)
	{
		player.y=player.y-16;
		
	}
	*/
	if (moveRight && !moveLeft)
	{
		player.x = player.x-16;
	}
	if (moveLeft && !moveRight)
	{
		player.x = player.x+16;
		
	}
	if (moveUp && !moveDown)
	{
		player.y = player.y+16;
		
	}
	if (moveDown && !moveUp)
	{
		player.y = player.y-16;
		
	}
	
	
}
function message(name)
{
	
	if(name === "water" )
	{	
		if( levelCounter ===0)
		
		window.alert("OH no you dont want to die! You need a magical blue spining coin to guide you across the waters...hmmmm wonder if there is one on this map.");	
	}
	 else if(name === "swim" )
	{	
		if( levelCounter ===0)
		
		window.alert(" You have gained the ability to swim! The swim ability is now unlocked in your skill book. GO GET EM TIGER!");	
	}
	else if(name ==="climb")
	{
		window.alert(" man...you can climb now thanks to this cat you collected....hopefully the artists will make it..idk..not a cat");	
	}
	else
	{
	 window.alert("dont die your significant other needs you! learn to swim before you try to explore the rivers");
	}
				moveDown = false;
				moveLeft = false;
				moveRight = false;
				moveUp = false;
	
}

function updateAnimation()
{
	player.updateAnimation();
	observationInstance.updateAnimation();
	blueCoin.updateAnimation();
}

function checkMovement()
{
	// Set velocity in the direction of the key that is pressed.
	if (moveRight && !moveLeft)
	{
		player.vx = player.speed;
		if (player.animation !== Animation.Right) {
			player.animation = Animation.Right;
		}
	}
	if (moveLeft && !moveRight)
	{
		player.vx = -player.speed;
		if (player.animation !== Animation.Left) {
			player.animation = Animation.Left;
		}
	}
	if (!screensLoaded[ScreenState.WorldEvent])
	{
		if (moveUp && !moveDown)
		{
			player.vy = -player.speed;
			if (player.animation !== Animation.Up) {
				player.animation = Animation.Up;
			}
		}
		if (moveDown && !moveUp)
		{
			player.vy = player.speed;
			if (player.animation !== Animation.Down) {
				player.animation = Animation.Down;
			}
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
		if (player.animation !== Animation.Idle) {
			if (player.animation == Animation.Right) {
				player.currentFrame = 0;
				player.sourceX = 0;
			}
			else if (player.animation == Animation.Left) {
				player.currentFrame = 1;
				player.sourceX = player.sourceWidth;
			}
			else if (player.animation == Animation.Up) {
				player.currentFrame = 3;
				player.sourceX = 3 * player.sourceWidth;
			}
			else if (player.animation == Animation.Down) {
				player.currentFrame = 2;
				player.sourceX = 2 * player.sourceWidth;
			}
			player.animation = Animation.Idle;
		}
	}
	
	if (cameraLoaded)
	{
		player.x = clamp(player.x + player.vx, 0, gameWorld.width - player.width);
		player.y = clamp(player.y + player.vy, 0, gameWorld.height - player.height);
		cameraUpdate();
	}
}

function gameplayRender()
{
	if (onPause)
	{
		pauseRender();
	}
	else if (screensLoaded[ScreenState.WorldEvent])
	{
		backgroundSurface.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
		drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
		menuSurface.clearRect(0, 0, menuCanvas.width, menuCanvas.height);
		worldEventRender();
		drawingSurface.drawImage
		  (
			player.sprite, 
			player.sourceX, player.sourceY + player.animation * player.sourceHeight, 
			player.sourceWidth, player.sourceHeight,
			Math.floor(player.x), Math.floor(player.y), 
			player.width, player.height
		  );
	}
	else
	{
		backgroundSurface.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
		drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
		menuSurface.clearRect(0, 0, canvas.width, canvas.height);
		if (cameraLoaded)
		{
			cameraRender();
			
			if(blueCoin.visible==true)
			{
			 drawingSurface.drawImage
		  (
			
				blueCoin.sprite, 
				blueCoin.sourceX, blueCoin.sourceY, 
				blueCoin.sourceWidth, blueCoin.sourceHeight,
				Math.floor(blueCoin.x), Math.floor(blueCoin.y), 
				blueCoin.width, blueCoin.height
			 );
		}
		if(grayCoin.visible==true)
			{
			 drawingSurface.drawImage
		  (
			
				grayCoin.sprite, 
				grayCoin.sourceX, grayCoin.sourceY, 
				grayCoin.sourceWidth, grayCoin.sourceHeight,
				Math.floor(grayCoin.x), Math.floor(grayCoin.y), 
				grayCoin.width, grayCoin.height
			 );
		}
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
			player.sourceX, player.sourceY + player.animation * player.sourceHeight, 
			player.sourceWidth, player.sourceHeight,
			Math.floor(player.x), Math.floor(player.y), 
			player.width, player.height
		  );
		 
		 
		
		  
	}
}

function clamp(val, minVal, maxVal)
{
	return Math.max(minVal, Math.min(val, maxVal));
}


// Randomly places the observationInstance on the map
function placeObservationEvent()
{
	var obsX = Math.random() * (gameWorld.width - 128) - observationInstance.width + 128;
	var obsY = Math.random() * (gameWorld.height - 128) - observationInstance.height + 128;
	
	observationInstance.x = obsX;
	observationInstance.y = obsY;
	observationInstance.lowestPos = obsY;
	
	console.debug("x: " + obsX + " y: " + obsY);
}
//places the blue object
function placeBlue()
{
	blueCoin.x=1000;
	blueCoin.y=128*2;
}
// randomly places the gray coin
function placeGray()
{
	grayCoin.x=2000;
	grayCoin.y=1000;
}