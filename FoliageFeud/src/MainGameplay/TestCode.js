var test = {
	tileSheet: new Image(),
	waterTiles: [],
	map: new Array(8),
	mapTiles: new Array(8),
	
	init: function()
	{
		utility.clearAll();
		this.tileSheet.src = "../img/Tiles/tilesheet.png";
		
		for (var i = 0; i < 8; i++)
		{
			this.map[i] = new Array(18);
			this.mapTiles[i] = new Array(18);
			
			for (var j = 0; j < 18; j++)
			{
				this.map[i][j] = Math.floor(Math.random() * 2) + 1;
			}
		}
		
		for (var i = 0; i < 16; i++)
		{
			this.waterTiles[i] = new Image();
		}

		this.waterTiles[0].src = "../img/Tiles/waterTileICC.png";
		this.waterTiles[1].src = "../img/Tiles/waterTileIML.png";
		this.waterTiles[2].src = "../img/Tiles/waterTileIBC.png";
		this.waterTiles[3].src = "../img/Tiles/waterTileTR.png";
		this.waterTiles[4].src = "../img/Tiles/waterTileIMR.png";
		this.waterTiles[5].src = "../img/Tiles/waterTileTB.png";
		this.waterTiles[6].src = "../img/Tiles/waterTileTL.png";
		this.waterTiles[7].src = "../img/Tiles/waterTileTC.png";
		this.waterTiles[8].src = "../img/Tiles/waterTileITC.png";
		this.waterTiles[9].src = "../img/Tiles/waterTileBR.png";
		this.waterTiles[10].src = "../img/Tiles/waterTileLR.png";
		this.waterTiles[11].src = "../img/Tiles/waterTileMR.png";
		this.waterTiles[12].src = "../img/Tiles/waterTileBL.png";
		this.waterTiles[13].src = "../img/Tiles/waterTileBC.png";
		this.waterTiles[14].src = "../img/Tiles/waterTileML.png";
		this.waterTiles[15].src = "../img/Tiles/waterTileCC.png";
		
		this.waterTest(this.map);
		
		for (var r = 0; r < this.mapTiles.length; r++)
		{
			for (var c = 0; c < this.mapTiles[r].length; c++)
			{
				var sprite = this.mapTiles[r][c];
				
				if (this.map[r][c] === WATER)
				{
					var variant = 0;
					
					if (r > 0 && this.map[r-1][c] === WATER)
						variant += 8;
					if (c < this.map[r].length - 1 && this.map[r][c+1] === WATER)
						variant += 4;
					if (r < this.map.length - 1 && this.map[r+1][c] === WATER)
						variant += 2;
					if (c > 0 && this.map[r][c-1] === WATER)
						variant += 1;
					
					backgroundSurface.drawImage
					(
						this.waterTiles[variant],
						0, 0, 64, 64,
						Math.floor(sprite.x), Math.floor(sprite.y),
						sprite.width, sprite.height
					);
				}
				else
				{
					backgroundSurface.drawImage
					(
						this.tileSheet,
						sprite.sourceX, sprite.sourceY,
						sprite.sourceWidth, sprite.sourceHeight,
						Math.floor(sprite.x), Math.floor(sprite.y),
						sprite.width, sprite.height
					);
				}
			}
		}
	},
	
	waterTest: function(levelMap)
	{
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
				
				switch (currentTile)
				{
					case GRASS:
						var grass = Object.create(spriteObject);
						grass.sourceX = tilesheetX;
						grass.sourceY = tilesheetY;
						grass.x = column * SIZE;
						grass.y = row * SIZE;
						this.mapTiles[row][column] = grass;
						break;
						
					case WATER:
						var water = Object.create(spriteObject);
						water.sourceX = tilesheetX;
						water.sourceY = tilesheetY;
						water.x = column * SIZE;
						water.y = row * SIZE;
						this.mapTiles[row][column] = water;
						break;
				}
			  }
			}
		}
	}
};