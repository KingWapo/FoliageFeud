// Pause Screen script

var pauseMap = [];

var playerLocation = [
	Math.floor(player.x / WIDTH),
	Math.floor(player.y / HEIGHT)
	];
	
var objective = [
	Math.floor(observationInstance.x / WIDTH),
	Math.floor(observationInstance.y / HEIGHT)
	];
	
var mapTilesheet = new Image();
mapTilesheet.src = "../img/MapTilesheet.png";

var mapSprites = [];

var BLANK = 0;

var MAPWIDTH = 15;
var MAPHEIGHT = 10;
	
function buildInGameMap()
{
	pauseMap = listOfGameObjectMaps[currentLocation];
	for (var row = 0; row < ROWS; row++)
	{
		for (var column = 0; column < COLUMNS; column++)
		{
			var tile = pauseMap[row][column];
			if (column == playerLocation[0] && row == playerLocation[1])
			{
				mapSprites.push(createSprite(2, column, row));
			}
			else if (column == objective[0] && row == objective[0])
			{
				mapSprites.push(createSprite(1, column, row));
			}
			else
			{
				switch(tile)
				{
					case BLANK:
						mapSprites.push(createSprite(0, column, row));
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
	for(var sprite in mapSprites)
	{
		console.debug("Enter Rendering");
		drawingSurface.drawImage
		(
			mapTilesheet, 
			sprite.sourceX, sprite.sourceY, 
			sprite.sourceWidth, sprite.sourceHeight,
			Math.floor(sprite.x), Math.floor(sprite.y), 
			sprite.width, sprite.height
		); 
	}
}