// Script to run the Training selection screen
// Created by Iron Man on 4/26/2014

var trainingScreen = {

	goldBet: 0,
	
	init: function()
	{
		utility.addClickItem(64, 64, imgTrainingBackground.width, imgTrainingBackground.height, this.goToWorldEvent, "");
		utility.addClickItem(64 + 320 + 32, 64, imgTrainingBackground.width, imgTrainingBackground.height, this.goToIspy, "");
		utility.addClickItem(64 + 2 * (320 + 32), 64, imgTrainingBackground.width, imgTrainingBackground.height, this.goToMatching, "");
	},
	
	render: function()
	{
		gameplay.render();
		
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
	},
	
	goToWorldEvent: function(empty)
	{
		entering[ScreenState.TrainingMode] = true;
		currentScreen = ScreenState.WorldEvent;
	},
	
	goToIspy: function()
	{
		ispy.fromTraining = true;
		switchGamemode(ScreenState.Observation);
	},
	
	goToMatching: function()
	{
		entering[ScreenState.TrainingMode] = true;
		currentScreen = ScreenState.Matching;
	}
};