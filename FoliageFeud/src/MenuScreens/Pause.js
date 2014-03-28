// Pause Screen script

var pauseMap = [];
	
var mapTilesheet = new Image();
mapTilesheet.src = "../img/MapTilesheet.png";

var mapSprites = [];

var BLANK = 0;
var TREE = 5;

var MAPWIDTH = 15;
var MAPHEIGHT = 10;
	
function buildInGameMap()
{
	var playerLocation = [
		Math.floor(player.x / SIZE),
		Math.floor(player.y / SIZE)
		];
		
	var objective = [
		Math.floor(observationInstance.x / SIZE),
		Math.floor(observationInstance.y / SIZE)
		];
	console.debug("(" + playerLocation[0] + ", " + playerLocation[1] + ")");
	console.debug("(" + objective[0] + ", " + objective[1] + ")");
	pauseMap = listOfGameObjectMaps[currentLocation];
	for (var row = 0; row < ROWS; row++)
	{
		for (var column = 0; column < COLUMNS; column++)
		{
			var tile = pauseMap[row][column];
			var tempSprite;
			if (column == playerLocation[0] && row == playerLocation[1])
			{
				tempSprite = createSprite(2, column, row);
				mapSprites.push(tempSprite);
				console.debug("Player");
			}
			else if (column == objective[0] && row == objective[1])
			{
				tempSprite = createSprite(1, column, row);
				mapSprites.push(tempSprite);
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
						tempSprite = createSprite(0, column, row);
						mapSprites.push(tempSprite);
						break;
					case TREE:
						tempSprite = createSprite(3, column, row);
						mapSprites.push(tempSprite);
						break;
				}
				
			}
		}
	}
}

function createSprite(tile, column, row)
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
}

function pauseRender()
{
	for(var i = 0; i < mapSprites.length; i++)
	{
		menuSurface.drawImage
		(
			mapTilesheet, 
			mapSprites[i].sourceX, mapSprites[i].sourceY, 
			mapSprites[i].sourceWidth, mapSprites[i].sourceHeight,
			Math.floor(mapSprites[i].x) + 13, Math.floor(mapSprites[i].y) + 6, 
			mapSprites[i].width, mapSprites[i].height
		); 
	}
}