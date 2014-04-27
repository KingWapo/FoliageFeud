// Created by Iron Man

// The main gameplay class

// Enum to determine the animation to be played
Animation = {
	Idle: 0,
	Right: 1,
	Left: 2,
	Down: 3,
	Up: 4,
	WorldEventRight: 5,
	SwimmingRight: 6,
	SwimmingLeft: 7,
	SwimmingDown: 8,
	SwimmingUp: 9
};

Level = {
	Tutorial: 0,
	BaseCamp: 1,
	Map1: 2,
	Forest: 3,
	Marsh: 4,
	Hilly: 5,
	writting:false,
}

//Arrow key codes
var LEFT = 37;
var UP = 38;
var RIGHT = 39;
var DOWN = 40;
var ENTER = 13;

//Directions
var moveLeft = false;
var moveUp = false;
var moveRight = false;
var moveDown = false;

var gameplay = {
	mapOrientation: 0,
	mapBuilt: false,
	onPause: false,
	collisionTiles: [],
	currentLevel: Level.Tutorial,
	oneShotObservation: false,
	canTeleport: false,
	onMainCamp: false,
	onTeleport: false,
	onTraining: false,
	onPlants: false,
	writting:false,
	trainning:true,
	swimming: false,
	curMap: [],
	curObjMap: [],
	teleporterCoords: [],
	obsCoords: [],
	gold:0,
	
	// Buildings
	store: Object.create(spriteObject),
	mainCamp: Object.create(spriteObject),
	training: Object.create(spriteObject),
	plants: Object.create(spriteObject),

	player: {
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
		x: 192,
		y: 256,
		width: 64,
		height: 64,
		vx: 0,
		vy: 0,
		speed: 4,
		walkSpeed: 4,
		runSpeed: 8,
		sprite: '',
		name: "player",
		animation: Animation.Idle
	}, 
	
	observationInstance: {
		sourceX: 0,
		sourceY: 0,
		sourceWidth: 64,
		sourceHeight: 64,
		
		numOfFrames: 30,
		currentFrame: 0,

		
		//Update Animation Function
		updateAnimation: function()
		{
			this.sourceX = this.currentFrame * this.sourceWidth;
				
			this.currentFrame += 1;
			if ( this.currentFrame === this.numOfFrames ) {
				this.currentFrame = 0;
			}
			
			if (this.atLowestPos === true)
			{
				this.vy = -12;
				this.atLowestPos = false;
			}
			
			if (this.atLowestPos === false && this.vy < 12)
			{
				this.vy += this.gravity;
			}
			
			this.y += this.vy;
			
			if (this.y >= this.lowestPos)
			{
				this.y = this.lowestPos;
				this.vy = 0;
				this.atLowestPos = true;
			}
		},
		
		x: -64,
		y: 0,
		vy: 0,
		width: 64,
		height: 64,
		gravity: 2,
		lowestPos: 0,
		atLowestPos: true,
		name: "observation point",
		sprite: ''
	},
	
	observationInstances: [],
	
	blueCoin: {
		sourceX: 0,
		sourceY: 0,
		sourceWidth: 64,
		sourceHeight: 64,
		numOfFrames: 10,
		currentFrame: 0,
		visible: true,
		update:0,
		updateAnimation: function()
		{
				if(this.update===0)
				{
						this.sourceX = this.currentFrame * this.sourceWidth;
				
						this.currentFrame += 1;
						
					if ( this.currentFrame === this.numOfFrames )
					 {
						this.currentFrame = 0;	
					 }
						
				}
		this.update = (this.update+1)%2;
		},
		x: 20,
		y: 20,
		width: 64,
		height: 64,
		name: "blue coin",
		sprite: ''
		
	},
	grayCoin: {
		sourceX: 0,
		sourceY: 0,
		sourceWidth: 64,
		sourceHeight: 64,
		numOfFrames: 10,
		currentFrame: 0,
		visible: true,
		update:0,
		updateAnimation: function()
		{
			if(this.update===0)
			{
				this.sourceX = this.currentFrame * this.sourceWidth;
			
				this.currentFrame += 1;
					
				if ( this.currentFrame === this.numOfFrames )
				{
					this.currentFrame = 0;	
				}
					
			}
			this.update = (this.update + 1) % 2;
		},
		x: 20,
		y: 20,
		width: 64,
		height: 64,
		name: "gray coin",
		sprite: ''
	},
	speedCoin: {
		sourceX: 0,
		sourceY: 0,
		sourceWidth: 64,
		sourceHeight: 64,
		numOfFrames: 10,
		currentFrame: 0,
		visible: true,
		update:0,
		updateAnimation: function()
		{
			if(this.update===0)
			{
				this.sourceX = this.currentFrame * this.sourceWidth;
			
				this.currentFrame += 1;
					
				if ( this.currentFrame === this.numOfFrames )
				{
					this.currentFrame = 0;	
				}
					
			}
			this.update = (this.update+1)%2;
		},
		x: 100,
		y: 100,
		width: 64,
		height: 64,
		
		sprite: ''
	},
	teleporter: {
	
		visible: true,
		sourceX: 0,
		sourceY: 0,
		sourceWidth:128,
		sourceHeight:128,
		numOfFrames: 16,
		currentFrame: 0,
		update:0,
		updateAnimation: function()
		{
			if(this.update===0)
			{
				this.sourceX = this.currentFrame * this.sourceWidth;
			
				this.currentFrame += 1;
					
				if ( this.currentFrame === this.numOfFrames )
				{
					this.currentFrame = 0;	
				}
					
			}
			this.update = (this.update+1)%2;
		},
		x: 0,
		y: 0,
		width: 128,
		height: 128,	
		name: "teleporter",
		sprite: '',
		
		hitbox: {
			x: 0,
			y: 0,
			width: 128,
			height: 128
		}
		
	},
	
	
	
	init: function()
	{
		utility.clearAll();
		
		console.debug("Map Orientation: " + this.mapOrientation);
		
		// Initialize collisions
		var collider = {
			x: -64,
			y: -64,
			width: 0,
			height: 0
		};
		for (var i = 0; i < 50; i++)
		{
			var tempCollision = [];
			for (var j = 0; j < 75; j++)
			{
				var colliderObject = Object.create(collider);
				tempCollision.push(colliderObject);
			}
			gameplay.collisionTiles.push(tempCollision);
		}
		cameraController.init();
		//place the coins and objects 
		this.placeObservationEvent();
		this.placeBlue();
		this.placeGray();
		this.placeSpeed();
		
		this.teleporter.x=1000;
		this.teleporter.y=300;
		this.teleporter.hitbox.x = this.teleporter.x;
		this.teleporter.hitbox.y = this.teleporter.y + 64;
		this.teleporter.hitbox.width = this.teleporter.width;
		this.teleporter.hitbox.height = this.teleporter.height / 2;
		
		// Init the stores
		this.training.width = 128;
		this.training.height = 256;
		this.training.sourceWidth = 128;
		this.training.sourceHeight = 256;
		this.training.name = "training";
	
		this.store.width = 128;
		this.store.height = 256;
		this.store.sourceWidth = 128;
		this.store.sourceHeight = 256;
		this.store.name = "store";
		
		this.plants.width = 128;
		this.plants.height = 256;
		this.plants.sourceWidth = 128;
		this.plants.sourceHeight = 256;
		this.plants.name = "plants";
		
		this.mainCamp.width = 128;
		this.mainCamp.height = 256;
		this.mainCamp.sourceWidth = 128;
		this.mainCamp.sourceHeight = 256;
		this.mainCamp.name = "main camp";
		
		this.updateSprite();
		
		moveUp = false;
		moveDown = false;
		moveLeft = false;
		moveRight = false;
	},
	
	updateSprite: function()
	{
		switch(currentSprite)
		{
			case SpriteState.Boy:
				this.player.sprite = imgMaleSprite;
			break;
			
			case SpriteState.Girl:
				this.player.sprite = imgFemaleSprite;
			break;	
		}
	},
	
	collide: function()
	{
		if (moveRight || moveLeft)
		{
			this.player.x = this.player.x-this.player.vx;
		}
		if (moveUp || moveDown)
		{
			this.player.y = this.player.y-this.player.vy;
		}
	},
	
	message: function(name)
	{
		var strings = [];
		this.writtingClear();
		this.writting=true;
		if(name === "water" )
		{	
			if( cameraController.levelCounter ===0)
			
				strings.push("Beware you dont know how to swim yet!!");
				utility.writeText(menuSurface, strings, 32, 50, 64 * 4 - 10, 25, true);
				
		}
		 else if(name === "swim" )
		{	
			if( cameraController.levelCounter ===0)
				strings.push(" You have gained the ability to swim! The swim ability is now unlocked in your skill book.");	
				utility.writeText(menuSurface, strings, 32, 50, 64 * 4 - 10, 25, true);
		}
		else if(name ==="climb")
		{
	
			strings.push("You can now climb! you can pass through rocks now");	
				utility.writeText(menuSurface, strings, 32, 50, 64 * 4 - 10, 25, true);
		}
			else if(name ==="rock")
		{
		
			strings.push("you must learn to climb to pass through that");	
				utility.writeText(menuSurface, strings, 32, 50, 64 * 4 - 10, 25, true);	
		}
			else if(name ==="speed")
		{
			strings.push(" You acquired a gold coin! Use this to buy power ups at the shop");	
				utility.writeText(menuSurface, strings, 32, 50, 64 * 4 - 10, 25, true);	
		}
		else if(name ==="!")
		{
			strings.push(" You have gained the ability to swim! The swim ability is now unlocked in your skill book.");	
				utility.writeText(menuSurface, strings, 32, 50, 64 * 4 - 10, 25, true);	
		}
		else if(name === "skill")
		{
						strings.push("Climbing "+ skillBook.climbLevel);
					utility.writeText(menuSurface, strings, 250, 200, 500, 25, true);
					strings.pop();
					strings.push("Swimming "+ skillBook.swimLevel);
						utility.writeText(menuSurface, strings, 250, 225, 500, 25, true);
						strings.pop();
					strings.push("Run Speed "+ skillBook.sprintLevel);
						utility.writeText(menuSurface, strings, 250, 250, 500, 25, true);
						strings.pop();
		

		}
		else
		{
		 strings.push(" You have gained the ability to swim! The swim ability is now unlocked in your skill book.");	
				utility.writeText(menuSurface, strings, 32, 50, 64 * 4 - 10, 25, true);
		}
		/*
		moveDown = false;
		moveLeft = false;
		moveRight = false;
		moveUp = false;
		*/
	},
	writtingClear:function()
	{
		menuSurface.clearRect(0, 0, menuCanvas.width, menuCanvas.height);
	},
	updateAnimation: function()
	{
		this.player.updateAnimation();
		for (var i = 0; i < this.observationInstances.length; i++)
		{
			this.observationInstances[i].updateAnimation();
		}
		this.blueCoin.updateAnimation();
		this.grayCoin.updateAnimation();
		this.speedCoin.updateAnimation();
		this.teleporter.updateAnimation();
	},
	
	checkMovement: function()
	{
		try{
		if (gameplay.collisionTiles[Math.floor(this.player.y/64 + .5)][Math.floor(this.player.x/64 + .5)].name == "water")
		{
			this.swimming = true;
		}
		else
		{
			this.swimming = false;
		}
		} catch(err) {}
		// Set velocity in the direction of the key that is pressed.
		if (moveRight && !moveLeft)
		{
			this.player.vx = this.player.speed;
			if (this.swimming)
			{
				//console.debug("Change to swimming");
				if (this.player.animation !== Animation.SwimmingRight) {
					this.player.animation = Animation.SwimmingRight;
				}
			}
			else
			{
				if (this.player.animation !== Animation.Right) {
					this.player.animation = Animation.Right;
				}
			}
		}
		if (moveLeft && !moveRight)
		{
			this.player.vx = -this.player.speed;
			if (this.swimming)
			{
				if (this.player.animation !== Animation.SwimmingLeft) {
					this.player.animation = Animation.SwimmingLeft;
				}
			}
			else
			{
				if (this.player.animation !== Animation.Left) {
					this.player.animation = Animation.Left;
				}
			}
		}
		if (currentScreen != ScreenState.WorldEvent)
		{
			if (moveUp && !moveDown)
			{
				this.player.vy = -this.player.speed;
				if (this.swimming)
				{
					if (this.player.animation !== Animation.SwimmingUp) {
						this.player.animation = Animation.SwimmingUp;
					}
				}
				else
				{
					if (this.player.animation !== Animation.Up) {
						this.player.animation = Animation.Up;
					}
				}
			}
			if (moveDown && !moveUp)
			{
				this.player.vy = this.player.speed;
				if (this.swimming)
				{
					if (this.player.animation !== Animation.SwimmingDown) {
						this.player.animation = Animation.SwimmingDown;
					}
				}
				else
				{
					if (this.player.animation !== Animation.Down) {
						this.player.animation = Animation.Down;
					}
				}
			}
		}
		
		// Set the velocity to zero if no direction is pressed.
		if ((!moveRight && !moveLeft) || (moveRight && moveLeft))
		{
			this.player.vx = 0;
		}
		if ((!moveDown && !moveUp) || (moveDown && moveUp))
		{
			this.player.vy = 0;
		}
		
		if ((!moveRight && !moveLeft && !moveDown && !moveUp) ||
			(moveRight && moveLeft && !moveDown && !moveUp) ||
			(moveDown && moveUp && !moveRight && !moveLeft) ||
			(moveRight && moveLeft && moveDown && moveUp))
		{
			if (this.player.animation !== Animation.Idle) {
				if (this.player.animation == Animation.Right) {
					this.player.currentFrame = 0;
					this.player.sourceX = 0;
				}
				else if (this.player.animation == Animation.Left) {
					this.player.currentFrame = 1;
					this.player.sourceX = this.player.sourceWidth;
				}
				else if (this.player.animation == Animation.Up) {
					this.player.currentFrame = 3;
					this.player.sourceX = 3 * this.player.sourceWidth;
				}
				else if (this.player.animation == Animation.Down) {
					this.player.currentFrame = 2;
					this.player.sourceX = 2 * this.player.sourceWidth;
				}
				else if (this.player.animation == Animation.SwimmingRight) {
					this.player.currentFrame = 4;
					this.player.sourceX = 4 * this.player.sourceWidth;
				}
				else if (this.player.animation == Animation.SwimmingLeft) {
					this.player.currentFrame = 5;
					this.player.sourceX = 5 * this.player.sourceWidth;
				}
				else if (this.player.animation == Animation.SwimmingUp) {
					this.player.currentFrame = 7;
					this.player.sourceX = 7 * this.player.sourceWidth;
				}
				else if (this.player.animation == Animation.SwimmingDown) {
					this.player.currentFrame = 6;
					this.player.sourceX = 6 * this.player.sourceWidth;
				}
				this.player.animation = Animation.Idle;
			}
		}
		
		this.player.x = utility.clamp(this.player.x + this.player.vx, 0, cameraController.gameWorld.width - this.player.width);
		this.player.y = utility.clamp(this.player.y + this.player.vy, 0, cameraController.gameWorld.height - this.player.height);
		cameraController.update();
	},
	
	update: function()
	{
		if (this.onPause)
		{
			if (!this.mapBuilt)
			{
				pause.buildInGameMap();
				this.mapBuilt = true;
			}
		}
		else if (currentScreen == ScreenState.WorldEvent)
		{
			worldEvent.update();
		}
		else if (currentScreen == ScreenState.Gameplay)
		{
			this.checkMovement();
			
			for (var i = 0; i < this.observationInstances.length; i++)
			{
				var obs = this.observationInstances[i];
				if (utility.collisionDetection(gameplay.player, obs))
				{	
					if(skillBook.swim==true && skillBook.climb ==true)
					{
						this.removeObservationPoint(i);
						switchGamemode(ScreenState.Observation);
					}
					else
					{
						this.collide();
						this.message("!")
					}
					this.canTeleport = true;
				}
			}
				
			//check for collisions with collidables.
			if (!screensLoaded[ScreenState.WorldEvent] && cameraController.mapBuilt)
			{
				try {
				for( row = Math.max(0, Math.floor((gameplay.player.y)/64) - 3); row < Math.min(Math.floor((gameplay.player.y)/64) + 3, this.collisionTiles.length - 1); row++)
				{
					for( col = Math.max(0, Math.floor((gameplay.player.x)/64) - 3); col < Math.min(Math.floor((gameplay.player.x)/64) + 3, this.collisionTiles[row].length - 1); col++)
					{
						var wCount=0;
						var collider = gameplay.collisionTiles[row][col];
						if ( utility.collisionDetection(gameplay.player, collider) && collider.name=="water" && !skillBook.swim)
						{
							this.collide();
					
							if(wCount===0)
							{
								this.message("water");
							}
							wCount++;
							if(wCount===3000)
							{
								wCount=0;
							}
						}
						if ( utility.collisionDetection(gameplay.player, collider) && collider.name=="tree")
						{
							this.collide();
						}	
						if ( utility.collisionDetection(gameplay.player, collider) && collider.name=="rock" && skillBook.climb===false)
						{
							this.collide();
							this.message("rock");
						}
						if ( utility.collisionDetection(gameplay.player, gameplay.blueCoin) && gameplay.blueCoin.visible==true)
						{
							skillBook.swim=true;
							skillBook.swimLevel=1;
							this.blueCoin.visible=false;
							this.message("swim");
						
						}
						if ( utility.collisionDetection(gameplay.player, gameplay.grayCoin) && gameplay.grayCoin.visible==true)
						{
							skillBook.climb=true;
							skillBook.climbLevel=1;
							this.grayCoin.visible=false;
							this.message("climb");
						
						}
						if ( utility.collisionDetection(gameplay.player, gameplay.speedCoin) && gameplay.speedCoin.visible==true)
						{
							
							this.speedCoin.visible=false;
							this.message("speed");
							this.gold++;
							this.tutorial=false;
							skillBook.sprint = true;
						
						}	
						if ( utility.collisionDetection(gameplay.player, gameplay.teleporter.hitbox))
						{
							if(this.canTeleport)
							{
								if (!this.onTeleport)
								{
									this.onTeleport = true;
									if (this.currentLevel != Level.BaseCamp)
									{
										this.nextLevel(Level.BaseCamp);
									}
									else
									{
										currentScreen = ScreenState.SNASelectionScreen;
									}
								}
							}
							else
							{
								this.collide();
								this.message("!")
							}
						}
						else if (this.onTeleport)
						{
							this.onTeleport = false;
						}
					}
				}
				} catch(err) {}
			}
			this.updateAnimation();
			
			if (this.currentLevel == Level.BaseCamp)
			{
				if (utility.collisionDetection(gameplay.player, gameplay.mainCamp))
				{
					if (!this.onMainCamp)
					{
						this.onMainCamp = true;
						currentScreen = ScreenState.SiblingInteraction;
					}
				}
				else
				{
					this.onMainCamp = false;
				}
				if (utility.collisionDetection(gameplay.player, gameplay.plants))
				{
					if (!this.onPlants)
					{
						this.onPlants = true;
						currentScreen = ScreenState.Information;
					}
				}
				else
				{
					this.onPlants = false;
				}
				if (utility.collisionDetection(gameplay.player, gameplay.store))
				{
					switchGamemode(ScreenState.ShopScreen);
					this.collide();
				}
				
			}
		}
	},
	
	nextLevel: function(map)
	{
		this.currentLevel = map;
		this.obsCoords = [];
		utility.clearAll();
		this.observationInstances = [];
		this.mapOrientation = Math.floor(Math.random() * 4);
		if (map < Level.Map1) this.mapOrientation *= 0;
		console.debug("Map Orientation: " + this.mapOrientation);
		this.curMap = rotate.RotateMap(allLevelMaps[gameplay.currentLevel], this.mapOrientation);
		this.curObjMap = rotate.RotateMap(allObjectMaps[gameplay.currentLevel], this.mapOrientation);
		this.clearCollision();
		cameraController.buildMap(this.curMap, 0);
		cameraController.buildMap(this.curObjMap, 1);
		switch(map)
		{
			case Level.BaseCamp:
				utility.startNewSong(songGameplayCamp);
				this.drawBaseCamp();
				break;
			case Level.Map1:
				utility.startNewSong(songGameplayPrairie);
				this.drawMap1();
				break;
			case Level.Forest:
				utility.startNewSong(songGameplayForest);
				this.drawForest();
				break;
			case Level.Marsh:
				utility.startNewSong(songGameplayMarsh);
				this.drawMarsh();
				break;
			case Level.Hilly:
				utility.startNewSong(songGameplayHilly);
				this.drawHilly();
				break;
		}
		this.teleporter.hitbox.x = this.teleporter.x;
		this.teleporter.hitbox.y = this.teleporter.y + 64;
		this.teleporter.hitbox.width = this.teleporter.width;
		this.teleporter.hitbox.height = this.teleporter.height / 2;
		console.debug("Hitbox x: " + this.teleporter.hitbox.x + ", y: " + this.teleporter.hitbox.y + ", w: " + this.teleporter.hitbox.width + ", h: " + this.teleporter.hitbox.height);
		console.debug("Building level");
	},
	
	// Functions to set up the smart positions of the player,
	// observation, teleporter, and other buildings of importance
	drawBaseCamp: function() // Draw the Store, Training Building, Teleporter, and Main Camp
	{
		this.player.x = 3.5 * 64;
		this.player.y = 2.5 * 64; 
		
		cameraController.camera.x = 0;
		cameraController.camera.y = 0;
		
		this.teleporter.x = 3 * 64;
		this.teleporter.y = 2 * 64;
		
		this.teleporterCoords = [
			Math.floor(gameplay.teleporter.x / 64),
			Math.floor(gameplay.teleporter.y / 64)
			];
		
		this.plants.x = 6 * 64;
		this.plants.y = 32;
		
		this.training.x = 9 * 64;
		this.training.y = 32;
		
		this.mainCamp.x = 12 * 64;
		this.mainCamp.y =  32;
		
		this.store.x = 15 * 64;
		this.store.y = 32;
		
		this.placeSpeed;
	},
	
	drawMap1: function()
	{
		this.placeObservationEvent();
		
		var rotX = 7;
		var rotY = 7;
		
		this.teleporterCoords = [
			Math.floor(rotX),
			Math.floor(rotY)
			];
		
		var pRotX = 7.5;
		var pRotY = 7.5
		
		var cRotX = 0;
		var cRotY = 0;
		
		if (this.mapOrientation == 1)
		{
			// x is 4 * 64 from right
			rotX = this.curMap[0].length - rotX;
			pRotX = this.curMap[0].length - pRotX;
			cRotX = this.curMap[0].length * 64 - cameraController.camera.width;
		}
		else if (this.mapOrientation == 2) 
		{
			// x is 4 * 64 from right
			// y is 4 * 64 from bottom
			rotX = this.curMap[0].length - rotX;
			rotY = this.curMap.length - rotY;
			pRotX = this.curMap[0].length - pRotX;
			pRotY = this.curMap.length - pRotY;
			cRotX = this.curMap[0].length * 64 - cameraController.camera.width;
			cRotY = this.curMap.length * 64 - cameraController.camera.height;
		}
		else if (this.mapOrientation == 3)
		{
			// y is 4 * 64 from bottom
			rotY = this.curMap.length - rotY;
			pRotY = this.curMap.length - pRotY;
			cRotY = this.curMap.length * 64 - cameraController.camera.height;
		}
		
		
		this.teleporter.x = rotX * 64;
		this.teleporter.y = rotY * 64;
		
		this.player.x = pRotX * 64;
		this.player.y = pRotY * 64;
		
		cameraController.camera.x = cRotX;
		cameraController.camera.y = cRotY;
	},
	
	drawForest: function()
	{
		this.placeObservationEvent();
		
		var rotX = 2;
		var rotY = 2;
		
		this.teleporterCoords = [
			Math.floor(rotX),
			Math.floor(rotY)
			];
			
		var pRotX = 2.5;
		var pRotY = 2.5
		
		var cRotX = 0;
		var cRotY = 0;
		
		if (this.mapOrientation == 1)
		{
			// x is 4 * 64 from right
			rotX = this.curMap[0].length - rotX;
			pRotX = this.curMap[0].length - pRotX;
			cRotX = this.curMap[0].length * 64 - cameraController.camera.width;
		}
		else if (this.mapOrientation == 2) 
		{
			// x is 4 * 64 from right
			// y is 4 * 64 from bottom
			rotX = this.curMap[0].length - rotX;
			rotY = this.curMap.length - rotY;
			pRotX = this.curMap[0].length - pRotX;
			pRotY = this.curMap.length - pRotY;
			cRotX = this.curMap[0].length * 64 - cameraController.camera.width;
			cRotY = this.curMap.length * 64 - cameraController.camera.height;
		}
		else if (this.mapOrientation == 3)
		{
			// y is 4 * 64 from bottom
			rotY = this.curMap.length - rotY;
			pRotY = this.curMap.length - pRotY;
			cRotY = this.curMap.length * 64 - cameraController.camera.height;
		}
		
		
		this.teleporter.x = rotX * 64;
		this.teleporter.y = rotY * 64;
		
		this.player.x = pRotX * 64;
		this.player.y = pRotY * 64;
		
		cameraController.camera.x = cRotX;
		cameraController.camera.y = cRotY;
	},
	
	drawMarsh: function()
	{
		this.placeObservationEvent();
		
		var rotX = 2;
		var rotY = 2;
		
		this.teleporterCoords = [
			Math.floor(rotX),
			Math.floor(rotY)
			];
			
		var pRotX = 2.5;
		var pRotY = 2.5
		
		var cRotX = 0;
		var cRotY = 0;
		
		if (this.mapOrientation == 1)
		{
			// x is 4 * 64 from right
			rotX = this.curMap[0].length - rotX;
			pRotX = this.curMap[0].length - pRotX;
			cRotX = this.curMap[0].length * 64 - cameraController.camera.width;
		}
		else if (this.mapOrientation == 2) 
		{
			// x is 4 * 64 from right
			// y is 4 * 64 from bottom
			rotX = this.curMap[0].length - rotX;
			rotY = this.curMap.length - rotY;
			pRotX = this.curMap[0].length - pRotX;
			pRotY = this.curMap.length - pRotY;
			cRotX = this.curMap[0].length * 64 - cameraController.camera.width;
			cRotY = this.curMap.length * 64 - cameraController.camera.height;
		}
		else if (this.mapOrientation == 3)
		{
			// y is 4 * 64 from bottom
			rotY = this.curMap.length - rotY;
			pRotY = this.curMap.length - pRotY;
			cRotY = this.curMap.length * 64 - cameraController.camera.height;
		}
		
		
		this.teleporter.x = rotX * 64;
		this.teleporter.y = rotY * 64;
		
		this.player.x = pRotX * 64;
		this.player.y = pRotY * 64;
		
		cameraController.camera.x = cRotX;
		cameraController.camera.y = cRotY;
	},
	
	drawHilly: function()
	{
		this.placeObservationEvent();
		
		var rotX = this.curMap[0].length / 2 - 1;
		var rotY = this.curMap.length / 2 - 1;
		
		if ( this.mapOrientation % 2 == 0) {
			this.teleporterCoords = [
				Math.floor(rotX),
				Math.floor(rotY)
				];
		}
		else {
			this.teleporterCoords = [
				Math.floor(rotY),
				Math.floor(rotX)
				];
		}
		var pRotX = rotX + .5;
		var pRotY = rotY + .5;
		
		var cRotX = (this.curMap[0].length * 64 - cameraController.camera.width) / 2;
		var cRotY = (this.curMap.length * 64 - cameraController.camera.height) / 2;
		
		this.teleporter.x = rotX * 64;
		this.teleporter.y = rotY * 64;
		
		this.player.x = pRotX * 64;
		this.player.y = pRotY * 64;
		
		cameraController.camera.x = cRotX;
		cameraController.camera.y = cRotY;
	},
	
	clearCollision: function()
	{
		this.collisionTiles = [];
		var collider = {
			x: -64,
			y: -64,
			width: 0,
			height: 0,
			name: ""
		};
		for (var i = 0; i < this.curMap.length; i++)
		{
			tempCollision = [];
			for (var j = 0; j < this.curMap[i].length; j++)
			{
				tempCollision.push(Object.create(collider));
			}
			this.collisionTiles.push(tempCollision);
		}
	},
	
	render: function()
	{
		
		if (currentScreen == ScreenState.WorldEvent)
		{
			backgroundSurface.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
			gameplaySurface.clearRect(0, 0, gameplayCanvas.width, gameplayCanvas.height);
			menuSurface.clearRect(0, 0, menuCanvas.width, menuCanvas.height);
			utility.drawImage
			  (
				gameplaySurface, this.player.sprite, 
				this.player.sourceX, this.player.sourceY + this.player.animation * this.player.sourceHeight, 
				this.player.sourceWidth, this.player.sourceHeight,
				Math.floor(this.player.x), Math.floor(this.player.y), 
				this.player.width, this.player.height
			  );
		}
		else
		{
			backgroundSurface.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
			gameplaySurface.clearRect(0, 0, gameplayCanvas.width, gameplayCanvas.height);
			if(this.writting==false)
			{
				
				menuSurface.clearRect(0, 0, menuCanvas.width, menuCanvas.height);
			}
			var strings=[];
			strings.push(" gold: " + this.gold);	
			utility.drawImage(
				menuSurface, imgChest,
				0, 0,
				imgChest.width, imgChest.height,
				32, CANVAS_HEIGHT - imgChest.height - 32,
				imgChest.width, imgChest.height
			);
			utility.writeText(menuSurface, strings, 96, CANVAS_HEIGHT - imgChest.height + 8, 64 * 4 - 10, 25, true);
			if(skillBook.display===true)
			{
				this.message("skill")
			}
			
			cameraController.renderBackground();
			var sprites = [];
			if (this.blueCoin.visible) sprites.push(this.blueCoin);
			if (this.grayCoin.visible) sprites.push(this.grayCoin);
			if (this.teleporter.visible) sprites.push(this.teleporter);
			if (this.currentLevel == Level.BaseCamp) sprites = sprites.concat([this.training, this.mainCamp, this.store, this.plants]);
			sprites.push(this.player);
			if (this.observationInstances.length > 0) sprites = sprites.concat(this.observationInstances);
			cameraController.renderForeground(sprites);
			
			if (this.onPause)
			{
				pause.render();
			}
		}
		
		// Render compass and compass arrow
		utility.drawImage
		(
			menuSurface, imgCompassBackground,
			0, 0,
			imgCompassBackground.width, imgCompassBackground.height,
			1152 - imgCompassBackground.width - 32, 512 - imgCompassBackground.height - 32,
			imgCompassBackground.width, imgCompassBackground.height
		);
		utility.drawImage
		(
			menuSurface, imgCompassArrow,
			this.mapOrientation * 64, 0,
			64, 64,
			1152 - imgCompassBackground.width - 32, 512 - imgCompassBackground.height - 32,
			64, 64
		);
	},
	
	// Randomly places the observationInstance on the map
	placeObservationEvent: function()
	{
		for (var i = this.observationInstances.length; i < quests.plantsInARegion(this.currentLevel).length; i++)
		{
			var obsPoint = Object.create(this.observationInstance);
			if (this.currentLevel == Level.Tutorial)
			{
				if (!this.oneShotObservation)
				{
					obsPoint.x = 1000;
					obsPoint.y = 100;
					obsPoint.lowestPos = 100;
				}
			}
			else
			{
				var obsX = Math.random() * (cameraController.gameWorld.width - 128) - obsPoint.width + 128;
				var obsY = Math.random() * (cameraController.gameWorld.height - 128) - obsPoint.height + 128;
				
				while ( gameplay.collisionTiles[Math.floor(obsY/64)][Math.floor(obsX/64)].x > 0)
				{
					obsX = Math.random() * (cameraController.gameWorld.width - 128) - obsPoint.width + 128;
					obsY = Math.random() * (cameraController.gameWorld.height - 128) - obsPoint.height + 128;
				}
				
				obsPoint.x = obsX;
				obsPoint.y = obsY;
				obsPoint.lowestPos = obsY;
				
				//console.debug("x: " + obsX + " y: " + obsY);
			}
			
			var fromX = Math.floor(obsPoint.x / 64);
			var fromY = Math.floor(obsPoint.y / 64);
			
			if (this.mapOrientation == 1) // x changes
			{
				// 90 degree Transpose then Reverse row
				fromX = this.curMap[0].length - 1 - fromX;
				
				var temp = fromX;
				fromX = fromY;
				fromY = temp;
			}
			else if (this.mapOrientation == 2) // both change
			{
				// 180 degrees Reverse row then col
				fromX = this.curMap[0].length - 1 - fromX;
				fromY = this.curMap.length - 1 - fromY;
			}
			else if (this.mapOrientation == 3) // y changes
			{
				// 270 degrees Transpose then reverse col
				fromY = this.curMap.length - 1 - fromY;
				
				var temp = fromY;
				fromY = fromX;
				fromX = temp;
			}
			
			this.obsCoords.push([fromX, fromY]);
			
			this.observationInstances.push(obsPoint);
		}
	},
	
	placeBlue: function()
	{
		this.blueCoin.x=300;
		this.blueCoin.y=400;
	},
	
	placeGray: function()
	{
		this.grayCoin.x=600;
		this.grayCoin.y=100;
	},
	placeSpeed:function()
	{
		this.speedCoin.x=100;
		this.speedCoin.y=100;
	},
	
	removeObservationPoint: function(index)
	{
		this.observationInstances.splice(index, 1);
		ispy.setRequested(quests.plantsToIdentify[index]);
		quests.removeQuest(quests.plantsToIdentify[index], quests.regionsToVisit[index]);
	}
}



