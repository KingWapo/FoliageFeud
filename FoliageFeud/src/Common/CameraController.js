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
var TREE = 5;
var BIRCHTREE = 7;
var SKY = 8;
var ENDOFTREES = 11;
var WATERBOUNDRARYBEGIN = 13
var WATERBOUNDRARYEND = 32

// Size of each tile
var SIZE = 64;

//The number of columns on the tilesheet
var tilesheetColumns = 4;

var cameraController = {
	//Game Level Mapsbuil
	//Arrays to store the level maps
	levelCounter: 0,
	tilesheetMain: new Image(),
	tilesheetForest: new Image(),
	tilesheetMarsh: new Image(),
	tilesheetHilly: new Image(),
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
		width: CANVAS_WIDTH,
		height: CANVAS_HEIGHT,
		vx: 0,
		previousX: 0,
		xBounds: .8,
		yBounds: .7,

		//The camera's inner scroll boundaries
		rightInnerBoundary: function()
		{
		return this.x + (this.width * this.xBounds);
		},

		leftInnerBoundary: function()
		{
		return this.x + (this.width * (1 - this.xBounds));
		},

		upperInnerBoundary: function()
		{
		return this.y + (this.height * (1 - this.yBounds));
		},

		lowerInnerBoundary: function()
		{
		return this.y + (this.height * this.yBounds);
		}
	},
	
	init: function()
	{
		//The number of rows and columns
		var curMap = allLevelMaps[gameplay.currentLevel];
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
		gameplay.curMap = allLevelMaps[gameplay.currentLevel];
		gameplay.curObjMap = allObjectMaps[gameplay.currentLevel];
		this.buildMap(gameplay.curMap, 0);
		this.buildMap(gameplay.curObjMap, 1);
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
		
		var tilesheet = this.tilesheetMain;
		if (gameplay.currentLevel == Level.Forest)
		{
			tilesheet = this.tilesheetForest;
		}
		else if (gameplay.currentLevel == Level.Marsh)
		{
			tilesheet = this.tilesheetMarsh;
		}
		else if (gameplay.currentLevel == Level.Hilly)
		{
			tilesheet = this.tilesheetHilly;
		}
		for (var row = Math.floor(this.camera.y / 64) - 2; row < Math.floor((this.camera.y + this.camera.height)/64) + 2; row++)
		{
			for (var column = Math.floor(this.camera.x / 64) - 2; column < Math.floor((this.camera.x + this.camera.width)/64) + 2; column++)
			{
				if (row >= 0 && row < gameplay.curMap.length && column >= 0 && column < gameplay.curMap[0].length)
				{
					var sprite = this.baseTiles[row][column];
					
					//display the scrolling sprites
					currentLevelMap = gameplay.curMap;
					if (currentLevelMap[row][column] != EMPTY)
					{
						if(sprite.visible && sprite.scrollable)
						{
						 utility.drawImage
						 (
						   backgroundSurface, tilesheet, 
						   sprite.sourceX, sprite.sourceY, 
						   sprite.sourceWidth, sprite.sourceHeight,
						   Math.floor(sprite.x), Math.floor(sprite.y), 
						   sprite.width, sprite.height
						 ); 
						}
					}
					 
					var gameObjectMap = gameplay.curObjMap;
					if (currentScreen != ScreenState.WorldEvent)
					{
						if (gameObjectMap[row][column] != EMPTY)
						{
							var foregroundSprite = this.foregroundTiles[row][column];
							try {
							utility.drawImage
							 (
							   gameplaySurface, tilesheet, 
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
		this.ROWS = gameplay.curMap.length;
		this.COLUMNS = gameplay.curMap[0].length;
		
		this.WIDTH = this.COLUMNS * SIZE;
		this.HEIGHT = this.ROWS * SIZE;
		
		this.gameWorld.width = this.WIDTH;
		this.gameWorld.height = this.HEIGHT;
		
		for (var i = 0; i < gameplay.curMap.length; i++)
		{
			var tempList = [];
			var foregroundTemp = [];
			for (var j = 0; j < gameplay.curMap[i].length; j++)
			{
				var sprite = Object.create(spriteObject);
				tempList.push(sprite);
				foregroundTemp.push(sprite);
			}
			this.baseTiles.push(tempList);
			this.foregroundTiles.push(foregroundTemp);
		}
		
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
					}
					if (currentTile == ROCK)
					{
						sprite.name = "rock";
						gameplay.collisionTiles[row][column] = sprite;
					}
				}
				else if (tier == 1) // Object tiles
				{
					if (currentTile == TREE || currentTile == BIRCHTREE)
					{
						if (currentTile == BIRCHTREE)
						{
							sprite.sourceWidth = 64;
							sprite.width = 64;
						}
						else
						{
							sprite.sourceWidth = 128;
							sprite.width = 128;
						}
						sprite.sourceHeight = 128;
						sprite.height = 128;
						sprite.name = "tree";
						this.foregroundTiles[row][column] = sprite;
						gameplay.collisionTiles[row][column] = sprite;
					}
					else
					{
						levelMap[row][column] = EMPTY;
					}
				}
			  }
			}
		}
		this.mapBuilt = true;
	}
	
	
}