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
				var playerMapSprite = Object.create(spriteObject);
				playerMapSprite.sourceX = 2;
				playerMapSprite.x = column * MAPWIDTH;
				playerMapSprite.y = row * MAPHEIGHT;
				mapSprites.push(playerMapSprite);
			}
			else if (column == objective[0] && row == objective[0])
			{
				var objectiveMapSprite = Object.create(spriteObject);
				objectiveMapSprite.sourceX = 1;
				objectiveMapSprite.x = column * MAPWIDTH;
				objectiveMapSprite.y = row * MAPHEIGHT;
				mapSprites.push(objectiveMapSprite);
			}
			else
			{
				switch(tile)
				{
					case BLANK:
						var grass = Object.create(spriteObject);
						grass.sourceX = 0;
						grass.sourceY = 0;
						grass.x = column * MAPWIDTH;
						grass.y = row * MAPHEIGHT;
						mapSprites.push(grass);
						break;
				}
			}
		}
	}
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