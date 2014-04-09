// Created by Iron Man

// The main gameplay class

// Enum to determine the animation to be played
Animation = {
	Idle: 0,
	Right: 1,
	Left: 2,
	Down: 3,
	Up: 4,
	WorldEventRight: 5
};

Level = {
	Tutorial: 0,
	BaseCamp: 1,
	Map1: 2,
	Map2: 3,
	Map3: 4,
	Map4: 5
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
		sprite: new Image(),
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
		
		sprite: new Image()
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
		
		sprite: new Image()
		
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
		
		sprite: new Image()
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
		x: 20,
		y: 20,
		width: 64,
		height: 64,
		
		sprite: new Image()
	},
	telePorter: {
	
		visible: true,
		sourceX: 0,
		sourceY: 0,
		sourceWidth:154,
		sourceHeight:122,
		x: 0,
		y: 0,
		width: 154,
		height: 122,	
		sprite: new Image()
		
	},
	
	
	
	init: function()
	{
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
		
		// Load the image files
		this.player.sprite.src = "../img/Player/characterMale.png";
		this.updateSprite();
		this.observationInstance.sprite.src = "../img/Tokens/exclamationPoint.png";
		//load the coin files
		this.blueCoin.sprite.src=  "../img/Tokens/waterToken.png";
		this.grayCoin.sprite.src=  "../img/Tokens/rockToken.png";
		this.speedCoin.sprite.src="../img/Tokens/speedToken.png";
		//load the teleporter
		this.telePorter.sprite.src="../img/Tiles/telelporter.png";
		
		//place the coins and objects 
		this.placeObservationEvent();
		this.placeBlue();
		this.placeGray();
		this.placeSpeed();
		this.placeTeleporter();
		
		// Init the stores
		this.training.width = 256;
		this.training.height = 128;
		this.training.sprite = new Image();
		this.training.sprite.src = "../img/Tiles/training.png"
		
		this.store.width = 256;
		this.store.height = 128;
		this.store.sprite = new Image();
		this.store.sprite.src = "../img/Tiles/shop.png";
		
		this.mainCamp.width = 256;
		this.mainCamp.height = 128;
		this.mainCamp.sprite = new Image();
		this.mainCamp.sprite.src = "../img/Tiles/mainCamp.png";

	},
	
	updateSprite: function()
	{
		switch(currentSprite)
		{
			case SpriteState.Boy:
				this.player.sprite.src = "../img/Player/characterMale.png";
			break;
			
			case SpriteState.Girl:
				this.player.sprite.src = "../img/Player/characterFemale.png";
			break;	
		}
	},
	
	collide: function()
	{
		playerSpeed=0;
		/*if(gamplay.player.animation==Animation.Right)
		{
			gamplay.player.x=player.x-16;
			
		}
		if(gamplay.player.animation==Animation.Left)
		{
			gamplay.player.x=player.x+16;
		}
		
		if(gamplay.player.animation==Animation.Up)
		{
			gamplay.player.y=player.y+16;
		}
		if(gamplay.player.animation==Animation.Down)
		{
			gamplay.player.y=player.y-16;
			
		}*/
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
		/*
		if(name === "water" )
		{	
			if( cameraController.levelCounter ===0)
				window.alert("OH no you dont want to die! You need a magical blue spinning coin to guide you across the waters...hmmmm wonder if there is one on this map.");	
		}
		 else if(name === "swim" )
		{	
			if( cameraController.levelCounter ===0)
				window.alert(" You have gained the ability to swim! The swim ability is now unlocked in your skill book. Now you must find the gray coin");	
				window.alert(" The gray coin is to the south east and will allow you to pass through the mountains");	
		}
		else if(name ==="climb")
		{
			window.alert("You can now climb! Now you must find the final coin the speed coin to the south west");	
		}
			else if(name ==="rock")
		{
			window.alert("you must learn to climb to pass through that");	
		}
			else if(name ==="speed")
		{
			window.alert("hold the shift key to run at high speeds in order to hunt down the ! hidden on this map.");	
		}
		else if(name ==="!")
		{
			window.alert("you must collect all three coins to progress");	
		}
		else
		{
		 window.alert("dont die your significant other needs you! learn to swim before you try to explore the rivers");
		}
		moveDown = false;
		moveLeft = false;
		moveRight = false;
		moveUp = false;
		*/
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
				//console.debug(Math.max(0, (gameplay.player.y - 3)/64) + " -- " + Math.min(gameplay.player.y + 3, this.collisionTiles.length - 1));
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
							this.blueCoin.visible=false;
							this.message("swim");
						
						}
						if ( utility.collisionDetection(gameplay.player, gameplay.grayCoin) && gameplay.grayCoin.visible==true)
						{
							skillBook.climb=true;
							this.grayCoin.visible=false;
							this.message("climb");
						
						}
						if ( utility.collisionDetection(gameplay.player, gameplay.speedCoin) && gameplay.speedCoin.visible==true)
						{
							
							this.speedCoin.visible=false;
							this.message("speed");
							skillBook.sprint = true;
						
						}	
						if ( utility.collisionDetection(gameplay.player, gameplay.telePorter))
						{
							if(this.canTeleport)
							{
								if (this.currentLevel != Level.BaseCamp)
								{
									this.nextLevel(Level.BaseCamp);
								}
								else
								{
									//Level Select
								}

							}
							else
							{
								this.collide();
								this.message("!")
							}

						
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
					else
					{
						this.onMainCamp = false;
					}
				}
			}
		}
	},
	
	nextLevel: function(map)
	{
		this.currentLevel = map;
		backgroundSurface.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
		gameplaySurface.clearRect(0, 0, gameplayCanvas.width, gameplayCanvas.height);
		this.observationInstances = [];
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
		cameraController.buildMap(allLevelMaps[gameplay.currentLevel], 0);
		cameraController.buildMap(allObjectMaps[gameplay.currentLevel], 1);
		console.debug("Building level");
	},
	
	// Functions to set up the smart positions of the player,
	// observation, teleporter, and other buildings of importance
	drawBaseCamp: function() // Draw the Store, Training Building, Teleporter, and Main Camp
	{
		this.player.x = 300;
		this.player.y = 300;
		
		this.telePorter.x = 300;
		this.telePorter.y = 300;
		
		this.training.x = 3 * 64;
		this.training.y = 2 * 64;
		
		this.mainCamp.x = 7 * 64;
		this.mainCamp.y = 2 * 64;
		
		this.store.x = 11 * 64;
		this.store.y = 2 * 64;
	},
	
	drawMap1: function()
	{
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
			menuSurface.clearRect(0, 0, menuCanvas.width, menuCanvas.height);
			
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
			if(this.telePorter.visible==true)
			{
				gameplaySurface.drawImage	
				(
					this.telePorter.sprite, 
					this.telePorter.sourceX, this.telePorter.sourceY, 
					this.telePorter.sourceWidth, this.telePorter.sourceHeight,
					Math.floor(this.telePorter.x), Math.floor(this.telePorter.y), 
					this.telePorter.width, this.telePorter.height
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
					this.mainCamp.sprite,
					this.mainCamp.x, this.mainCamp.y
				);
				
				gameplaySurface.drawImage
				(
					this.store.sprite,
					this.store.x, this.store.y
				);
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
		this.speedCoin.x=1000;
		this.speedCoin.y=1500;
	},
	placeTeleporter:function()
	{	
		this.telePorter.x=1000;
		this.telePorter.y=300;
		console.debug("x: " + this.telePorter.width + " y: " + this.telePorter.height);
	},
	
	removeObservationPoint: function(index)
	{
		this.observationInstances.splice(index, 1);
		console.debug("Plant: " + quests.plantsToIdentify[index]);
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
	if (gameplay.onPause)
	{
		if (event.keyCode == ENTER)
		{
			console.debug("Exit Pause");
			gameplay.mapBuilt = false;
			gameplay.onPause = false;
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
