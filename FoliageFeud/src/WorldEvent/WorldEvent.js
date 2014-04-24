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
	offset: 32,
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
	
	wall: {
		x: 0,
		y: 0,
		width: 128,
		height: 512,
		sprite: new Image()
	},
	
	init: function()
	{
		utility.clearAll();
		
		this.playerVars = [gameplay.player.x, gameplay.player.y, gameplay.player.speed, gameplay.player.animation];
		this.cameraPosition = [cameraController.camera.x, cameraController.camera.y];
		
		cameraController.buildMap(this.worldEventMap, 0);
		
		cameraController.camera.x = 0;
		cameraController.camera.y = 0;
		
		gameplay.player.x = 5 * gameplay.player.width;
		gameplay.player.y = 5 * gameplay.player.height + this.offset;
		gameplay.player.speed = gameplay.player.runSpeed;
		gameplay.player.animation = Animation.WorldEventRight;
		
		createScenery.init();
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
		cameraController.camera.x = this.cameraPosition[0];
		cameraController.camera.y = this.cameraPosition[1];
		createScenery.onExit();
		
		cameraController.buildMap(allLevelMaps[cameraController.levelCounter], 0);
		cameraController.buildMap(allObjectMaps[cameraController.levelCounter], 1);
		gameplay.render();
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
		if (utility.collisionDetection(this.wall, gameplay.player))
		{
			exiting[currentScreen] = true;
		}
		if (this.checkmarks.length >= 5)
		{
			exiting[currentScreen] = true;
		}
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
		
		for (var i = 0; i < this.checkmarks.length; i++)
		{
			menuSurface.drawImage(
				imgCheckmark,
				i * 64, 0,
				64, 64
				);
		}
		
	},
	
	askQuestion: function()
	{
		this.questionBeingAsked = true;
		
		numsChosen = [-1, -1, -1];
		
		var curQuestion = 0;
		this.questionImageIndex = Math.floor(Math.random() * this.questions.length);
		this.questions[this.questionImageIndex].correct = true;
		while (curQuestion < 3)
		{
			var index = Math.floor(Math.random() * plantList.length);
			if (index == numsChosen[0] ||
				index == numsChosen[1] ||
				index == numsChosen[2]){ 
					continue;
				}
			else
			{
				this.questions[curQuestion].name = plantList[index].name;
				if (this.questions[curQuestion].correct)
				{
					this.correctImage = plantList[index].sprite[0];
					console.debug(curQuestion + ": " + this.questions[curQuestion].name);
					
				}
				curQuestion++;
			}
		}
		
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
		var x = gameplayCanvas.width - 480;
		var y = gameplayCanvas.height / 4;
		var maxWidth = 256;
		
		utility.clearClickHandler();
		
		for (var i = 0; i < this.questions.length; i++)
		{
			utility.writeForClick(menuSurface, [this.questions[i].name], x, y + topOffset + (textSize * i * 2), maxWidth, textSize, false, [this.answerQuestion, i]);
		}
		
		menuSurface.drawImage(
			this.correctImage,
			gameplayCanvas.width / 2 - 64, gameplayCanvas.height / 4,
			128, 128
			);
			
		menuSurface.drawImage(
			imgTimerBg,
			gameplayCanvas.width / 2 - 64, gameplayCanvas.height / 4 - 64,
			256, 32
			);
		menuSurface.drawImage(
			imgTimer,
			gameplayCanvas.width / 2 - 62, gameplayCanvas.height / 4 - 62,
			Math.floor(256*this.countdown/this.countdownFull), 32
			);
	}
}
