// Created by Batman
// transitions between game modes

var vs =
{
	transitioning: false,
	step: 0,
	speed: 64,
	xpc: -CANVAS_WIDTH,
	ypc: 0,
	xnme: CANVAS_WIDTH,
	ynme: 0,
	imgNME: '',
	toGamemode: -1,
	
	init: function(gamemode)
	{
		this.transitioning = true;
		this.step = 0;
		this.xpc = -CANVAS_WIDTH;
		this.xnme = CANVAS_WIDTH;
		this.toGamemode = gamemode;
		
		switch(gamemode)
		{
			case ScreenState.WorldEvent:
				this.imgNME = imgVsBotnip;
				break;
		}
	},
	
	render: function()
	{
		utility.drawImage(
			menuSurface, this.imgNME,
			0, 0, this.imgNME.width, this.imgNME.height,
			this.xnme - Math.min(this.step * this.speed, CANVAS_WIDTH), this.ynme, this.imgNME.width, this.imgNME.height
		);
		utility.drawImage(
			menuSurface, imgVsPlayer,
			0, 0, imgVsPlayer.width, imgVsPlayer.height,
			this.xpc + Math.min(this.step * this.speed, CANVAS_WIDTH), this.ypc, imgVsPlayer.width, imgVsPlayer.height
		);
		
		this.step += 1;
		
		if (this.step > (CANVAS_WIDTH / this.speed) + 45)
			this.endTransition();
	},
	
	endTransition: function()
	{
		this.transitioning = false;
		currentScreen = this.toGamemode;
	}
};