// Pause Screen script

var BLANK = 0;
var TREE = 5;

var MAPWIDTH = 15;
var MAPHEIGHT = 10;

var pause = {
	pauseMap: [],
	pauseObjectMap: [],
	mapTilesheet: new Image(),
	mapSprites: [],
	mapScale: 1,
	mapScaleSpeed: .2,
	mapXOffset: 13,
	mapYOffset: 6,
	mapPanSpeed: 10,
	
	
	buildInGameMap: function()
	{
		var teleporterLocation = [
			Math.floor(gameplay.teleporter.x / SIZE),
			Math.floor(gameplay.teleporter.y / SIZE)
			];
		var objectives = [];
		for (var i = 0; i < gameplay.observationInstances.length; i++)
		{
			objectives.push([
				Math.floor(gameplay.observationInstances[i].x / SIZE),
				Math.floor(gameplay.observationInstances[i].y / SIZE)
				]);
			//console.debug("(" + objectives[i][0] + ", " + objectives[i][1] + ")");
		}
		//console.debug("(" + playerLocation[0] + ", " + playerLocation[1] + ")");
		this.pauseMap = allLevelMaps[gameplay.currentLevel];
		this.pauseObjectMap = allObjectMaps[gameplay.currentLevel];
		for (var row = 0; row < cameraController.ROWS; row++)
		{
			for (var column = 0; column < cameraController.COLUMNS; column++)
			{
				var tile = this.pauseObjectMap[row][column];
				if (tile != TREE && tile != BIRCHTREE)
				{
					tile = this.pauseMap[row][column];
				}
				var tempSprite;
				var objective = false;
				for (var i = 0; i < objectives.length; i++)
				{
					if (column == objectives[i][0] && row == objectives[i][1])
					{
						tempSprite = this.createSprite(1, column, row);
						this.mapSprites.push(tempSprite);
						objective = true;
					}
				}
				if (column == teleporterLocation[0] && row == teleporterLocation[1])
				{
					tempSprite = this.createSprite(5, column, row);
					this.mapSprites.push(tempSprite);
				}
				else if (!objective)
				{
					switch(tile)
					{
						case GRASS:
							tempSprite = this.createSprite(0, column, row);
							this.mapSprites.push(tempSprite);
							break;
						case TREE:
						case BIRCHTREE:
							tempSprite = this.createSprite(3, column, row);
							this.mapSprites.push(tempSprite);
							break;
						case ROCK:
							tempSprite = this.createSprite(6, column, row);
							this.mapSprites.push(tempSprite);
							break;
					}
					if (tile >= WATERBOUNDRARYBEGIN && tile <= WATERBOUNDRARYEND)
					{
						tempSprite = this.createSprite(4, column, row);
						this.mapSprites.push(tempSprite);
					}
				}
			}
		}
	},
	
	createSprite: function(tile, column, row)
	{
		var mapTile = Object.create(spriteObject);
		mapTile.sourceX = tile * MAPWIDTH;
		mapTile.sourceY = 0;
		mapTile.sourceWidth = MAPWIDTH;
		mapTile.sourceHeight = MAPHEIGHT;
		mapTile.x = column * MAPWIDTH;
		mapTile.y = row * MAPHEIGHT;
		mapTile.width = MAPWIDTH;
		mapTile.height = MAPHEIGHT;
		
		return mapTile;
	},
	
	render: function()
	{
		if (moveLeft && !moveRight)
			pause.mapXOffset -= pause.mapPanSpeed;
		else if (moveRight && !moveLeft)
			pause.mapXOffset += pause.mapPanSpeed;
		if (moveUp && !moveDown)
			pause.mapYOffset -= pause.mapPanSpeed;
		else if (moveDown && !moveUp)
			pause.mapYOffset += pause.mapPanSpeed;
			
		pause.mapXOffset = utility.clamp(pause.mapXOffset, CANVAS_WIDTH - ((pause.pauseObjectMap[0].length * 15) * pause.mapScale) - 14, 13);
		pause.mapYOffset = utility.clamp(pause.mapYOffset, CANVAS_HEIGHT - ((pause.pauseObjectMap.length * 10) * pause.mapScale) - 6, 6);
		
		for(var i = 0; i < this.mapSprites.length; i++)
		{
			utility.drawImage
			(
				menuSurface, imgMapTilesheet, 
				this.mapSprites[i].sourceX, this.mapSprites[i].sourceY, 
				this.mapSprites[i].sourceWidth, this.mapSprites[i].sourceHeight,
				(Math.floor(this.mapSprites[i].x) * this.mapScale) + this.mapXOffset, (Math.floor(this.mapSprites[i].y) * this.mapScale) + this.mapYOffset, 
				this.mapSprites[i].width * this.mapScale, this.mapSprites[i].height * this.mapScale
			); 
		}
	}
}

window.addEventListener("keyup", function(event)
{
	if (gameplay.onPause)
	{
		switch(event.keyCode)
		{   
			case 88: // x
				if (pause.mapScale < 2)
					pause.mapScale += pause.mapScaleSpeed;
				break;
			
			case 90: // z
				if (pause.mapScale > 1)
					pause.mapScale -= pause.mapScaleSpeed;
				break;
		}
	}
}, false);
