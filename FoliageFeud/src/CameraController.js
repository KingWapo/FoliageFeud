/*
	Created by Iron Man 2/27/2014
	
	Setting up the functionality behind the camera and
	the parallaxing background for the player to move
	along
	
	Maps will be 75 x 50, 
	the screen is 18 x 8,
	the tiles are 64 x 64
*/

//Game Level Maps
//Arrays to store the level maps
var levelMaps = [];
var levelGameObjects = [];

//A level counter
var levelCounter = 0;

//A timer to help delay the change time between levels
var levelChangeTimer = 0;

var map0 = [];
for (var i = 0; i < 50; i++)
{
	var tempList = [];
	for (var j = 0; j < 75; j++)
	{
		tempList.push(1);
	}
	map0.push(tempList);
}
levelMaps.push(map0);

var gameObjects0 = [];

for (var i = 0; i < 50; i++)
{
	var tempList = [];
	for (var j = 0; j < 75; j++)
	{
		if ((i == 0 && j % 2 == 0) || (i == 49 && j % 2 == 0) || (j == 0 && i % 2 == 0) || (j == 74 && i % 2 == 0))
		{
			tempList.push(5); // Push Tree
		}
		else if (j == 23)
		{
			tempList.push(2); // Push water
		}
		else {
			tempList.push(0); // Push Empty
		}
	}
	gameObjects0.push(tempList);
}
levelGameObjects.push(gameObjects0);

var map1 = [];
for (var i = 0; i < 50; i++)
{
	var tempList = [];
	for (var j = 0; j < 75; j++)
	{
		tempList.push(1);
	}
	map1.push(tempList);
}

levelMaps.push(map1);


var gameObjects1 = [];

for (var i = 0; i < 50; i++)
{
	var tempList = [];
	for (var j = 0; j < 75; j++)
	{
		if ((i == 0 && j % 2 == 0) || (i == 49 && j % 2 == 0) || (j == 0 && i % 2 == 0) || (j == 74 && i % 2 == 0))
		{
			tempList.push(2);
		}
		else {
			tempList.push(0);
		}
	}
	gameObjects1.push(tempList);
}

levelGameObjects.push(gameObjects1);


//Map code
var EMPTY = 0;
var GRASS = 1;
var WATER = 2;
var ROCK = 3;
var SKY = 4;
var TREE = 5;

// Size of each tile
var SIZE = 64;

//The number of rows and columns
var ROWS = map1.length;
var COLUMNS = map1[0].length;

//Load the tilesheet image
var tilesheet = new Image();
tilesheet.src = "../img/tilesheet.png";
//assetsToLoad.push(image);

//The number of columns on the tilesheet
var tilesheetColumns = 4;

var WIDTH = COLUMNS * SIZE;
var HEIGHT = ROWS * SIZE;


//Arrays to store the game objects
var baseTiles = [];
var foregroundTiles = [];
for (var i = 0; i < 50; i++)
{
	var tempList = [];
	var foregroundTemp = [];
	for (var j = 0; j < 75; j++)
	{
		var sprite = Object.create(spriteObject);
		tempList.push(sprite);
		foregroundTemp.push(sprite);
	}
	baseTiles.push(tempList);
	foregroundTiles.push(foregroundTemp);
}
var sprites = [];
var collidables = [];

buildMap(levelMaps[0]);
buildMap(levelGameObjects[0]);

