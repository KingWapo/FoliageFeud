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
	Map2: 3,
	Map3: 4,
	Map4: 5,
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
	writting:false,
	trainning:true,
	gold:0,
	
	// Buildings
	store: Object.create(spriteObject),
	mainCamp: Object.create(spriteObject),
	training: Object.create(spriteObject),

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
		runSpeed: 10,
		sprite: '',
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
		numOfFrames: 4,
		currentFrame: 0,
		update:0,
		updateAnimation: function()
		{
			
			
				this.sourceX = this.currentFrame * this.sourceWidth;
			
				this.currentFrame += 1;
					
				if ( this.currentFrame === this.numOfFrames )
				{
					this.currentFrame = 0;	
				}
					
			
		
		},
		x: 0,
		y: 0,
		width: 128,
		height: 128,	
		sprite: ''
		
	},
	
	
	
	init: function()
	{
		utility.clearAll();
		
		this.mapOrientation = Math.floor(Math.random() * 4);
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
		this.placeTeleporter();
		// Init the stores
		this.training.width = 256;
		this.training.height = 128;
	
		this.store.width = 256;
		this.store.height = 128;
		
		this.mainCamp.width = 256;
		this.mainCamp.height = 128;
		
		this.updateSprite();

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
		if (moveRight && !moveLeft)
		{
			this.player.x = this.player.x-16;
		}
		if (moveLeft && !moveRight)
		{
			this.player.x = this.player.x+16;
		}
		if (moveUp && !moveDown)
		{
			this.player.y = this.player.y+16;
		}
		if (moveDown && !moveUp)
		{
			this.player.y = this.player.y-16;
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
		moveDown = false;
		moveLeft = false;
		moveRight = false;
		moveUp = false;
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
		// Set velocity in the direction of the key that is pressed.
		if (moveRight && !moveLeft)
		{
			this.player.vx = this.player.speed;
			if (this.player.animation !== Animation.Right) {
				this.player.animation = Animation.Right;
			}
		}
		if (moveLeft && !moveRight)
		{
			this.player.vx = -this.player.speed;
			if (this.player.animation !== Animation.Left) {
				this.player.animation = Animation.Left;
			}
		}
		if (currentScreen != ScreenState.WorldEvent)
		{
			if (moveUp && !moveDown)
			{
				this.player.vy = -this.player.speed;
				if (this.player.animation !== Animation.Up) {
					this.player.animation = Animation.Up;
				}
			}
			if (moveDown && !moveUp)
			{
				this.player.vy = this.player.speed;
				if (this.player.animation !== Animation.Down) {
					this.player.animation = Animation.Down;
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
				for( row = Math.max(0, Math.floor((gameplay.player.y)/64) - 3); row < Math.min(Math.floor((gameplay.player.y)/64) + 3, this.collisionTiles.length - 1); row++)
				{
					for( col = Math.max(0, Math.floor((gameplay.player.x)/64) - 3); col < Math.min(Math.floor((gameplay.player.x)/64) + 3, this.collisionTiles[row].length - 1); col++)
					{
						var wCount=0;
						var collider = gameplay.collisionTiles[row][col];
						if ( utility.collisionDetection(gameplay.player, collider) && collider.name=="water" && skillBook.swim==false)
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
						if ( utility.collisionDetection(gameplay.player, gameplay.teleporter))
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
				if (utility.collisionDetection(gameplay.player, gameplay.store))
				{
					shop.drawShop();
					this.collide();
				}
				
			}
		}
	},
	
	nextLevel: function(map)
	{
		this.currentLevel = map;
		this.clearCollision();
		utility.clearAll();
		this.observationInstances = [];
		cameraController.buildMap(allLevelMaps[gameplay.currentLevel], 0);
		cameraController.buildMap(allObjectMaps[gameplay.currentLevel], 1);
		switch(map)
		{
			case Level.BaseCamp:
				this.drawBaseCamp();
				break;
			case Level.Map1:
				this.drawMap1();
				break;
			case Level.Map2:
				this.drawMap2();
				break;
			case Level.Map3:
				this.drawMap3();
				break;
			case Level.Map4:
				this.drawMap4();
				break;
		}
		console.debug("Building level");
	},
	
	// Functions to set up the smart positions of the player,
	// observation, teleporter, and other buildings of importance
	drawBaseCamp: function() // Draw the Store, Training Building, Teleporter, and Main Camp
	{
		this.player.x = 300;
		this.player.y = 300; 
		
		this.teleporter.x = 300;
		this.teleporter.y = 300;
		
		this.training.x = 3 * 64;
		this.training.y = 2 * 64;
		
		this.mainCamp.x = 7 * 64;
		this.mainCamp.y = 2 * 64;
		
		this.store.x = 11 * 64;
		this.store.y = 2 * 64;
		this.placeSpeed;
	},
	
	drawMap1: function()
	{
		this.placeObservationEvent();
	},
	
	drawMap2: function()
	{
	},
	
	drawMap3: function()
	{
	},
	
	drawMap4: function()
	{
	},
	
	clearCollision: function()
	{
		for (var i = 0; i < this.collisionTiles.length; i++)
		{
			for (var j = 0; j < this.collisionTiles[i].length; j++)
			{
				if (this.collisionTiles[i][j].x != -64)
				{
					this.collisionTiles[i][j].x = -64;
					this.collisionTiles[i][j].width = 0;
				}
			}
		}
	},
	
	render: function()
	{
		if (this.onPause)
		{
			pause.render();
		}
		else if (currentScreen == ScreenState.WorldEvent)
		{
			backgroundSurface.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
			gameplaySurface.clearRect(0, 0, gameplayCanvas.width, gameplayCanvas.height);
			menuSurface.clearRect(0, 0, menuCanvas.width, menuCanvas.height);
			gameplaySurface.drawImage
			  (
				this.player.sprite, 
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
			 strings.push(" total gold: " + this.gold);	
				utility.writeText(menuSurface, strings, 32, 500, 64 * 4 - 10, 25, true);
				if(skillBook.display===true)
				{
					this.message("skill")
				}
			
			cameraController.render();
			
			if(this.blueCoin.visible==true)
			{
				gameplaySurface.drawImage
				(
				
					this.blueCoin.sprite, 
					this.blueCoin.sourceX, this.blueCoin.sourceY, 
					this.blueCoin.sourceWidth, this.blueCoin.sourceHeight,
					Math.floor(this.blueCoin.x), Math.floor(this.blueCoin.y), 
					this.blueCoin.width, this.blueCoin.height
				 );
			}
			
			if(this.grayCoin.visible==true)
			{
				gameplaySurface.drawImage
				(
				
					this.grayCoin.sprite, 
					this.grayCoin.sourceX, this.grayCoin.sourceY, 
					this.grayCoin.sourceWidth, this.grayCoin.sourceHeight,
					Math.floor(this.grayCoin.x), Math.floor(this.grayCoin.y), 
					this.grayCoin.width, this.grayCoin.height
				 );
			
			}
			if(this.teleporter.visible==true)
			{
				gameplaySurface.drawImage	
				(
					this.teleporter.sprite, 
					this.teleporter.sourceX, this.teleporter.sourceY, 
					this.teleporter.sourceWidth, this.teleporter.sourceHeight,
					Math.floor(this.teleporter.x), Math.floor(this.teleporter.y), 
					this.teleporter.width, this.teleporter.height
			   );
			}
			if (this.currentLevel == Level.BaseCamp)
			{
				gameplaySurface.drawImage
				(
					this.training.sprite,
					this.training.x, this.training.y
				);
				
				
				
				gameplaySurface.drawImage
				(
					this.store.sprite,
					this.store.x, this.store.y
				);
				if(gameplay.trainning==true)
				{
					if(this.speedCoin.visible==true)
				{	
				gameplaySurface.drawImage
				(
				
					this.speedCoin.sprite, 
					this.speedCoin.sourceX, this.speedCoin.sourceY, 
					this.speedCoin.sourceWidth, this.speedCoin.sourceHeight,
					Math.floor(this.speedCoin.x), Math.floor(this.speedCoin.y), 
					this.speedCoin.width, this.speedCoin.height
				 );
			}
				}
				
			}


			for (var i = 0; i < this.observationInstances.length; i++)
			{
				gameplaySurface.drawImage
				(
				  
					this.observationInstances[i].sprite, 
					this.observationInstances[i].sourceX, this.observationInstances[i].sourceY, 
					this.observationInstances[i].sourceWidth, this.observationInstances[i].sourceHeight,
					Math.floor(this.observationInstances[i].x), Math.floor(this.observationInstances[i].y), 
					this.observationInstances[i].width, this.observationInstances[i].height
				);
			}
			gameplaySurface.drawImage
			(
				this.player.sprite, 
				this.player.sourceX, this.player.sourceY + this.player.animation * this.player.sourceHeight, 
				this.player.sourceWidth, this.player.sourceHeight,
				Math.floor(this.player.x), Math.floor(this.player.y), 
				this.player.width, this.player.height
			
			);		  
		}
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
				
				obsPoint.x = obsX;
				obsPoint.y = obsY;
				obsPoint.lowestPos = obsY;
				
				console.debug("x: " + obsX + " y: " + obsY);
			}
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
	placeTeleporter:function()
	{	
		this.teleporter.x=1000;
		this.teleporter.y=300;
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
		gameplay.player.speed = gameplay.player.runSpeed;
	}
	if (event.keyCode == 75)// && skillBook.sprint== true)
	{		
		
			skillBook.display=true;
	}
	if (!gameplay.onPause)
	{
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
	if (gameplay.onPause)
	{
		if (event.keyCode == ENTER)
		{
			console.debug("Exit Pause");
			gameplay.mapBuilt = false;
			gameplay.onPause = false;
			utility.clearAll();
		}
	}
	else
	{
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
			console.debug("Enter Pause");
			gameplay.onPause = true;
			moveDown = false;
			moveLeft = false;
			moveRight = false;
			moveUp = false;
			break;
		}
	}
	
}, false);
