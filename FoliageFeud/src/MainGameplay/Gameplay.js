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
messageType={
	water:0,
	rock:1,
	waterCoin:2,
	rockCoin:3,
	goldCoin:4,
	baseCampe:5,
	teleporter:6,
	blank:7,
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
	climbing: false,
	sprinting:false,
	questDisplay: false,
	curMap: [],
	curObjMap: [],
	teleporterCoords: [],
	obsCoords: [],
	gold:0,
	invasivesSeen: [],
	goldStorage:[],
	phrases: ["Ah! Sibling, you've seem to have found my previous assistant's handbook. While you're there, if you could grab the plant she was looking for, that'd be great!", 
			  "Come find me at my hq when you're done, we have important things to discuss. The  teleporter will take you straight there."],
	phraseIndex: 0,
	talking: false,
	visitedBrother: false,
	
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
		speed: 8,
		swimSpeed:6,
		walkSpeed: 10,
		runSpeed: 12,
		sprite: '',
		name: "player",
		animation: Animation.Idle
	}, 
	
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
		speed: 4,
		walkSpeed: 4,
		runSpeed: 8,
		visible: false,
		sprite: '',
		name: "dr parsnip",
		animation: Animation.Idle
	},
	
	unicorn: {
		// Sprite Located on sheet
		sourceX: 0,
		sourceY: 0,
		sourceWidth: 64,
		sourceHeight: 64,
		
		// Animation info
		numOfFrames: 4,
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
		name: "unicorn",
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
		sprite: '',
		plantIndex: -1,
		found: false
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
	goldCoin: {
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
		name: "gold coin",
		
		sprite: new Image()
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
	populateGold:function()
	{
		for(i=0;i<10;i++)
		{
			this.goldStorage[i]=Object.create(this.goldCoin);
			this.goldStorage[i].name="gold coin";
			this.goldStorage[i].x = Math.random() * (this.curMap[0].length * 64 + 300);
			this.goldStorage[i].y = Math.random() * (this.curMap.length * 64 - 300);
			console.debug ("gold x "+ this.goldStorage[i].x+" gold.y"+this.goldStorage[i].y)
			
		}
	
		
		
		
	},
	emptyGold:function()
	{
		for(i=0;i<this.goldStorage.length;i++)
		{
			this.goldStorage[i].pop();
			
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
		
		this.goldCoin.sprite = imgGoldCoin;
		
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
				this.player.numOfFrames = 9;
				this.player.sourceHeight = 64;
				this.player.height = 64;
				break;
			case SpriteState.Girl:
				this.player.sprite = imgFemaleSprite;
				this.player.numOfFrames = 9;
				this.player.sourceHeight = 64;
				this.player.height = 64;
				break;	
			case SpriteState.Parsnip:
				this.player.sprite = imgParsnipSprite;
				this.player.numOfFrames = 9;
				this.player.sourceHeight = 64;
				this.player.height = 64;
				break;
			case SpriteState.Dingle:
				this.player.sprite = imgDingleSprite;
				this.player.numOfFrames = 9;
				this.player.sourceHeight = 64;
				this.player.height = 64;
				break;
			case SpriteState.BlackDingle:
				this.player.sprite = imgBlackDingleSprite;
				this.player.numOfFrames = 9;
				this.player.sourceHeight = 64;
				this.player.height = 64;
				break;
			case SpriteState.Unicorn:
				this.player.sprite = imgUnicornSprite;
				this.player.numOfFrames = 4;
				this.player.sourceHeight = 64;
				this.player.height = 64;
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
	
	message:function()
	{
		
		var strings = [];
		this.writtingClear();
		this.writting=true;
		if(this.messageType=="water" )
		{	
			
				strings.push("Beware you dont know how to swim yet!!");
				utility.writeText(menuSurface, strings, 32, 50, 64 * 4 - 10, 25, false);
				
		}
		 else if(this.messageType =="waterCoin"  )
		{	
			if( cameraController.levelCounter ===0)
				strings.push(" You have gained the ability to swim! The swim ability is now unlocked in your skill book.");	
				utility.writeText(menuSurface, strings, 32, 50, 64 * 4, 25, false);
		}
		else if(this.messageType =="rockCoin")
		{
	
			strings.push("You can now climb! you can pass through rocks now");	
			utility.writeText(menuSurface, strings, 32, 50, 64 * 4 , 25, false);
		}
		else if( this.messageType =="rock")
		{
		
			strings.push("you must learn to climb to pass through that");	
			utility.writeText(menuSurface, strings, 32, 50, 64 * 4 - 10, 25, false);	
		}
		else if(this.messageType=="goldCoin ")
		{
			strings.push(" You acquired a gold coin! Use this to buy power ups at the shop");	
				utility.writeText(menuSurface, strings, 32, 50, 64 * 4 , 25, false);	
		}
		else if(this.messageType=="teleporter")
		{
			strings.push(" You must collect plants first!");	
			utility.writeText(menuSurface, strings, 32, 50, 64 * 4 - 10, 25, false);
		}
		else if(this.messageType=="blank")
		{
			strings.push(" ");
			utility.writeText(menuSurface, strings, 32, 50, 64 * 4 - 10, 25, false);
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
		if (!this.questDisplay && !this.talking) this.player.updateAnimation();
		for (var i = 0; i < this.observationInstances.length; i++)
		{
			this.observationInstances[i].updateAnimation();
		}
		this.blueCoin.updateAnimation();
		this.grayCoin.updateAnimation();
		for (var i = 0; i < this.goldStorage.length; i++) this.goldStorage[i].updateAnimation();
		this.teleporter.updateAnimation();
		if (this.parsnip.visible) this.parsnip.updateAnimation();
		//if (this.unicorn.visible) this.unicorn.updateAnimation();
		
	},
	
	checkMovement: function()
	{
		
		if(this.swimming)
		{
			this.player.speed=this.player.walkSpeed/2*skillBook.swimLevel;
		}
		
		 else if(this.sprinting&& !this.swimming)
		{
			this.player.speed=this.player.runSpeed*skillBook.sprintLevel;
		}
		else if(this.climbing)
		{
			this.player.speed=2*skillBook.climbLevel;
		}
		else
		{
			this.player.speed=this.player.walkSpeed;
		}
		
		
		try{
		if (gameplay.collisionTiles[Math.floor(this.player.y/64 + .5)][Math.floor(this.player.x/64 + .5)].name == "water" && currentSprite != SpriteState.Parsnip)
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
		/*
		if ((!moveRight && !moveLeft && !moveDown && !moveUp) ||
			(moveRight && moveLeft && !moveDown && !moveUp) ||
			(moveDown && moveUp && !moveRight && !moveLeft) ||
			(moveRight && moveLeft && moveDown && moveUp))
			*/
		if (this.player.vx == 0 && this.player.vy == 0 && currentSprite != SpriteState.Parsnip)
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
			if (!this.questDisplay && !this.talking) this.checkMovement();
			
			for (var i = 0; i < this.observationInstances.length; i++)
			{
				var obs = this.observationInstances[i];
				if (utility.collisionDetection(gameplay.player, obs))
				{
					this.removeObservationPoint(i, obs.plantIndex);
				}
			}
			/*try{
			if (this.collidingWithWater(this.player))
			{
				gameplay.swimming = true;
			}}catch(err) { console.debug(err); }*/
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
						if ( utility.collisionDetection(gameplay.player, collider) && collider.name=="water")
						{
							if(skillBook.swim==false)
							{
								this.collide();
								this.messageType="water";	
									
							}
						}
					
						if ( utility.collisionDetection(gameplay.player, collider) && collider.name=="tree")
						{
							this.collide();
						}	
						if ( utility.collisionDetection(gameplay.player, collider) && collider.name=="rock")
						{
							if(skillBook.climb==false)
							{
								this.collide();
								this.messageType="rock"
							}

							
		
						}
						
						if ( utility.collisionDetection(gameplay.player, gameplay.blueCoin) && gameplay.blueCoin.visible==true)
						{
							skillBook.swim=true;
							skillBook.swimLevel=1;
							this.blueCoin.visible=false;
							this.messageType="waterCoin";
						
						}
						if ( utility.collisionDetection(gameplay.player, gameplay.grayCoin) && gameplay.grayCoin.visible==true)
						{
							skillBook.climb=true;
							skillBook.climbLevel=1;
							this.grayCoin.visible=false;
							this.messageType="rockCoin";
						
						}
						if ( utility.collisionDetection(gameplay.player, gameplay.goldCoin) && gameplay.goldCoin.visible==true)
						{
							
							this.goldCoin.visible=false;
							this.messageType="goldCoin";
							var randGold=math.floor(math.random()*5);
							gameplay.gold= gameplay.gold+ randgold;
							this.tutorial=false;
						
						}	
						if ( utility.collisionDetection(gameplay.player, gameplay.teleporter.hitbox))
						{
							
							if(this.canTeleport && (this.visitedBrother || this.currentLevel == Level.Tutorial))
							{
								if (!this.onTeleport)
								{
									
									this.onTeleport = true;
									if (this.currentLevel != Level.BaseCamp)
									{
										this.nextLevel(Level.BaseCamp);
										this.messageType="blank";
									}
									else
									{
										
										currentScreen = ScreenState.SNASelectionScreen;
									}
								}
							}
							else
							{							}
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
				if (utility.collisionDetection(gameplay.player, gameplay.mainCamp.hitboxDoor))
				{
					if (!this.onMainCamp)
					{
						this.onMainCamp = true;
						currentScreen = ScreenState.SiblingInteraction;
					}
				}
				if (utility.collisionDetection(gameplay.player, gameplay.mainCamp.hitboxBack) || utility.collisionDetection(gameplay.player, gameplay.mainCamp.hitboxFront))
				{
					this.collide();
				}
				else
				{
					this.onMainCamp = false;
				}
				if (utility.collisionDetection(gameplay.player, gameplay.training.hitboxDoor) && this.visitedBrother)
				{
					if (!this.onTraining)
					{
						this.onTraining = true;
						currentScreen = ScreenState.TrainingMode;
					}
				}
				else
				{
					//message: I should visit my brother
				}
				if (utility.collisionDetection(gameplay.player, gameplay.training.hitbox))
				{
					this.collide();
				}
				else
				{
					this.onTraining = false;
				}
				if (utility.collisionDetection(gameplay.player, gameplay.plants.hitboxDoor) && this.visitedBrother)
				{
					if (!this.onPlants)
					{
						this.onPlants = true;
						currentScreen = ScreenState.Information;
					}
				}
				else
				{
					//message: I should visit my brother
				}
				if (utility.collisionDetection(gameplay.player, gameplay.plants.hitbox))
				{
					this.collide();
				}
				else
				{
					this.onPlants = false;
				}
				if (utility.collisionDetection(gameplay.player, gameplay.store.hitboxDoor) && this.visitedBrother)
				{
					switchGamemode(ScreenState.ShopScreen);
					this.collide();
				}
				else
				{
					//message: I should visit my brother
				}
				if (utility.collisionDetection(gameplay.player, gameplay.store.hitbox))
				{
					this.collide();
				}
				
			}
		}
	},
	
	nextLevel: function(map)
	{
		//this.emptyGold();
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
				this.drawBaseCamp();
			
				break;
			case Level.Map1:
				this.drawMap1();
				break;
			case Level.Forest:
				this.drawForest();
				this.populateGold();
				break;
			case Level.Marsh:
				this.drawMarsh();
				this.populateGold();
				break;
			case Level.Hilly:
				this.drawHilly();
				this.populateGold();
				break;
		}
		this.chooseSong(map);
		this.teleporter.hitbox.x = this.teleporter.x + 32;
		this.teleporter.hitbox.y = this.teleporter.y + 64;
		this.teleporter.hitbox.width = this.teleporter.width / 2;
		this.teleporter.hitbox.height = this.teleporter.height / 2;
		console.debug("Building level");
	},
	
	chooseSong: function(level)
	{
		switch(level)
		{
			case Level.BaseCamp:
				utility.startNewSong(songGameplayCamp);
				
				break;
			case Level.Map1:
				utility.startNewSong(songGameplayPrairie);
				break;
			case Level.Forest:
				utility.startNewSong(songGameplayForest);
				break;
			case Level.Marsh:
				utility.startNewSong(songGameplayMarsh);
				break;
			case Level.Hilly:
				utility.startNewSong(songGameplayHilly);
				break;
		}
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
		this.plants.hitbox = {
			x: this.plants.x + 16,
			y: this.plants.y + 160,
			width: this.plants.width - 32,
			height: this.plants.height - 160
		}
		this.plants.hitboxDoor = {
			x: this.plants.x + 64 - .05,
			y: this.plants.y + 128 + 64,
			width: 0.1,
			height: 64
		}
		
		this.training.x = 9 * 64;
		this.training.y = 32;
		this.training.hitbox = {
			x: this.training.x + 8,
			y: this.training.y + 160,
			width: this.training.width - 16,
			height: this.training.height - 160
		}
		this.training.hitboxDoor = {
			x: this.training.x + 64 + 24,
			y: this.training.y + 128 + 64,
			width: 0.1,
			height: 64
		}
		
		this.mainCamp.x = 12 * 64;
		this.mainCamp.y =  32;
		this.mainCamp.hitboxBack = {
			x: this.mainCamp.x + 8,
			y: this.mainCamp.y + 160,
			width: this.mainCamp.width - 16,
			height: this.mainCamp.height - 48 - 160
		}
		this.mainCamp.hitboxFront = {
			x: this.mainCamp.x + 32,
			y: this.mainCamp.y + 160,
			width: this.mainCamp.width - 64,
			height: this.mainCamp.height - 160
		}
		this.mainCamp.hitboxDoor = {
			x: this.mainCamp.x + 64 - .05,
			y: this.mainCamp.y + 128 + 64,
			width: 0.1,
			height: 64
		}
		
		this.store.x = 15 * 64;
		this.store.y = 32;
		this.store.hitbox = {
			x: this.store.x + 16,
			y: this.store.y + 160,
			width: this.store.width - 32,
			height: this.store.height - 160
		}
		this.store.hitboxDoor = {
			x: this.store.x + 64 - .05,
			y: this.store.y + 128 + 64,
			width: 0.1,
			height: 64
		}
		
		
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
		this.message();
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
			strings = [];
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
			if (this.parsnip.visible) sprites.push(this.parsnip);
			if (this.unicorn.visible) sprites.push(this.unicorn);
			if (this.goldStorage.length > 0) sprites = sprites.concat(this.goldStorage);
			cameraController.renderForeground(sprites);
			
			if (this.onPause)
			{
				pause.render();
			}
		}
		
		// Render compass and compass arrow
		if (currentScreen != ScreenState.WorldEvent)
		{
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
			
			if (this.questDisplay)
			{
				utility.drawImage(
					menuSurface, imgQuestLog,
					0,0, imgQuestLog.width, imgQuestLog.height,
					(CANVAS_WIDTH - imgQuestLog.width) / 2, 0, imgQuestLog.width, imgQuestLog.height
				);
				var strings = ["               Plants I need to find"];
				for (var i = 0; i < quests.plantsToIdentify.length; i++)
				{
					strings.push("Plant: " + plantList[quests.plantsToIdentify[i]].name + "   Region: " + regions[quests.regionsToVisit[i]]);
				}
				utility.writeText(menuSurface, strings, (CANVAS_WIDTH - imgQuestLog.width) / 2 + 64, 72, imgQuestLog.width, 16, false)
			}
			
			if (this.talking)
			{
				x = 0;
				y = CANVAS_HEIGHT - imgLargeTextBox.height;
				utility.drawImage(
					menuSurface, imgLargeTextBox,
					0, 0, imgLargeTextBox.width, imgLargeTextBox.height,
					x, y, imgLargeTextBox.width, imgLargeTextBox.height
				);
				try {
					utility.writeText(menuSurface, [this.phrases[this.phraseIndex]], x + 32, y + 48 , imgSmallTextBox.width - 64, 24, false);
				} catch (err) { }
				
				utility.clearClickHandler();
				utility.writeForClick(menuSurface, ["Enter"], x + imgLargeTextBox.width - 104, y + 96, 64, 30, false, [gameplay.incrementPhrase, []])
			}
		}
		
	},
	
	incrementPhrase: function(empty)
	{
		gameplay.phraseIndex += 1;
		console.debug("Phrase Index: " + gameplay.phraseIndex);
	},
	
	// Randomly places the observationInstance on the map
	placeObservationEvent: function()
	{
		var listOfPlants = quests.plantsInARegion(this.currentLevel);
		for (var i = this.observationInstances.length; i < listOfPlants.length; i++)
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
			
			obsPoint.plantIndex = listOfPlants[i][1];
			
			/*
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
			*/
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
	
	placeGold:function()
	{
		if(this.currentLevel==Level.Tutorial)
		{
			for(i=0;i<this.goldStorage.length;i++)
			{
				utility.drawImage(
					gameplaySurface, imgGoldCoin,
					0, 0, imgGoldCoin.width, imgGoldCoin.height,
					this.goldStorage[i].x, this.goldStorage[i].y, imgGoldCoin.width, imgGoldCoin.height
				);
			}
		}
	},

	
	removeObservationPoint: function(index, plantIndex)
	{
		if (this.currentLevel == Level.Tutorial && this.phraseIndex < this.phrases.length)
		{
			this.talking = true;
			
		}
		else
		{
			this.talking = false;
			console.debug("index: " + index + " plantIndex: " + plantIndex);
			this.observationInstances.splice(index, 1);
			ispy.setRequested(quests.plantsToIdentify[plantIndex]);
			quests.removeQuest(plantIndex);
			switchGamemode(ScreenState.Observation);
			this.canTeleport = true;
		}
	},
	
	collidingWithWater: function(obj)
	{
		xLeft = Math.floor(obj.x + obj.width / 4);
		xRight = Math.floor(obj.x + 3 * obj.width / 4);
		yTop = Math.floor(obj.y + obj.height / 4);
		yBottom = Math.floor(obj.y + 3 * obj.height / 4);
		
		if ( this.collisionTiles[xLeft][yTop].name == "water" &&
			 this.collisionTiles[xLeft][yBottom].name == "water" &&
			 this.collisionTiles[xRight][yTop].name == "water" &&
			 this.collisionTiles[xRight][yBottom].name == "water")
			 return true;
		else
			return false;
	}
}



//Add keyboard listeners
window.addEventListener("keydown", function(event)
{
	if (event.keyCode == 16)// && skillBook.sprint== true)
	{
		gameplay.sprinting=true;
		gameplay.player.speed = gameplay.player.runSpeed*skillBook.sprintLevel;
		
	}
	if (event.keyCode == 75)// && skillBook.sprint== true)
	{		
		
			skillBook.display=true;
	}
	if (event.keyCode >= LEFT && event.keyCode <= DOWN)
	{
		event.preventDefault();
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
		gameplay.sprinting=false;
		gameplay.player.speed = gameplay.player.walkSpeed;
	}
	if (event.keyCode == 75)// && skillBook.sprint== true)
	{		
		
			skillBook.display=false;
			gameplay.writtingClear();
	}
	if (event.keyCode == 81)
	{
		gameplay.questDisplay = !gameplay.questDisplay;
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
			if (gameplay.talking)
			{
				if (gameplay.phraseIndex < gameplay.phrases.length) gameplay.phraseIndex += 1;
			}
			else if (mainCamp.talkingInMainCamp)
			{
				if (mainCamp.broTalk != 12)
				{
					mainCamp.broTalk = (mainCamp.broTalk + 1) % (mainCamp.dingle.phrases.length - 1);
				}
				else
				{
					mainCamp.exitToGameplay("");
				}
			}
			else if (!gameplay.onPause)
			{
				if (currentScreen == ScreenState.Gameplay)
				{
					console.debug("Enter Pause");
					pause.mapXOffset = 13;
					pause.mapYOffset = 6;
					pause.mapScale = MIN_MAP_SCALE;
					gameplay.onPause = true;
					moveDown = false;
					moveLeft = false;
					moveRight = false;
					moveUp = false;
				}
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
