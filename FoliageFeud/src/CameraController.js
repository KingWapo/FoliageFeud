/*
	Created by Iron Man 2/27/2014
	
	Setting up the functionality behind the camera and
	the parallaxing background for the player to move
	along
	
	Maps will be 75 x 50, 
	the screen is 18 x 8,
	the tiles are 64 x 64
*/

//--- The sprite object
/*
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
*/
//Game Level Maps
//Arrays to store the level maps
var levelMaps = [];
var levelGameObjects = [];

//A level counter
var levelCounter = 0;

//A timer to help delay the change time between levels
var levelChangeTimer = 0;

// First map
/*var map1 = 
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
];*/

var map1 = []
for (var i = 0; i < 50; i++)
{
	var tempList = [];
	for (var j = 0; j < 75; j++)
	{
		if (i == 0 || i == 49 || j == 0 || j == 74)
		{
			tempList.push(6);
		}
		else {
			tempList.push(1);
		}
	}
	map1.push(tempList);
}

levelMaps.push(map1);

/*
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
];*/

var gameObjects1 = [];

for (var i = 0; i < 50; i++)
{
	var tempList = [];
	for (var j = 0; j < 75; j++)
	{
		tempList.push(0);
	}
	gameObjects1.push(tempList);
}

levelGameObjects.push(gameObjects1);


//Map code
var EMPTY = 0;
var GRASS = 1;
var BOX = 2;
var MONSTER = 3;
var STAR = 4;
var ALIEN = 5;
var WALL = 6;

// Size of each tile
var SIZE = 64;

//The number of rows and columns
var ROWS = map1.length;
var COLUMNS = map1[0].length;

//Load the tilesheet image
var tilesheet = new Image();
//tilesheet.addEventListener("load", loadHandler, false);
tilesheet.src = "../img/tilesheet.png";
//assetsToLoad.push(image);

//The number of columns on the tilesheet
var tilesheetColumns = 4;

var WIDTH = COLUMNS * SIZE;
var HEIGHT = ROWS * SIZE;


//Arrays to store the game objects
var baseTiles = [];
for (var i = 0; i < 50; i++)
{
	var tempList = [];
	for (var j = 0; j < 75; j++)
	{
		var sprite = Object.create(spriteObject);
		tempList.push(sprite);
	}
	baseTiles.push(tempList);
}
var sprites = [];
var boxes = [];

buildMap(levelMaps[0]);

//**** Replace with tile map ****//
//Create the foreground sprite
/*
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
	drawingSurface.translate(-camera.x, -camera.y);
	for (var row = Math.floor(camera.y / 64); row < Math.floor((camera.y + camera.height)/64) + 2; row++)
	{
		for (var column = Math.floor(camera.x / 64); column < Math.floor((camera.x + camera.width)/64) + 2; column++)
		{
			if (row < ROWS && column < COLUMNS)
			{
				var sprite = baseTiles[row][column];
				
				//display the scrolling sprites
				if(sprite.visible && sprite.scrollable)
				{
				 drawingSurface.drawImage
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
				 drawingSurface.drawImage
				 (
				   tilesheet, 
				   sprite.sourceX, sprite.sourceY, 
				   sprite.sourceWidth, sprite.sourceHeight,
				   Math.floor(camera.x + sprite.x), Math.floor(camera.y + sprite.y), 
				   sprite.width, sprite.height
				 ); 
				}
			}
		}		
	}
	/*
	if(sprites.length !== 0)
	{
		for(var i = sprites.length - 1; i >= 0; i--)
		{
		  var sprite = sprites[i];
			 
		  //display the scrolling sprites
		  if(sprite.visible && sprite.scrollable)
		  {
			 drawingSurface.drawImage
			 (
			   image, 
			   sprite.sourceX, sprite.sourceY, 
			   sprite.sourceWidth, sprite.sourceHeight,
			   Math.floor(sprite.x), Math.floor(sprite.y), 
			   sprite.width, sprite.height
			 ); 
		   }
			 
		   //display the non-scrolling sprites
		   if(sprite.visible && !sprite.scrollable)
		   {
			 drawingSurface.drawImage
			 (
			   image, 
			   sprite.sourceX, sprite.sourceY, 
			   sprite.sourceWidth, sprite.sourceHeight,
			   Math.floor(camera.x + sprite.x), Math.floor(camera.y + sprite.y), 
			   sprite.width, sprite.height
			 ); 
		   }
		   
		} 
	}
	*/
	/*
	drawingSurface.drawImage
      (
        foreground.sprite, 
        //foreground.sourceX, foreground.sourceY, 
        //foreground.sourceWidth, foreground.sourceHeight,
        Math.floor(foreground.x), Math.floor(foreground.y) 
        //foreground.width, foreground.height
      );
	 */
}

function buildMap(levelMap)
{
  for(var row = 0; row < ROWS; row++) 
  {	
    for(var column = 0; column < COLUMNS; column++) 
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
            //sprites.push(grass);
			baseTiles[row][column] = grass;
            break;
          
          case BOX:
            var box = Object.create(spriteObject);
            box.sourceX = tilesheetX;
            box.sourceY = tilesheetY;
            box.x = column * SIZE;
            box.y = row * SIZE;
            //sprites.push(box);
			baseTiles[row][column] = box;
            boxes.push(box);
            break;
          
          case WALL:
            var wall = Object.create(spriteObject);
            wall.sourceX = tilesheetX;
            wall.sourceY = tilesheetY;            
            wall.x = column * SIZE;
            wall.y = row * SIZE;
			baseTiles[row][column] = wall;
            break;
          
          case MONSTER:
            var monster = Object.create(monsterObject);
            monster.sourceX = tilesheetX;
            monster.sourceY = tilesheetY;
            monster.x = column * SIZE;
            monster.y = row * SIZE;
            //Make the monster choose a random start direction 
            changeDirection(monster)          
            monsters.push(monster);
            sprites.push(monster);
            break; 
          
          case STAR:
            var star = Object.create(spriteObject);
            star.sourceX = tilesheetX;
            star.sourceY = tilesheetY;
            star.sourceWidth = 48;
            star.sourceHeight = 48;
            star.width = 48;  
            star.height = 48;          
            star.x = column * SIZE + 8;
            star.y = row * SIZE + 8;
            stars.push(star);
            sprites.push(star);
            break;
            
          case ALIEN:
            alien = Object.create(spriteObject);
            alien.sourceX = tilesheetX;
            alien.sourceY = tilesheetY;            
            alien.x = column * SIZE;
            alien.y = row * SIZE;
            sprites.push(alien);
            break;
        }
      }
    }
  }
}

placeObservationEvent();

cameraLoaded = true;