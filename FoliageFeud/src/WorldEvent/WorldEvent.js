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
	timer: new Image(),
	timerBackground: new Image(),
	checkmarks: [],
	checkmarkSprite: new Image(),
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
		this.playerVars = [gameplay.player.x, gameplay.player.y, gameplay.player.speed, gameplay.player.animation];
		this.cameraPosition = [cameraController.camera.x, cameraController.camera.y];
		
		cameraController.buildMap(this.worldEventMap, 0);
		
		cameraController.camera.x = 0;
		cameraController.camera.y = 0;
		
		gameplay.player.x = 5 * gameplay.player.width;
		gameplay.player.y = 5 * gameplay.player.height + this.offset;
		gameplay.player.speed = gameplay.player.runSpeed;
		gameplay.player.animation = Animation.WorldEventRight;
		
		this.wall.sprite.src = "../img/WorldEvent/WALL.png";
		this.timer.src = "../img/WorldEvent/timer.png";
		this.timerBackground.src = "../img/WorldEvent/timerBackground.png";
		this.checkmarkSprite.src = "../img/WorldEvent/checkmark.png";
		
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
			gameplay.player.x += this.speedBoost;
			gameplay.player.updateAnimation();
			createScenery.update();
			if (this.speedBoost == 0 && Math.random() * 1000 < 10) // .1% chance of question being asked and only when the player doesn't have a speedBoost
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
				this.checkmarkSprite,
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
				index == numsChosen[2]){ }
			else
			{
				this.questions[curQuestion].name = plantList[index].name;
				if (this.questions[curQuestion].correct)
				{
					this.correctImage = plantList[index].sprite[0];
				}
				curQuestion++;
			}
		}
		
	},
	
	answerQuestion: function(index)
	{
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
		this.checkmarks.push(Object.create(this.checkmarkSprite));
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
		utility.writeText(menuSurface, [this.questions[0].name, this.questions[1].name, this.questions[2].name], gameplayCanvas.width - 480, gameplayCanvas.height / 4 + 32, 256, 16, false);
		utility.addClickItem(gameplayCanvas.width - 480, gameplayCanvas.height / 4 + 16, 256, 16, this.answerQuestion, 0)
		utility.addClickItem(gameplayCanvas.width - 480, gameplayCanvas.height / 4 + 48, 256, 16, this.answerQuestion, 1)
		utility.addClickItem(gameplayCanvas.width - 480, gameplayCanvas.height / 4 + 80, 256, 16, this.answerQuestion, 2)
		menuSurface.drawImage(
			this.correctImage,
			gameplayCanvas.width / 2 - 64, gameplayCanvas.height / 4,
			128, 128
			);
			
		menuSurface.drawImage(
			this.timerBackground,
			gameplayCanvas.width / 2 - 64, gameplayCanvas.height / 4 - 64,
			256, 32
			);
		menuSurface.drawImage(
			this.timer,
			gameplayCanvas.width / 2 - 62, gameplayCanvas.height / 4 - 62,
			Math.floor(256*this.countdown/this.countdownFull), 32
			);
	}
}
