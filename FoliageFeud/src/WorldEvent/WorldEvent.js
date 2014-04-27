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
	training: false,
	xMovement: 0,
	playerVars: [],
	cameraPosition: [],
	unicornVars: [],
	offset: 64,
	questionBeingAsked: false,
	questionImageIndex: -1,
	correctImage: new Image(),
	speedBoost: 0,
	speedCooldown: 30,
	countdown: 300,
	countdownFull: 300,
	checkmarks: [],
	questions: [
		{
			name: "",
			correct: false
		},
		{
			name: "",
			correct: false
		},
		{
			name: "",
			correct: false
		}],
	
	coin: {
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
	
	init: function()
	{
		utility.clearAll();
		
		this.playerVars = [gameplay.player.x, gameplay.player.y, gameplay.player.speed, gameplay.player.animation];
		this.cameraPosition = [cameraController.camera.x, cameraController.camera.y];
		this.unicornVars = [gameplay.unicorn.x, gameplay.unicorn.y, gameplay.unicorn.animation, gameplay.unicorn.visible];
		
		cameraController.buildMap(this.worldEventMap, 0);
		
		cameraController.camera.x = 0;
		cameraController.camera.y = 0;
		
		gameplay.player.x = 5 * gameplay.player.width;
		gameplay.player.y = 5 * gameplay.player.height + this.offset;
		gameplay.player.speed = gameplay.player.runSpeed;
		gameplay.player.animation = Animation.WorldEventRight;
		
		gameplay.unicorn.x = gameplay.unicorn.width;
		gameplay.unicorn.y = gameplay.player.y;
		gameplay.unicorn.visible = true;
		
		this.coin.x = CANVAS_WIDTH - this.coin.width - 128;
		this.coin.y = gameplay.player.y;
		
		createScenery.init();
		
		utility.startNewSong(songWorldEvent);
	},
	
	onExit: function()
	{
		this.speedBoost = 0;
		this.speedCooldown = 30;
		this.checkmarks = [];
		
		gameplay.player.x = this.playerVars[0];
		gameplay.player.y = this.playerVars[1];
		gameplay.player.walkSpeed = this.playerVars[2];
		gameplay.player.animation = this.playerVars[3];
		gameplay.player.currentFrame = 0;
		cameraController.camera.x = this.cameraPosition[0];
		cameraController.camera.y = this.cameraPosition[1];
		gameplay.unicorn.x = this.unicornVars[0];
		gameplay.unicorn.y = this.unicornVars[1];
		gameplay.unicorn.animation = this.unicornVars[2];
		gameplay.unicorn.visible = this.unicornVars[3];
		createScenery.onExit();
		
		cameraController.buildMap(allLevelMaps[gameplay.currentLevel], 0);
		cameraController.buildMap(allObjectMaps[gameplay.currentLevel], 1);
		gameplay.render();
		gameplay.chooseSong(gameplay.currentLevel);
		currentScreen = ScreenState.Gameplay;
	},
	
	update: function()
	{
		if (!this.questionBeingAsked)
		{
			gameplay.player.x = utility.clamp(gameplay.player.x + this.speedBoost, 0, gameplayCanvas.width);
			gameplay.player.updateAnimation();
			createScenery.update();
			if (this.speedBoost == 0 && Math.random() * 1000 < 10 && !this.questionBeingAsked) // .1% chance of question being asked and only when the player doesn't have a speedBoost
			{
				this.askQuestion();
			}
			else if (this.speedBoost != 0)
			{
				this.speedCooldown--;
				if (this.speedCooldown <= 0)
				{
					this.speedBoost = 0;
					this.speedCooldown = 30;
				}
			}
			
		}
		
		this.coin.updateAnimation();
		
		if (gameplay.player.x <= gameplay.unicorn.x + gameplay.unicorn.width)
		{
			exiting[currentScreen] = true;
		}
		if (gameplay.player.x + gameplay.player.width >= this.coin.x)
		{
			exiting[currentScreen] = true;
		}
	},
	
	render: function()
	{
		gameplay.render();
		cameraController.renderBackground();
		utility.drawImage(
			gameplaySurface, this.coin.sprite,
			this.coin.sourceX, this.coin.sourceY, this.coin.sourceWidth, this.coin.sourceHeight,
			this.coin.x, this.coin.y, this.coin.width, this.coin.height
			);
		createScenery.render();
		utility.debugDimensions(gameplay.unicorn);
			
		if (this.questionBeingAsked)
		{
			if (this.countdown > 0)
			{
				this.renderQuestion();
				this.countdown -= 1;
			}
			else
			{
				this.questions[0].correct = false;
				this.answerQuestion(0);
			}
		}
	},
	
	askQuestion: function()
	{
		this.questionBeingAsked = true;
		
		numsChosen = plant.getMultiplePlants(3);
		
		var answerIndex = Math.floor(Math.random() * this.questions.length);
		
		this.questions[answerIndex].correct = true;
		
		for (var i = 0; i < this.questions.length; i++)
		{
			this.questions[i].name = plantList[numsChosen[i]].name;
		}
		
		this.correctImage = plantList[numsChosen[answerIndex]].sprite[0];
		console.debug(answerIndex + ": " + this.questions[answerIndex].name);
	},
	
	answerQuestion: function(index)
	{
		console.debug("Answer guessed is: " + index + ": " + worldEvent.questions[index].name);
		if (worldEvent.questions[index].correct)
		{
			worldEvent.speedBoost = 5;
			worldEvent.summonCheckmark();
			console.debug("Congrats!!");
		}
		else
		{
			worldEvent.speedBoost = -5;
			console.debug("Awww darn");
		}
		worldEvent.questionBeingAsked = false;
		utility.clearClickHandler();
		worldEvent.resetQuestions();
	},
	
	summonCheckmark: function()
	{
		this.checkmarks.push(Object.create(imgCheckmark));
	},
	
	resetQuestions: function()
	{
		for (var i = 0; i < 3; i++)
		{
			this.questions[i].name = "";
			this.questions[i].correct = false;
		}
		this.countdown = this.countdownFull;
	},
	
	renderQuestion: function()
	{
		var textSize = 16;
		var topOffset = 32;
		var x = CANVAS_WIDTH - 480;
		var y = CANVAS_HEIGHT / 4;
		var maxWidth = 256;
		
		utility.clearClickHandler();
		
		for (var i = 0; i < this.questions.length; i++)
		{
			utility.writeForClick(menuSurface, [this.questions[i].name], x, y + topOffset + (textSize * i * 2), maxWidth, textSize, false, [this.answerQuestion, i]);
		}
		
		utility.drawImage(menuSurface,
			this.correctImage,
			0, 0,
			this.correctImage.width, this.correctImage.height,
			CANVAS_WIDTH / 2 - 64, CANVAS_HEIGHT / 4,
			128, 128
			);
		utility.drawImage(menuSurface,
			imgTimerBg,
			0, 0,
			imgTimerBg.width, imgTimerBg.height,
			CANVAS_WIDTH / 2 - 64, CANVAS_HEIGHT / 4 - 64,
			256, 32
			);
		utility.drawImage(menuSurface,
			imgTimer,
			0, 0,
			imgTimer.width, imgTimer.height,
			CANVAS_WIDTH / 2 - 62, CANVAS_HEIGHT / 4 - 62,
			Math.floor(256*this.countdown/this.countdownFull), 32
			);
	}
}
