// Script to procedurally generate the scenery for the
// WorldEvent gameplay mode.
// Created by Iron Man on 3/28/2014

var createScenery = {
	scenerySprites: [],
	
	init: function()
	{
		for (var i = 0; i < 5; i++)
		{
			var sprite = Object.create(spriteObject);
			sprite.x = Math.floor(Math.random() * (gameplayCanvas.width - 128)) + 128;
			sprite.y = Math.floor(Math.random() * 20) - 10 + gameplay.player.y;
			sprite.width = 128;
			sprite.height = 128;
		}
	}
	
	update: function()
	{
	},
	
	render: function()
	{
	}
}