//Create the gameWorld and camera objects
var gameWorld = 
{
  x: 0,
  y: 0,
  width: WIDTH,
  height:HEIGHT
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
	backgroundSurface.translate(-camera.x, -camera.y);
	drawingSurface.translate(-camera.x, -camera.y);
	for (var row = Math.floor(camera.y / 64) - 2; row < Math.floor((camera.y + camera.height)/64) + 2; row++)
	{
		for (var column = Math.floor(camera.x / 64) - 2; column < Math.floor((camera.x + camera.width)/64) + 2; column++)
		{
			if (row >= 0 && row < ROWS && column >= 0 && column < COLUMNS)
			{
				var sprite = baseTiles[row][column];
				
				//display the scrolling sprites
				if(sprite.visible && sprite.scrollable)
				{
				 backgroundSurface.drawImage
				 (
				   tilesheet, 
				   sprite.sourceX, sprite.sourceY, 
				   sprite.sourceWidth, sprite.sourceHeight,
				   Math.floor(sprite.x), Math.floor(sprite.y), 
				   sprite.width, sprite.height
				 ); 
				}
				 
				//display the non-scrolling sprites
				if(sprite.visible && !sprite.scrollable)
				{
				 backgroundSurface.drawImage
				 (
				   tilesheet, 
				   sprite.sourceX, sprite.sourceY, 
				   sprite.sourceWidth, sprite.sourceHeight,
				   Math.floor(camera.x + sprite.x), Math.floor(camera.y + sprite.y), 
				   sprite.width, sprite.height
				 ); 
				}
				
				
				var gameObjectMap = levelGameObjects[levelCounter];
				if (gameObjectMap[row][column] != EMPTY)
				{
					var foregroundSprite = foregroundTiles[row][column];
					drawingSurface.drawImage
					 (
					   tilesheet, 
					   foregroundSprite.sourceX, foregroundSprite.sourceY, 
					   foregroundSprite.sourceWidth, foregroundSprite.sourceHeight,
					   Math.floor(foregroundSprite.x), Math.floor(foregroundSprite.y), 
					   foregroundSprite.width, foregroundSprite.height
					 ); 
					
				}
			}
		}		
	}
}

function buildMap(levelMap)
{
  for(var row = 0; row < levelMap.length; row++) 
  {	
    for(var column = 0; column < levelMap[row].length; column++) 
    { 
      var currentTile = levelMap[row][column];
    
      if(currentTile != EMPTY)
      {
        //Find the tile's x and y position on the tile sheet
        var tilesheetX = Math.floor((currentTile - 1) % tilesheetColumns) * SIZE; 
        var tilesheetY = Math.floor((currentTile - 1) / tilesheetColumns) * SIZE;
        
        switch (currentTile)
        {
			case GRASS:
				var grass = Object.create(spriteObject);
				grass.sourceX = tilesheetX;
				grass.sourceY = tilesheetY;
				grass.x = column * SIZE;
				grass.y = row * SIZE;
				baseTiles[row][column] = grass;
				break;
			  
			case TREE:
				var tree = Object.create(spriteObject);
				tree.sourceX = tilesheetX;
				tree.sourceY = tilesheetY;
				tree.sourceWidth = 128;
				tree.sourceHeight = 128;
				tree.x = column * SIZE;
				tree.y = row * SIZE;
				tree.width = 128;
				tree.height = 128;
				foregroundTiles[row][column] = tree;
				collidables.push(tree);
				break;
				
			case WATER:
				var water = Object.create(spriteObject);
				water.sourceX = tilesheetX;
				water.sourceY = tilesheetY;
				water.x = column * SIZE;
				water.y = row * SIZE;
				baseTiles[row][column] = water;
				water.name="water";
				collidables.push(water);
				break;
				
			case ROCK:
				var rock = Object.create(spriteObject);
				rock.sourceX = tilesheetX;
				rock.sourceY = tilesheetY;
				rock.x = column * SIZE;
				rock.y = row * SIZE;
				baseTiles[row][column] = rock;
				collidables.push(rock);
				break;
        }
      }
    }
  }
}

/*
function resetTiles()
{
	for (var i = 0; i < 50; i++)
	{
		var tempList = [];
		var foregroundTemp = [];
		for (var j = 0; j < 75; j++)
		{
			var sprite = Object.create(spriteObject);
			tempList.push(sprite);
			foregroundTemp.push(sprite);
		}
		baseTiles.push(tempList);
		foregroundTiles.push(foregroundTemp);
	}
}
*/

placeObservationEvent();

listOfGameObjectMaps = levelGameObjects;
currentLocation = levelCounter;

cameraLoaded = true;