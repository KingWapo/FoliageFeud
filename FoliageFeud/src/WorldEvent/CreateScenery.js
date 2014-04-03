// Script to procedurally generate the scenery for the
// WorldEvent gameplay mode.
// Created by Iron Man on 3/28/2014

var createScenery = {
	trees: [],
	grass: [],
	tilesheet: new Image(),
	treeCount: 10,
	x: 0,
	vx: 5,
	
	init: function()
	{
		for (var i = 0; i < 40; i++)
		{
			if (i < this.treeCount)
			{
				var sprite = Object.create(spriteObject);
				sprite.x = Math.floor(Math.random() * (gameplayCanvas.width - 128)) + 128;
				if (i < this.treeCount/2)
				{
					sprite.y = Math.floor(Math.random() * 40) + gameplay.player.y;
				}
				else
				{
					sprite.y = Math.floor(Math.random() * 20) - 90 + gameplay.player.y;
				}
				sprite.width = 128;
				sprite.height = 128;
				sprite.sourceX = 0;
				sprite.sourceY = 1;
				sprite.sourceWidth = 128;
				sprite.sourceHeight = 128;
				this.trees.push(sprite);
			}
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
		this.tilesheet.src = "../img/Tiles/tilesheet.png";
	},
	
	update: function()
	{
		for (var i = 0; i < this.grass.length; i++)
		{
			if (i < this.treeCount)
			{
				var sprite = this.trees[i];
				if (sprite.x <= -1 * sprite.width)
				{
					sprite.x = Math.floor(Math.random() * 100) + gameplayCanvas.width;
				}
				sprite.x -= this.vx;
			}
			var grassSprite = this.grass[i];
			if (grassSprite.x <= -1 * grassSprite.width)
			{
				grassSprite.x = gameplayCanvas.width;
			}
			grassSprite.x -= this.vx;
		}
	},
	
	render: function()
	{
		for (var i = 0; i < this.grass.length; i++)
		{
			var grassSprite = this.grass[i];
			backgroundSurface.drawImage(
				this.tilesheet,
				grassSprite.sourceX * 64, grassSprite.sourceY * 64,
				grassSprite.sourceWidth, grassSprite.sourceHeight,
				grassSprite.x, grassSprite.y,
				grassSprite.width, grassSprite.height
				);
		}
		for (var i = 0; i < this.trees.length; i++)
		{
			var sprite = this.trees[i]
			if (i < this.treeCount/2)
			{
				gameplaySurface.drawImage(
					this.tilesheet,
					sprite.sourceX * 64, sprite.sourceY * 64,
					sprite.sourceWidth, sprite.sourceHeight,
					sprite.x, sprite.y,
					sprite.width, sprite.height
					);
			}
			else
			{
				backgroundSurface.drawImage(
					this.tilesheet,
					sprite.sourceX * 64, sprite.sourceY * 64,
					sprite.sourceWidth, sprite.sourceHeight,
					sprite.x, sprite.y,
					sprite.width, sprite.height
					);
			}
		}
	}
}