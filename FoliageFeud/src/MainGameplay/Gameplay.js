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
		
		x: 0,
		y: 0,
		vy: 0,
		width: 64,
		height: 64,
		gravity: 2,
		lowestPos: 0,
		atLowestPos: true,
		
		sprite: new Image()
	},
	
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
		visible: true,
		x: 20,
		y: 20,
		width: 64,
		height: 64,
		
		sprite: new Image()
	},
	
	init: function()
	{
		this.mapOrientation = Math.floor(Math.random() * 4);
		console.debug("Map Orientation: " + this.mapOrientation);
		
		cameraController.init();
		
		// Load the image files
		this.player.sprite.src = "../img/Player/characterMale.png";
		this.updateSprite();
		this.observationInstance.sprite.src = "../img/Tokens/exclamationPoint.png";
		this.blueCoin.sprite.src=  "../img/Tokens/waterToken.png";
		this.grayCoin.sprite.src=  "../img/Tokens/cat.png";
		this.placeObservationEvent();
		this.placeBlue();
		this.placeGray();
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
		/*
		if(player.animation==Animation.Right)
		{
			player.x=player.x-16;
			
		}
		if(player.animation==Animation.Left)
		{
			player.x=player.x+16;
		}
		
		if(player.animation==Animation.Up)
		{
			player.y=player.y+16;
		}
		if(player.animation==Animation.Down)
		{
			player.y=player.y-16;
			
		}
		*/
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
		if(name === "water" )
		{	
			if( cameraController.levelCounter ===0)
				window.alert("OH no you dont want to die! You need a magical blue spinning coin to guide you across the waters...hmmmm wonder if there is one on this map.");	
		}
		 else if(name === "swim" )
		{	
			if( cameraController.levelCounter ===0)
				window.alert(" You have gained the ability to swim! The swim ability is now unlocked in your skill book. GO GET EM TIGER!");	
		}
		else if(name ==="climb")
		{
			window.alert(" man...you can climb now thanks to this cat you collected....hopefully the artists will make it..idk..not a cat");	
		}
		else
		{
		 window.alert("dont die your significant other needs you! learn to swim before you try to explore the rivers");
		}
		moveDown = false;
		moveLeft = false;
		moveRight = false;
		moveUp = false;
	},
	
	updateAnimation: function()
	{
		this.player.updateAnimation();
		this.observationInstance.updateAnimation();
		this.blueCoin.updateAnimation();
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
		if (!screensLoaded[ScreenState.WorldEvent])
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
		if (!moveRight && !moveLeft)
		{
			this.player.vx = 0;
		}
		if (!moveDown && !moveUp)
		{
			this.player.vy = 0;
		}
		
		if (!moveRight && !moveLeft && !moveDown && !moveUp)
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
		else if (screensLoaded[ScreenState.WorldEvent])
		{
			worldEventUpdate();
		}
		else if (screensLoaded[ScreenState.Gameplay])
		{
			this.checkMovement();
		
			if (utility.collisionDetection(gameplay.player, gameplay.observationInstance))
			{
				currentScreen = ScreenState.Observation;
			}	
			//check for collisions with collidables.
			if (!screensLoaded[ScreenState.WorldEvent])
			{
				for( i=0; i<cameraController.collidables.length; i++)
				{
					var wCount=0;
					if ( utility.collisionDetection(gameplay.player, cameraController.collidables[i]) && cameraController.collidables[i].name=="water" && skillBook.swim==false)
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
					if ( utility.collisionDetection(gameplay.player, cameraController.collidables[i]) && cameraController.collidables[i].name=="tree")
					{
						this.collide();
					}	
					if ( utility.collisionDetection(gameplay.player, gameplay.blueCoin) && gameplay.blueCoin.visible==true)
					{
						skillBook.swim=true;
						this.blueCoin.visible=false;
						this.message("swim")
					
					}
					if ( utility.collisionDetection(gameplay.player, gameplay.grayCoin) && grayCoin.visible==true)
					{
						skillBook.climb=true;
						this.grayCoin.visible=false;
						this.message("climb");
					
					}				
				}
			}
			this.updateAnimation();
		}
	},
	
	render: function()
	{
		if (this.onPause)
		{
			pause.render();
		}
		else if (screensLoaded[ScreenState.WorldEvent])
		{
			backgroundSurface.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
			gameplaySurface.clearRect(0, 0, gameplayCanvas.width, gameplayCanvas.height);
			menuSurface.clearRect(0, 0, menuCanvas.width, menuCanvas.height);
			worldEventRender();
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
			
			gameplaySurface.drawImage
			(
			  
				this.observationInstance.sprite, 
				this.observationInstance.sourceX, this.observationInstance.sourceY, 
				this.observationInstance.sourceWidth, this.observationInstance.sourceHeight,
				Math.floor(this.observationInstance.x), Math.floor(this.observationInstance.y), 
				this.observationInstance.width, this.observationInstance.height
			);
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
		var obsX = Math.random() * (cameraController.gameWorld.width - 128) - this.observationInstance.width + 128;
		var obsY = Math.random() * (cameraController.gameWorld.height - 128) - this.observationInstance.height + 128;
		
		this.observationInstance.x = obsX;
		this.observationInstance.y = obsY;
		this.observationInstance.lowestPos = obsY;
		
		console.debug("x: " + obsX + " y: " + obsY);
	},
	
	placeBlue: function()
	{
		this.blueCoin.x=1000;
		this.blueCoin.y=128*2;
	},
	
	placeGray: function()
	{
		this.grayCoin.x=2000;
		this.grayCoin.y=1000;
	}
	
}



//Add keyboard listeners
window.addEventListener("keydown", function(event)
{
	if (event.keyCode == 16)
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
