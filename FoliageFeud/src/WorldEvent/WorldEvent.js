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
	offset: 10,
	questionBeingAsked: false,
	questionImageIndex: -1,
	correctImage: new Image(),
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
		width: 128,
		sprite: new Image()
	},
	
	init: function()
	{
		this.playerVars = [gameplay.player.x, gameplay.player.y, gameplay.player.speed, gameplay.player.animation];
		this.cameraPosition = [cameraController.camera.x, cameraController.camera.y];
		
		cameraController.buildMap(this.worldEventMap);
		
		cameraController.camera.x = 0;
		cameraController.camera.y = 0;
		
		gameplay.player.x = 5 * gameplay.player.width;
		gameplay.player.y = 5 * gameplay.player.height + this.offset;
		gameplay.player.speed = gameplay.player.runSpeed;
		gameplay.player.animation = Animation.WorldEventRight;
		
		this.wall.sprite.src = "../img/WorldEvent/WALL.png";
		
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
		
		
		
		currentScreen = ScreenState.Gameplay;
	},
	
	update: function()
	{
		if (!this.questionBeingAsked)
		{
			gameplay.player.updateAnimation();
			createScenery.update();
			if (Math.random() * 1000 < 10)
			{
				this.askQuestion();
			}
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
			this.renderQuestion();
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
			console.debug("Congrats!!");
		}
		else
		{
			console.debug("Awww darn");
		}
		worldEvent.questionBeingAsked = false;
		utility.clearClickHandler();
		worldEvent.resetQuestions();
	},
	
	resetQuestions: function()
	{
		for (var i = 0; i < 3; i++)
		{
			this.questions[i].name = "";
			this.questions[i].correct = false;
		}
	},
	
	renderQuestion: function()
	{
		utility.writeText(menuSurface, [this.questions[0].name, this.questions[1].name, this.questions[2].name], gameplayCanvas.width - 480, gameplayCanvas.height / 4 + 32, 256, 16);
		utility.addClickItem(gameplayCanvas.width - 480, gameplayCanvas.height / 4 + 16, 256, 16, this.answerQuestion, 0)
		utility.addClickItem(gameplayCanvas.width - 480, gameplayCanvas.height / 4 + 48, 256, 16, this.answerQuestion, 1)
		utility.addClickItem(gameplayCanvas.width - 480, gameplayCanvas.height / 4 + 80, 256, 16, this.answerQuestion, 2)
		menuSurface.drawImage(
			this.correctImage,
			gameplayCanvas.width / 2 - 64, gameplayCanvas.height / 4,
			128, 128
			);
	}

}
