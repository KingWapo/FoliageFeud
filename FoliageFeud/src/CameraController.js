/*
	Created by Iron Man 2/27/2014
	
	Setting up the functionality behind the camera and
	the parallaxing background for the player to move
	along
	
	Maps will be 150 x 100, 
	the screen is 40 x 20,
	the tiles are 32 x 32
*/

//--- The sprite object

var spriteObject =
{
  sourceX: 0,
  sourceY: 0,
  sourceWidth: 64,
  sourceHeight: 64,
  x: 0,
  y: 0,
  width: 64,
  height: 64,
  vx: 0,
  vy: 0,
  gravity: 0.3,
  sprite: new Image(),
  rotation: 0
};

//Game Level Maps
//Arrays to store the level maps
var levelMaps = [];
var levelGameObjects = [];

// First map
var map1 = 
[
  [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
  [6,1,2,1,1,2,1,1,1,1,2,2,1,1,1,6],
  [6,1,1,1,1,1,2,1,2,1,1,1,1,2,1,6],
  [6,2,1,1,1,1,1,1,1,1,1,2,1,1,1,6],
  [6,1,2,1,2,2,1,1,1,1,2,1,1,1,1,6],
  [6,1,2,1,1,1,1,1,1,1,1,2,2,1,1,6],
  [6,1,1,1,2,1,2,2,1,1,1,1,1,1,2,6],
  [6,1,1,2,1,1,2,1,1,1,2,1,2,1,1,6],
  [6,1,2,1,1,1,2,1,2,1,1,1,1,2,1,6],
  [6,1,2,2,1,1,2,2,2,1,2,2,1,1,2,6],
  [6,2,1,1,1,2,1,1,1,1,1,1,1,1,1,6],
  [6,1,2,2,1,1,2,1,1,2,1,2,1,2,2,6],
  [6,1,1,1,2,1,1,1,2,1,1,1,1,1,1,6],
  [6,1,1,1,1,1,2,1,1,1,1,2,1,2,1,6],
  [6,1,2,1,2,1,1,1,1,2,1,1,1,1,1,6],
  [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6]
];

// First set of game objects
var gameObjects1 =
[
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,3,0,0,4,0,0,3,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,3,0,0,0,5,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,3,0,0,0,3,0,0,0,0,3,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

//Map code
var EMPTY = 0;
var FLOOR = 1;
var BOX = 2;
var MONSTER = 3;
var STAR = 4;
var ALIEN = 5;
var WALL = 6;

//**** Replace with tile map ****//
//Create the foreground sprite

var foreground = Object.create(spriteObject);
foreground.sprite.src = "../img/testbg.png";

var width = 2200;
var height = 1375;

foreground.sourceWidth = width;
foreground.sourceHeight = height;
foreground.width = width;
foreground.height = height;

/*
foreground.rotation = mapOrientation / 2;


switch(mapOrientation)
{
	case 0: // Rotate 0 degrees (North is up)
	case 2: // Rotate 180 degrees (North is down)
		foreground.sourceWidth = width;
		foreground.sourceHeight = height;
		foreground.width = width;
		foreground.height = height;
		break;
	case 1: // Rotate 90 degrees (North is left)
	case 3: // Rotate 270 degrees (North is right)
		foreground.sourceWidth = height;
		foreground.sourceHeight = width;
		foreground.width = height;
		foreground.height = width;
		break;
		/*
	case 2: // Rotate 180 degrees (North is down)
		foreground.sourceWidth = width;
		foreground.sourceHeight = height;
		foreground.width = width;
		foreground.height = height;
		foreground.rotation = 180;
		break;
	case 3: // Rotate 270 degrees (North is right)
		foreground.sourceWidth = height;
		foreground.sourceHeight = width;
		foreground.width = height;
		foreground.height = width;
		foreground.rotation = 270;
		break;
		
}

console.debug("Width: " + foreground.width);
console.debug("\nHeight: " + foreground.height);*/
//The sprite's rotation
//drawingSurface.translate(-foreground.width / 2, -foreground.height / 2);
//drawingSurface.rotate(foreground.rotation);
//drawingSurface.translate(foreground.width / 2, foreground.height / 2);

//**** Replace with tile map ****//


//Create the gameWorld and camera objects
var gameWorld = 
{
  x: 0,
  y: 0,
  width: foreground.width,
  height: foreground.height
};

//The camera has 2 new properties: "vx" and "previousX"
var camera = 
{
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
  vx: 0,
  previousX: 0,
  
  //The camera's inner scroll boundaries
  rightInnerBoundary: function()
  {
    return this.x + (this.width * 0.95);
  },
  
  leftInnerBoundary: function()
  {
    return this.x + (this.width * 0.05);
  },
  
  upperInnerBoundary: function()
  {
	return this.y + (this.height * 0.05);
  },
  
  lowerInnerBoundary: function()
  {
	return this.y + (this.height * 0.95);
  }
};


function cameraUpdate()
{
	//Scroll the camera
	if (player.x < camera.leftInnerBoundary())
	{
		camera.x -= player.speed; 
	}
	if (player.x + player.width > camera.rightInnerBoundary())
	{
		camera.x += player.speed; 
	}
	if (player.y < camera.upperInnerBoundary())
	{
		camera.y -= player.speed;
	}
	if (player.y + player.height > camera.lowerInnerBoundary())
	{
		camera.y += player.speed;
	}

	//The camera's world boundaries
	if (camera.x < gameWorld.x)
	{
		camera.x = gameWorld.x;
	}
	if (camera.x + camera.width > gameWorld.x + gameWorld.width)
	{
		camera.x = gameWorld.x + gameWorld.width - camera.width;
	}
	if (camera.y < gameWorld.y)
	{
		camera.y = gameWorld.y;
	}
	if (camera.y + camera.height > gameWorld.y + gameWorld.height)
	{
		camera.y = gameWorld.y + gameWorld.height - camera.height;
	}
}

function cameraRender()
{
	//Move the drawing surface so that it's positioned relative to the camera
	drawingSurface.translate(-camera.x, -camera.y);
	
	drawingSurface.drawImage
      (
        foreground.sprite, 
        //foreground.sourceX, foreground.sourceY, 
        //foreground.sourceWidth, foreground.sourceHeight,
        Math.floor(foreground.x), Math.floor(foreground.y) 
        //foreground.width, foreground.height
      );
}

function buildMap()
{
}

placeObservationEvent();

cameraLoaded = true;