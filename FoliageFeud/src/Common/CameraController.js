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
var PRAIREGRASS = 2;
var ROCK = 3;
var TREE = 5;
var BIRCHTREE = 7;
var BIRCHTREETRUNK = 11;
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
				sprite.name = "empty";
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
	
	renderBackground: function()
	{
		//Move the drawing surface so that it's positioned relative to the camera
		backgroundSurface.translate(-this.camera.x * utility.scale, -this.camera.y * utility.scale);
		
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
					if (gameplay.curMap[row][column] != EMPTY && sprite.name != "empty")
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
				}
			}		
		}
	},
	
	renderForeground: function(spritesFromGameplay)
	{
		gameplaySurface.translate(-this.camera.x * utility.scale, -this.camera.y * utility.scale);
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
		
		var theseSprites = spritesFromGameplay;
		var foregroundSpriteCols = [];
		foregroundSpriteCols = this.foregroundTiles.slice(Math.max(0, Math.floor(this.camera.y / 64) - 2), Math.min(Math.floor((this.camera.y + this.camera.height)/64) + 2, gameplay.curMap.length));
		for (var i = 0; i < foregroundSpriteCols.length; i++)
		{
			var spritesWanted = foregroundSpriteCols[i].slice(Math.max(0, Math.floor(this.camera.x / 64) - 2), 
															  Math.min(Math.floor((this.camera.x + this.camera.width)/64) + 2, gameplay.curMap[0].length));
			theseSprites = theseSprites.concat(spritesWanted);
		}
		//console.debug(this.sprites.length);
		//theseSprites = theseSprites.concat(this.sprites);
		var newSprites = utility.reorderArrayByY(theseSprites);
		
		try
		{
			for (var i = 0; i < newSprites.length; i++)
			{
				var currentSprite = newSprites[i];
				if (currentSprite.name == "player")
				{
					utility.drawImage
					(
						gameplaySurface, currentSprite.sprite, 
						currentSprite.sourceX, currentSprite.sourceY + currentSprite.animation * currentSprite.sourceHeight, 
						currentSprite.sourceWidth, currentSprite.sourceHeight,
						Math.floor(currentSprite.x), Math.floor(currentSprite.y), 
						currentSprite.width, currentSprite.height
					
					);
				}
				else if (currentSprite.name == "blue coin" ||
						 currentSprite.name == "gray coin" ||
						 currentSprite.name == "gold coin"  ||
						 currentSprite.name == "teleporter" ||
						 currentSprite.name == "training" ||
						 currentSprite.name == "main camp" ||
						 currentSprite.name == "store" ||
						 currentSprite.name == "plants" ||
						 currentSprite.name == "observation point" ||
						 currentSprite.name == "unicorn" ||
						 currentSprite.name == "dr parsnip" ||
						 currentSprite.name == "botnip")
				{
					utility.drawImage
					(
						gameplaySurface, currentSprite.sprite, 
						currentSprite.sourceX, currentSprite.sourceY, 
						currentSprite.sourceWidth, currentSprite.sourceHeight,
						Math.floor(currentSprite.x), Math.floor(currentSprite.y), 
						currentSprite.width, currentSprite.height
					
					);
				}
				else if (currentSprite.name == "birch tree")
				{
					utility.drawImage
					 (
					   gameplaySurface, tilesheet, 
					   currentSprite.sourceX, currentSprite.sourceY, 
					   currentSprite.sourceWidth, currentSprite.sourceHeight,
					   Math.floor(currentSprite.x), Math.floor(currentSprite.y) - 64, 
					   currentSprite.width, currentSprite.height
					 ); 
				}
				else if (currentSprite.name == "praire grass")
				{
					utility.drawImage
					 (
					   gameplaySurface, tilesheet, 
					   currentSprite.sourceX, currentSprite.sourceY, 
					   currentSprite.sourceWidth, currentSprite.sourceHeight,
					   Math.floor(currentSprite.x), Math.floor(currentSprite.y), 
					   currentSprite.width, currentSprite.height
					 );
				}
				else if (currentSprite.name !== "empty")
				{
					utility.drawImage
					 (
					   gameplaySurface, tilesheet, 
					   currentSprite.sourceX, currentSprite.sourceY, 
					   currentSprite.sourceWidth, currentSprite.sourceHeight,
					   Math.floor(currentSprite.x), Math.floor(currentSprite.y), 
					   currentSprite.width, currentSprite.height
					 ); 
				}
			}
		}
		catch(err){}
	},
	
	buildMap: function(levelMap, tier)
	{
		this.ROWS = gameplay.curMap.length;
		this.COLUMNS = gameplay.curMap[0].length;
		
		this.WIDTH = this.COLUMNS * SIZE;
		this.HEIGHT = this.ROWS * SIZE;
		
		this.gameWorld.width = this.WIDTH;
		this.gameWorld.height = this.HEIGHT;
		this.sprites = [];
		
		if (tier == 0) this.baseTiles = [];
		else if (tier ==1) this.foregroundTiles = [];
		
		for (var i = 0; i < gameplay.curMap.length; i++)
		{
			var tempList = [];
			var foregroundTemp = [];
			for (var j = 0; j < gameplay.curMap[i].length; j++)
			{
				var sprite = Object.create(spriteObject);
				sprite.name = "empty";
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
					if (currentTile == GRASS)
					{
						sprite.name = "grass";
					}
				}
				else if (tier == 1) // Object tiles
				{
					if (currentTile == TREE || currentTile == BIRCHTREETRUNK)
					{
						var hitBox = {
							x: -64,
							y: -64,
							width: 0,
							height: 0
						};
						sprite.sourceHeight = 128;
						sprite.height = 128;
						if (currentTile == BIRCHTREETRUNK)
						{
							sprite.sourceWidth = 64;
							sprite.sourceY -= 64;
							sprite.width = 64;
							hitBox.x = sprite.x + 24;
							hitBox.y = sprite.y + 40;
							hitBox.width = 16;
							hitBox.height = 8;
							sprite.name = "birch tree";
							hitBox.name = "tree";
						}
						else
						{
							sprite.sourceWidth = 128;
							sprite.width = 128;
							hitBox.x = sprite.x + 48;
							hitBox.y = sprite.y + 96;
							hitBox.width = 32;
							hitBox.height = 16;
							sprite.name = "tree";
							hitBox.name = "tree";
						}
						
						//console.debug("Sprite--x: " + sprite.x + ", y: " + sprite.y + ", w: " + sprite.width + ", h: " + sprite.height);
						//console.debug("Hit Box--x: " + hitBox.x + ", y: " + hitBox.y + ", w: " + hitBox.width + ", h: " + hitBox.height);
						this.foregroundTiles[row][column] = sprite;
						gameplay.collisionTiles[row][column] = hitBox;
					}
					else if (currentTile == PRAIREGRASS)
					{
						sprite.name = "praire grass";
						this.foregroundTiles[row][column] = sprite;
						
						//for (var i = 0; i < 1; i++)
						//{
							var tempSprite = Object.create(sprite);
							tempSprite.y += 32;
							this.sprites.push(sprite);
						//}
					}
					else
					{
						//levelMap[row][column] = EMPTY;
					}
				}
			  }
			}
		}
		this.mapBuilt = true;
	}
	
	
}