/*
	Created by Iron Man 2/27/2014
	
	Setting up the functionality behind the camera and
	the parallaxing background for the player to move
	along
	
	Maps will be 75 x 50, 
	the screen is 18 x 8,
	the tiles are 64 x 64
*/

//Map code
var EMPTY = 0;
var GRASS = 1;
var WATER = 2;
var ROCK = 3;
var SKY = 4;
var TREE = 5;
var BIRCHTREE = 7;
var ENDOFTREES = 12;
var WATERBOUNDRARYBEGIN = 13
var WATERBOUNDRARYEND = 24

// Size of each tile
var SIZE = 64;

//The number of columns on the tilesheet
var tilesheetColumns = 4;

var cameraController = {
	//Game Level Maps
	//Arrays to store the level maps
	levelCounter: 0,
	tilesheet: new Image(),
	baseTiles: [],
	foregroundTiles: [],
	sprites: [],
	ROWS: 0,
	COLUMNS: 0,
	WIDTH: 0,
	HEIGHT: 0,
	mapBuilt: false,
	
	gameWorld: {
		x: 0,
		y: 0,
		width: this.WIDTH,
		height:this.HEIGHT
	},
	
	camera: {
		x: 0,
		y: 0,
		width: gameplayCanvas.width,
		height: gameplayCanvas.height,
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
	},
	
	init: function()
	{
		this.tilesheet.src = "../img/Tiles/tilesheet.png";
		
		//The number of rows and columns
		var curMap = allLevelMaps[this.levelCounter];
		this.ROWS = curMap.length;
		this.COLUMNS = curMap[0].length;
		
		this.WIDTH = this.COLUMNS * SIZE;
		this.HEIGHT = this.ROWS * SIZE;
		
		this.gameWorld.width = this.WIDTH;
		this.gameWorld.height = this.HEIGHT;
		
		
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
			this.baseTiles.push(tempList);
			this.foregroundTiles.push(foregroundTemp);
		}
		
		this.buildMap(allLevelMaps[this.levelCounter], 0);
		this.buildMap(allObjectMaps[this.levelCounter], 1);
	},
	
	update: function()
	{
		//Scroll the camera
		if (gameplay.player.x < this.camera.leftInnerBoundary())
		{
			this.camera.x -= gameplay.player.speed; 
		}
		if (gameplay.player.x + gameplay.player.width > this.camera.rightInnerBoundary())
		{
			this.camera.x += gameplay.player.speed; 
		}
		if (gameplay.player.y < this.camera.upperInnerBoundary())
		{
			this.camera.y -= gameplay.player.speed;
		}
		if (gameplay.player.y + gameplay.player.height > this.camera.lowerInnerBoundary())
		{
			this.camera.y += gameplay.player.speed;
		}

		//The camera's world boundaries
		if (this.camera.x < this.gameWorld.x)
		{
			this.camera.x = this.gameWorld.x;
		}
		if (this.camera.x + this.camera.width > this.gameWorld.x + this.gameWorld.width)
		{
			this.camera.x = this.gameWorld.x + this.gameWorld.width - this.camera.width;
		}
		if (this.camera.y < this.gameWorld.y)
		{
			this.camera.y = this.gameWorld.y;
		}
		if (this.camera.y + this.camera.height > this.gameWorld.y + this.gameWorld.height)
		{
			this.camera.y = this.gameWorld.y + this.gameWorld.height - this.camera.height;
		}
	},
	
	render: function()
	{
		//Move the drawing surface so that it's positioned relative to the camera
		backgroundSurface.translate(-this.camera.x, -this.camera.y);
		gameplaySurface.translate(-this.camera.x, -this.camera.y);
		for (var row = Math.floor(this.camera.y / 64) - 2; row < Math.floor((this.camera.y + this.camera.height)/64) + 2; row++)
		{
			for (var column = Math.floor(this.camera.x / 64) - 2; column < Math.floor((this.camera.x + this.camera.width)/64) + 2; column++)
			{
				//console.debug(row + ", " + column);
				if (row >= 0 && row < this.ROWS && column >= 0 && column < this.COLUMNS)
				{
					var sprite = this.baseTiles[row][column];
					
					//display the scrolling sprites
					try
					{
						if(sprite.visible && sprite.scrollable)
						{
						//console.debug("Source x, y: " + sprite.sourceX + ", " + sprite.sourceY);
						 backgroundSurface.drawImage
						 (
						   this.tilesheet, 
						   sprite.sourceX, sprite.sourceY, 
						   sprite.sourceWidth, sprite.sourceHeight,
						   Math.floor(sprite.x), Math.floor(sprite.y), 
						   sprite.width, sprite.height
						 ); 
						}
					}
					catch(err){ console.debug("Error: " + err);}
					 
					var gameObjectMap = allObjectMaps[gameplay.currentLevel];
					if (currentScreen != ScreenState.WorldEvent)
					{
						if (gameObjectMap[row][column] != EMPTY)
						{
							var foregroundSprite = this.foregroundTiles[row][column];
							try {
							gameplaySurface.drawImage
							 (
							   this.tilesheet, 
							   foregroundSprite.sourceX, foregroundSprite.sourceY, 
							   foregroundSprite.sourceWidth, foregroundSprite.sourceHeight,
							   Math.floor(foregroundSprite.x), Math.floor(foregroundSprite.y), 
							   foregroundSprite.width, foregroundSprite.height
							 ); 
							}
							catch(err){console.debug("Error: " + err);}
						}
					}
				}
			}		
		}
	},
	
	buildMap: function(levelMap, tier)
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
				
				var sprite = Object.create(spriteObject);
				sprite.sourceX = tilesheetX;
				sprite.sourceY = tilesheetY;
				sprite.x = column * SIZE;
				sprite.y = row * SIZE;
				if (tier == 0) // Base tiles
				{
					this.baseTiles[row][column] = sprite;
					if (currentTile >= WATERBOUNDRARYBEGIN && currentTile <= WATERBOUNDRARYEND)
					{
						sprite.name = "water";
						gameplay.collisionTiles[row][column] = sprite;
						//this.collidables.push(sprite);
					}
					if (currentTile == ROCK)
					{
						sprite.name = "rock";
						gameplay.collisionTiles[row][column] = sprite;
						//this.collidables.push(sprite);
					}
				}
				else if (tier == 1) // Object tiles
				{
					if (currentTile == TREE || currentTile == BIRCHTREE)
					{
						sprite.sourceWidth = 128;
						sprite.sourceHeight = 128;
						sprite.width = 128;
						sprite.height = 128;
						sprite.name = "tree";
						this.foregroundTiles[row][column] = sprite;
						gameplay.collisionTiles[row][column] = sprite;
						//this.collidables.push(sprite);
					}
				}
				
				/*
				switch (currentTile)
				{
					case TREE:
						sprite.sourceWidth = 128;
						sprite.sourceHeight = 128;
						sprite.width = 128;
						sprite.height = 128;
						sprite.name = "tree";
						if (row + 1 < levelMap.length && column + 1 < levelMap.length)
						{
							levelMap[row + 1][column] = EMPTY;
							levelMap[row][column + 1] = EMPTY;
							levelMap[row + 1][column + 1] = EMPTY;
						}
						else if (row + 1 < levelMap.length)
						{
							levelMap[row + 1][column] = EMPTY;
						}
						else if (column + 1 < levelMap.length)
						{
							levelMap[row][column + 1] = EMPTY;
						}
						this.foregroundTiles[row][column] = sprite;
						this.collidables.push(sprite);
						break;
					case BIRCHTREE:
						sprite.sourceWidth = 128;
						sprite.sourceHeight = 128;
						sprite.width = 128;
						sprite.height = 128;
						sprite.name = "tree";
						if (row + 1 < levelMap.length && column + 1 < levelMap.length)
						{
							levelMap[row + 1][column] = EMPTY;
							levelMap[row][column + 1] = EMPTY;
							levelMap[row + 1][column + 1] = EMPTY;
						}
						else if (row + 1 < levelMap.length)
						{
							levelMap[row + 1][column] = EMPTY;
						}
						else if (column + 1 < levelMap.length)
						{
							levelMap[row][column + 1] = EMPTY;
						}
						this.foregroundTiles[row][column] = sprite;
						this.collidables.push(sprite);
						break;
					default:
						this.baseTiles[row][column] = sprite;
						break;
					/*case GRASS:
						var grass = Object.create(spriteObject);
						grass.sourceX = tilesheetX;
						grass.sourceY = tilesheetY;
						grass.x = column * SIZE;
						grass.y = row * SIZE;
						this.baseTiles[row][column] = grass;
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
						tree.name="tree";
						this.foregroundTiles[row][column] = tree;
						this.collidables.push(tree);
						break;
						
					case WATER:
						var water = Object.create(spriteObject);
						water.sourceX = tilesheetX;
						water.sourceY = tilesheetY;
						water.x = column * SIZE;
						water.y = row * SIZE;
						this.baseTiles[row][column] = water;
						water.name="water";
						this.collidables.push(water);
						break;
						
					case SKY:
						var sky = Object.create(spriteObject);
						sky.sourceX = tilesheetX;
						sky.sourceY = tilesheetY;
						sky.x = column * SIZE;
						sky.y = row * SIZE;
						this.baseTiles[row][column] = sky;
						sky.name="sky";
						break;
						
					case ROCK:
						var rock = Object.create(spriteObject);
						rock.sourceX = tilesheetX;
						rock.sourceY = tilesheetY;
						rock.x = column * SIZE;
						rock.y = row * SIZE;
						rock.name="rock";
						this.baseTiles[row][column] = rock;
						this.collidables.push(rock);
						break;
				}*/
			  }
			}
		}
		this.mapBuilt = true;
	}
	
	
}