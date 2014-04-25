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
	
	
	buildInGameMap: function()
	{
		var playerLocation = [
			Math.floor(gameplay.player.x / SIZE),
			Math.floor(gameplay.player.y / SIZE)
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
					var tile = this.pauseMap[row][column];
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
				if (column == playerLocation[0] && row == playerLocation[1])
				{
					tempSprite = this.createSprite(2, column, row);
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
		for(var i = 0; i < this.mapSprites.length; i++)
		{
			utility.drawImage
			(
				menuSurface, imgMapTilesheet, 
				this.mapSprites[i].sourceX, this.mapSprites[i].sourceY, 
				this.mapSprites[i].sourceWidth, this.mapSprites[i].sourceHeight,
				(Math.floor(this.mapSprites[i].x) + 13) * this.mapScale, (Math.floor(this.mapSprites[i].y) + 6) * this.mapScale, 
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
		  case UP:
			if (pause.mapScale < 2)
				pause.mapScale += .2;
			break;
			
		  case DOWN:
			if (pause.mapScale > 1)
				pause.mapScale -= .2;
			break;
		}
	}
}, false);
