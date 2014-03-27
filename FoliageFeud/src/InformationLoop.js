// Created by Batman

// Information Screen

// Variables
var initialized = false;
var notFound = new Image();
notFound.src = "../img/Buttons/QuestionMark.png";
var tileSize = 64;

// Initialize info wall
function init()
{
	// Blue gradient bg
	var grd = backgroundSurface.createLinearGradient(0, 0, 0, 512);
	grd.addColorStop(0, "darkblue");
	grd.addColorStop(1, "blue");
	
	backgroundSurface.fillStyle = grd;
	backgroundSurface.fillRect(0, 0, 1152, 512);
	
	// Grey side panel
	var grd2 = drawingSurface.createLinearGradient(0, 0, 0, 512);
	grd2.addColorStop(0, "darkgrey");
	grd2.addColorStop(1, "black");
	
	drawingSurface.fillStyle = grd2;
	drawingSurface.fillRect(0, 0, 64 * 4, 512);
	
	// Display appropriate sprite for each plant
	for (var i = 0; i < plantList.length; i++)
	{
		var sprite = new Image();
		var x = (tileSize * (i % 11)) + (tileSize * 4) + (4 * i) + 4;
		var y = ((tileSize + 4) * Math.floor(i / 11)) + 4;
		
		if (plantList[i].harvested)
		{
			sprite = plantList[i].sprite;
			
			addItem(x, y, tileSize, tileSize, displayPlantInfo);
		}
		else
		{
			sprite = notFound;
			
			addItem(x, y, tileSize, tileSize, displayPlantNotFound);
		}
		
		drawingSurface.drawImage
		(
			sprite,
			0, 0, sprite.width, sprite.height, x, y,
			tileSize, tileSize
		);
	}
}

// Display plant info if harvested
function displayPlantInfo(i)
{
	var strings = [];
	
	strings.push("Requested Plant: ".concat(plantList[i].name));
	strings.push("Leaf Type: ".concat(plantList[i].leaf));
	strings.push("Plant Color: ".concat(plantList[i].color));

	writeText(menuSurface, strings, 10, 50, 64 * 4, 20);
	
	menuSurface.drawImage(
		plantList[i].sprite, 0, 0,
		plantList[i].sprite.width, plantList[i].sprite.height,
		0, 256, 256, 256);
}

// Display unharvested text
function displayPlantNotFound(i)
{
	var strings = [];
	
	strings.push("This plant has not been found yet.");
	strings.push("To find this plant, explore more regions.");
				 
	writeText(menuSurface, strings, 10, 50, 64 * 4, 20);
}

// Nothing to update
function update()
{
}

// Initializes if newly loaded, nothing otherwise
function render()
{
	if (!initialized)
	{
		clearClickHandler();
		
		drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
		init();
		initialized = true;
	}
}

loadScreens();