// Script to run the Training selection screen
// Created by Iron Man on 4/26/2014

var trainingScreen = {
	init: function()
	{
	},
	
	render: function()
	{
		utility.clearAll();
		
		gameplay.render();
		
		utility.addClickItem(64, 64, 320, 285, this.goToWorldEvent, "");
		utility.addClickItem(64 + 320 + 32, 64, 320, 285, this.goToIspy, "");
		utility.addClickItem(64 + 2 * (320 + 32), 64, 320, 285, this.goToMatching, "");
		
		utility.drawImage(
			menuSurface, imgTrainingBackground,
			0, 0, imgTrainingBackground.width, imgTrainingBackground.height,
			64, 64, 320, 285
		);
		
		utility.writeText(menuSurface, ["World Event Race"], 96 - 8, 296, 304, 32, false);
		
		utility.drawImage(
			menuSurface, imgTrainingBackground,
			0, 0, imgTrainingBackground.width, imgTrainingBackground.height,
			64 + 320 + 32, 64, 320, 285
		);
		
		utility.writeText(menuSurface, ["Find That Plant"], 64 + 320 + 64 , 296, 304, 32, false);
		
		utility.drawImage(
			menuSurface, imgTrainingBackground,
			0, 0, imgTrainingBackground.width, imgTrainingBackground.height,
			64 + 2 * (320 + 32), 64, 320, 285
		);
		
		utility.writeText(menuSurface, ["Speed Matching"], 64 + 2 * (320 + 32) + 32, 296, 304, 32, false);
		
		var boxX = 940;
		var boxY = 400;
		var boxW = 200;
		var boxH = 96;
		var textYOffset = 80;
		
		utility.drawImage(
			menuSurface, imgSmallTextBox,
			0, 0, imgSmallTextBox.width, imgSmallTextBox.height,
			boxX, boxY, boxW, boxH
		)
		
		utility.writeText(menuSurface, ["Make a wager"], boxX + 16, boxY + textYOffset - 48, 200 - 32, 24, false);
		if (trainingGame.goldWagered > 0)
			utility.writeForClick(menuSurface, ["-"], boxX + 16, boxY + textYOffset, 32, 32, false, [trainingGame.goldDown, ['']]);
			
		utility.writeText(menuSurface, ["" + trainingGame.goldWagered], boxX + 80, boxY + textYOffset, 128, 32, false);
		
		if (trainingGame.goldWagered < gameplay.gold)
			utility.writeForClick(menuSurface, ["+"], boxX + 164, boxY + textYOffset, 32, 32, false, [trainingGame.goldUp, ['']]);
	},
	
	goToWorldEvent: function(empty)
	{
		trainingGame.wager();
		entering[ScreenState.TrainingMode] = true;
		currentScreen = ScreenState.WorldEvent;
	},
	
	goToIspy: function()
	{
		trainingGame.wager();
		ispy.fromTraining = true;
		entering[ScreenState.TrainingMode] = true;
		switchGamemode(ScreenState.Observation);
	},
	
	goToMatching: function()
	{
		trainingGame.wager();
		entering[ScreenState.TrainingMode] = true;
		currentScreen = ScreenState.Matching;
	}
};

var trainingGame = {
	goldWagered: 0,
	returnRate: 0,
	
	goldDown: function()
	{
		trainingGame.goldWagered -= 1;
	},
	
	goldUp: function()
	{
		trainingGame.goldWagered += 1;
	},
	
	wager: function()
	{
		gameplay.gold -= trainingGame.goldWagered;
		console.debug("goldleft ", gameplay.gold);
	},
	
	finishGame: function()
	{
		var goldWon = Math.floor(trainingGame.goldWagered * trainingGame.returnRate)
		gameplay.gold += goldWon;
		console.debug("goldwon ", goldWon);
	}
};