// Script to play the world events mode. 
// Created by Iron Man on 3/25/2014

var worldEvent = {
	worldEventMap: [
	   //1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20
		[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // 1
		[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // 2
		[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // 3
		[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // 4
		[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // 5
		[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // 6
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 7
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]  // 8
	],
	
	xMovement: 0,
	playerVars: [],
	cameraPosition: [],
	offset: 10,
	
	wall: {
		x: 0,
		width: 128,
		sprite: new Image()
	},
	
	init: function()
	{
		this.playerVars = [gameplay.player.x, gameplay.player.y, gameplay.player.speed, gameplay.player.animation];
		this.cameraPosition = [cameraController.camera.x, cameraController.camera.y];
		
		cameraController.buildMap(this.worldEventMap);
		
		cameraController.camera.x = 0;
		cameraController.camera.y = 0;
		
		gameplay.player.x = 5 * gameplay.player.width;
		gameplay.player.y = 5 * gameplay.player.height + this.offset;
		gameplay.player.speed = gameplay.player.runSpeed;
		gameplay.player.animation = Animation.WorldEventRight;
		
		this.wall.sprite.src = "../img/WorldEvent/WALL.png";
		
		createScenery.init();
	},
	
	onExit: function()
	{
		gameplay.player.x = this.playerVars[0];
		gameplay.player.y = this.playerVars[1];
		gameplay.player.walkSpeed = this.playerVars[2];
		gameplay.player.animation = this.playerVars[3];
		cameraController.camera.x = this.cameraPosition[0];
		cameraController.camera.y = this.cameraPosition[1];
		
		
		
		currentScreen = ScreenState.Gameplay;
	},
	
	update: function()
	{
		gameplay.player.updateAnimation();
		createScenery.update();
	},
	
	render: function()
	{
		gameplay.render();
		cameraController.render();
		
		createScenery.render();
		
		gameplaySurface.drawImage(
			this.wall.sprite,
			this.wall.x, 0
		);
		
	}

}
