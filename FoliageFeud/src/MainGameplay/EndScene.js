// Script to play the final boss fight against Dr. Parsnip!

Games = {
	ISPY: 0,
	MATCHING: 1,
	WORLDEVENT: 2
}


var endScene = {
	
	checkpoint: Games.ISPY,
	plantsNeeded: 10,
	
	phrases: [
		["You have been ruining my plans for long enough! This time, let's see if you can beat me in a game of wits!"], // Talk before ispy
		["Gahh! You haven't beaten me yet! You may be smarter than me, but are you quicker?!?!"], // Talk before matching
		["Nooooo....I am defeated..."], // Talk before fiancee
		[],
		["MAAAAASSTTEEEEEERRR!!!!!!!!"], // Talk before explosion
		[]
	],
	
	overallIndex: 0,
	
	
	parsnip: {
		// Sprite Located on sheet
		sourceX: 0,
		sourceY: 0,
		sourceWidth: 64,
		sourceHeight: 64,
		
		// Animation info
		numOfFrames: 9,
		currentFrame: 0,
		
		//Update Animation Function
		updateAnimation: function()
		{
			if (this.animation !== Animation.Idle)
			{
				this.sourceX = this.currentFrame * this.sourceWidth;
				
				this.currentFrame += 1;
				if ( this.currentFrame === this.numOfFrames ) {
					this.currentFrame = 0;
				}
			}
		},
		
		// Gameplay info
		x: -64,
		y: -64,
		width: 64,
		height: 64,
		vx: 0,
		vy: 0,
		speed: 16,
		walkSpeed: 8,
		runSpeed: 8,
		visible: false,
		sprite: '',
		name: "dr parsnip",
		animation: Animation.Left
	},
	
	fiancee: {
		// Sprite Located on sheet
		sourceX: 0,
		sourceY: 0,
		sourceWidth: 64,
		sourceHeight: 64,
		
		// Animation info
		numOfFrames: 9,
		currentFrame: 0,
		
		//Update Animation Function
		updateAnimation: function()
		{
			if (this.animation !== Animation.Idle)
			{
				this.sourceX = this.currentFrame * this.sourceWidth;
				
				this.currentFrame += 1;
				if ( this.currentFrame === this.numOfFrames ) {
					this.currentFrame = 0;
				}
			}
		},
		
		// Gameplay info
		x: -64,
		y: -64,
		width: 64,
		height: 64,
		vx: 0,
		vy: 0,
		speed: 4,
		walkSpeed: 4,
		runSpeed: 8,
		visible: false,
		sprite: '',
		name: "fiancee",
		animation: Animation.Left
	},
	
	botnip: {
		// Sprite Located on sheet
		sourceX: 0,
		sourceY: 0,
		sourceWidth: 64,
		sourceHeight: 64,
		
		// Animation info
		numOfFrames: 2,
		currentFrame: 0,
		
		//Update Animation Function
		updateAnimation: function()
		{
			if (this.animation !== Animation.Idle)
			{
				this.sourceX = this.currentFrame * this.sourceWidth;
				
				this.currentFrame += 1;
				if ( this.currentFrame === this.numOfFrames ) {
					this.currentFrame = 0;
				}
			}
		},
		
		// Gameplay info
		x: -64,
		y: -64,
		width: 64,
		height: 64,
		vx: 0,
		vy: 0,
		speed: 24,
		sprite: new Image(),
		name: "botnip",
		animation: Animation.Idle
	},
	
	init: function()
	{
		cameraController.x = 0;
		cameraController.y = 0;
		cameraController.buildMap(endscene, 0);
		
		gameplay.player.animation = Animation.Right;
		gameplay.player.x = 256;
		gameplay.player.y = (CANVAS_HEIGHT - gameplay.player.height) / 2;
		
		this.parsnip.animation = Animation.Left;
		this.parsnip.x = CANVAS_WIDTH - 256;
		this.parsnip.y = (CANVAS_HEIGHT - this.parsnip.height) / 2;
		this.parsnip.sprite = imgParsnipSprite;
		
		this.fiancee.animation = Animation.Left;
		this.fiancee.x = CANVAS_WIDTH - 188;
		this.fiancee.y = (CANVAS_HEIGHT - this.fiancee.height) / 2 - 128;
		this.fiancee.sprite = imgMaleSprite;
		
		this.botnip.animation = Animation.Right;
		this.botnip.x = -64;
		this.botnip.y = this.fiancee.y;
		this.botnip.sprite = imgBotnipSprite;
		
	},
	
	update: function()
	{
		this.parsnip.updateAnimation();
	},
	
	render: function()
	{
		cameraController.renderBackground();
		utility.drawImage
		(
			gameplaySurface, gameplay.player.sprite, 
			gameplay.player.sourceX, gameplay.player.sourceY + gameplay.player.animation * gameplay.player.sourceHeight, 
			gameplay.player.sourceWidth, gameplay.player.sourceHeight,
			Math.floor(gameplay.player.x), Math.floor(gameplay.player.y), 
			gameplay.player.width, gameplay.player.height
		
		);
		utility.drawImage
		(
			gameplaySurface, this.parsnip.sprite, 
			this.parsnip.sourceX, this.parsnip.sourceY + this.parsnip.animation * this.parsnip.sourceHeight, 
			this.parsnip.sourceWidth, this.parsnip.sourceHeight,
			Math.floor(this.parsnip.x), Math.floor(this.parsnip.y), 
			this.parsnip.width, this.parsnip.height
		
		);
		utility.drawImage
		(
			gameplaySurface, this.fiancee.sprite, 
			this.fiancee.sourceX, this.fiancee.sourceY + this.fiancee.animation * this.fiancee.sourceHeight, 
			this.fiancee.sourceWidth, this.fiancee.sourceHeight,
			Math.floor(this.fiancee.x), Math.floor(this.fiancee.y), 
			this.fiancee.width, this.fiancee.height
		
		);
		utility.drawImage
		(
			gameplaySurface, this.botnip.sprite, 
			this.botnip.sourceX, this.botnip.sourceY, 
			this.botnip.sourceWidth, this.botnip.sourceHeight,
			Math.floor(this.botnip.x), Math.floor(this.botnip.y), 
			this.botnip.width, this.botnip.height
		
		);
		if (this.overallIndex != 3)
		{
			utility.drawTextBox(this.phrases[this.overallIndex], 880, endScene.playGame);
		}
		else
		{
			this.playGame();
		}
		
		if (vs.transitioning)
			vs.render();
	},
	
	playGame: function()
	{
		switch (endScene.overallIndex)
		{
			case 0:
				console.debug("Playing Ispy");
				endScene.overallIndex += 1;
				ispy.fromEnd = true;
				vs.init(ScreenState.Observation);
				break;
			case 1:
				console.debug("Playing Matching");
				endScene.overallIndex += 1;
				matching.fromEnd = true;
				vs.init(ScreenState.Matching);
				break;
			case 2:
				endScene.overallIndex += 1;
			case 3:
				console.debug("Fiancee released");
				if (endScene.parsnip.x < CANVAS_WIDTH)
				{
					endScene.parsnip.animation = Animation.Right;
					endScene.parsnip.x += endScene.parsnip.speed;
				}
				else if (!utility.collisionDetection(gameplay.player, endScene.fiancee))
				{
					var vx = endScene.fiancee.x - gameplay.player.x;
					var vy = endScene.fiancee.y - gameplay.player.y;
					if (vx > 0)
					{
						gameplay.player.x += gameplay.player.speed;
					}
					else if (vx < 0)
					{
						gameplay.player.x -= gameplay.player.speed;
					}
					if (vy < 0)
					{
						gameplay.player.y -= gameplay.player.speed;
					}
					gameplay.player.updateAnimation();
				}
				else
				{
					endScene.overallIndex += 1;
				}
				break;
			case 4:
				endScene.overallIndex += 1;
				break;
			case 5:
				console.debug("Playing World Event");
				if (!utility.collisionDetection(gameplay.player, endScene.botnip))
				{
					endScene.botnip.x += endScene.botnip.speed;
				}
				else if (!vs.transitioning)
				{
					worldEvent.fromEnd = true;
					vs.init(ScreenState.WorldEvent);
				}
				break;
		}
	}
};

/*
	Build generic map, Opposite gender in cage, Parsnip in front, Convo between the two, at the end of convo game played. Rinse and Repeat:
		Game 1: The ispy mode. (Possibly have to identify more than parsnip). Game of wits.
		Game 2: The matching mode. (Beat him again?) Game of speed.
		Game 3: Parsnip blows up, and world event is played with you and your fiancee for a longer period of time (must get off edge of screen, then you run to teleporter and to safety).
*/