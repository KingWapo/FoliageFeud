// Script to procedurally generate the scenery for the
// WorldEvent gameplay mode.
// Created by Iron Man on 3/28/2014

var createScenery = {
	grass: [],
	tilesheet: '',
	x: 0,
	vx: 5,
	treesBack: [],
	treesFront: [],
	lastTreeBackX: 0,
	lastTreeFrontX: 0,
	
	init: function()
	{
		for (var i = 0; i < 40; i++)
		{
			var grassSprite = Object.create(spriteObject);
			grassSprite.y = (Math.floor(i / 20) + 6) * 64;
			grassSprite.x = (Math.floor(i % 20)) * 64;
			grassSprite.width = 64;
			grassSprite.height = 64;
			grassSprite.sourceX = 0;
			grassSprite.sourceY = 0;
			grassSprite.sourceWidth = 64;
			grassSprite.sourceHeight = 64;
			this.grass.push(grassSprite);
		}
	},
	
	update: function()
	{
		for (var i = 0; i < this.grass.length; i++)
		{
			var grassSprite = this.grass[i];
			if (grassSprite.x <= -1 * grassSprite.width)
			{
				grassSprite.x = gameplayCanvas.width;
			}
			grassSprite.x -= this.vx;
		}
		
		for (var i = 0; i < this.treesBack.length; i++)
		{
			this.treesBack[i].x -= this.vx;
		}
		
		for (var i = 0; i < this.treesFront.length; i++)
		{
			this.treesFront[i].x -= this.vx;
		}
		
		this.lastTreeBackX -= this.vx;
		this.lastTreeFrontX -= this.vx;
		
		if (Math.random() * 100 <= 4)
		{
			if (this.lastTreeBackX < CANVAS_WIDTH - 128)
			{
				var sprite = Object.create(spriteObject);
				sprite.x = CANVAS_WIDTH;
				sprite.y = 280 + Math.floor(Math.random() * 8);
				sprite.width = 128;
				sprite.height = 128;
				sprite.sourceX = 0;
				sprite.sourceY = 1;
				sprite.sourceWidth = 128;
				sprite.sourceHeight = 128;
				
				this.lastTreeBackX = CANVAS_WIDTH;
				
				this.treesBack.push(sprite);
			}
		}
		
		if (Math.random() * 100 <= 4)
		{
			if (this.lastTreeFrontX < CANVAS_WIDTH - 128)
			{
				var sprite = Object.create(spriteObject);
				sprite.x = CANVAS_WIDTH;
				sprite.y = 360 + Math.floor(Math.random() * 8);
				sprite.width = 128;
				sprite.height = 128;
				sprite.sourceX = 0;
				sprite.sourceY = 1;
				sprite.sourceWidth = 128;
				sprite.sourceHeight = 128;
				
				this.lastTreeFrontX = CANVAS_WIDTH;
				
				this.treesFront.push(sprite);
			}
		}
	},
	
	render: function()
	{
		for (var i = 0; i < this.grass.length; i++)
		{
			var grassSprite = this.grass[i];
			
			utility.drawImage(backgroundSurface,
				this.tilesheet,
				grassSprite.sourceX * 64, grassSprite.sourceY * 64,
				grassSprite.sourceWidth, grassSprite.sourceHeight,
				grassSprite.x, grassSprite.y,
				grassSprite.width, grassSprite.height
				);
		}
		
		for (var i = 0; i < this.treesBack.length; i++)
		{
			var sprite = this.treesBack[i];
			
			utility.drawImage
			(
				backgroundSurface, this.tilesheet,
				sprite.sourceX * 64, sprite.sourceY * 64,
				sprite.sourceWidth, sprite.sourceHeight,
				sprite.x, sprite.y, sprite.width, sprite.height
			);
		}
		
		for (var i = 0; i < this.treesFront.length; i++)
		{
			var sprite = this.treesFront[i];
			
			utility.drawImage
			(
				gameplaySurface, this.tilesheet,
				sprite.sourceX * 64, sprite.sourceY * 64,
				sprite.sourceWidth, sprite.sourceHeight,
				sprite.x, sprite.y, sprite.width, sprite.height
			);
		}
	},
	
	onExit: function()
	{
		this.treesBack = [];
		this.treesFront = [];
		this.lastTreeBackX = 0;
		this.lastTreeFrontX = 0;
		this.grass = [];
	}
}