var initialized = false;
var notFound = new Image();
notFound.src = "../img/Buttons/QuestionMark.png";

function init()
{
	var grd = backgroundSurface.createLinearGradient(0, 0, 0, 512);
	grd.addColorStop(0, "darkblue");
	grd.addColorStop(1, "blue");
	
	backgroundSurface.fillStyle = grd;
	backgroundSurface.fillRect(0, 0, 1152, 512);
	
	var grd2 = drawingSurface.createLinearGradient(0, 0, 0, 512);
	grd2.addColorStop(0, "darkgrey");
	grd2.addColorStop(1, "black");
	
	drawingSurface.fillStyle = grd2;
	drawingSurface.fillRect(0, 0, 64 * 4, 512);
	
	for (var i = 0; i < plantList.length; i++)
	{
		var sprite = new Image();
		var x = (128 * (i % 6)) + (64 * 4);
		var y = (128 * Math.floor(i / 12));
		
		if (plantList[i].harvested)
		{
			sprite = plantList[i].sprite;
			
			addItem(x, y, sprite.width, sprite.height, displayPlantInfo);
		}
		else
		{
			sprite = notFound;
			
			addItem(x, y, sprite.width, sprite.height, displayPlantNotFound);
		}
		
		drawingSurface.drawImage
		(
			sprite,
			0, 0, 32, 32, x, y,
			sprite.width, sprite.height
		);
	}
}

function displayPlantInfo(i)
{
	var strings = [];
	
	strings.push("Requested Plant: ".concat(plantList[i].name));
	strings.push("Leaf Type: ".concat(plantList[i].leaf));
	strings.push("Plant Color: ".concat(plantList[i].color));

	writeText(menuSurface, strings, 10, 50, 64 * 4, 20);
}

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