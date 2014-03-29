// Pause Screen script

var BLANK = 0;
var TREE = 5;

var MAPWIDTH = 15;
var MAPHEIGHT = 10;

var pause = {
	pauseMap: [],
	mapTilesheet: new Image(),
	mapSprites: [],
	
	
	buildInGameMap: function()
	{
		this.mapTilesheet.src = "../img/Tiles/MapTilesheet.png";
		var playerLocation = [
			Math.floor(gameplay.player.x / SIZE),
			Math.floor(gameplay.player.y / SIZE)
			];
			
		var objective = [
			Math.floor(gameplay.observationInstance.x / SIZE),
			Math.floor(gameplay.observationInstance.y / SIZE)
			];
		console.debug("(" + playerLocation[0] + ", " + playerLocation[1] + ")");
		console.debug("(" + objective[0] + ", " + objective[1] + ")");
		this.pauseMap = cameraController.levelGameObjects[cameraController.levelCounter];
		for (var row = 0; row < cameraController.ROWS; row++)
		{
			for (var column = 0; column < cameraController.COLUMNS; column++)
			{
				var tile = this.pauseMap[row][column];
				var tempSprite;
				if (column == playerLocation[0] && row == playerLocation[1])
				{
					tempSprite = this.createSprite(2, column, row);
					this.mapSprites.push(tempSprite);
				}
				else if (column == objective[0] && row == objective[1])
				{
					tempSprite = this.createSprite(1, column, row);
					this.mapSprites.push(tempSprite);
				}
				else
				{
					// Use the switch for now. Rearrange mapTilesheet
					// to be the same as the regular tilesheet so we can just use:
					//
					// tempSprite = createSprite(tile, column, row);
					// mapSprites.push(tempSprite);
					switch(tile)
					{
						case BLANK:
							tempSprite = this.createSprite(0, column, row);
							this.mapSprites.push(tempSprite);
							break;
						case TREE:
							tempSprite = this.createSprite(3, column, row);
							this.mapSprites.push(tempSprite);
							break;
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
			menuSurface.drawImage
			(
				this.mapTilesheet, 
				this.mapSprites[i].sourceX, this.mapSprites[i].sourceY, 
				this.mapSprites[i].sourceWidth, this.mapSprites[i].sourceHeight,
				Math.floor(this.mapSprites[i].x) + 13, Math.floor(this.mapSprites[i].y) + 6, 
				this.mapSprites[i].width, this.mapSprites[i].height
			); 
		}
	}
}