//Add keyboard listeners
window.addEventListener("keydown", function(event)
{
	if (event.keyCode == 16)// && skillBook.sprint== true)
	{
		gameplay.player.speed = gameplay.player.runSpeed*skillBook.sprintLevel;
		
	}
	if (event.keyCode == 75)// && skillBook.sprint== true)
	{		
		
			skillBook.display=true;
	}
	switch(event.keyCode)
	{
		case LEFT:
			moveLeft = true;
			break;  
		
		case UP:
			moveUp = true;
			break;
			
		case RIGHT:
			moveRight = true;
			break; 
		
		case DOWN:
			moveDown = true;
			break;
		
	}
	
}, false);

window.addEventListener("keyup", function(event)
{
	if (event.keyCode == 16)
	{
		gameplay.player.speed = gameplay.player.walkSpeed;
	}
	if (event.keyCode == 75)// && skillBook.sprint== true)
	{		
		
			skillBook.display=false;
			gameplay.writtingClear();
	}
	switch(event.keyCode)
	{   
		case LEFT:
			moveLeft = false;
			break;  
			
		case UP:
			moveUp = false;
			break;
			
		case RIGHT:
			moveRight = false;
			break; 

		case DOWN:
			moveDown = false;
			break;

		  
		case ENTER:
			if (!gameplay.onPause)
			{
				console.debug("Enter Pause");
				pause.mapXOffset = 13;
				pause.mapYOffset = 6;
				pause.mapScale = 1;
				gameplay.onPause = true;
				moveDown = false;
				moveLeft = false;
				moveRight = false;
				moveUp = false;
			}
			else
			{
				console.debug("Exit Pause");
				gameplay.mapBuilt = false;
				gameplay.onPause = false;
				utility.clearAll();
			}
			break;
	}
	
}, false);
