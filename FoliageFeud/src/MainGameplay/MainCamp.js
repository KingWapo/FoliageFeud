// A script for the Sibling interaction to be given
// quests and return quests.

var mainCamp = {
	listOfQuests: [],
	background: new Image(),
	exitButton: new Image(),
	
	init: function()
	{
		this.background.src = "../img/Backgrounds/iSpyMenu.png";
		this.exitButton.src = "../img/Buttons/exitButton.png";
		
		this.listOfQuests = [];
		
		for (var i = quests.plantsToIdentify.length; i < quests.questLimit; i++)
		{
			var newPlant;
			
			if (this.listOfQuests.length < 1)
			{
				do
				{
					newPlant = plant.getRandUnHarvested();
				} while (utility.contains(quests.plantsToIdentify, newPlant));
			}
			else
			{
				do
				{
					newPlant = plant.getRandUnHarvested();
				} while (utility.contains(this.listOfQuests, newPlant) || utility.contains(quests.plantsToIdentify, newPlant));
			}
			
			this.listOfQuests.push(newPlant);
		}
		
		this.updateQuests();
	},
	
	updateQuests: function()
	{
		utility.clearAll();
		
		menuSurface.drawImage(
			this.background,
			0, 0
		);
		
		for (var i = 0; i < this.listOfQuests.length; i++)
		{
			var plantName = plantList[this.listOfQuests[i]].name;
			
			utility.writeForClick(menuSurface, [plantName], .45 * menuCanvas.width, .25 * menuCanvas.height + (60 * i), menuCanvas.width / 2, 30, true, [quests.addQuestFromSibling, [this.listOfQuests[i], 2]]);
		}
		
		menuSurface.drawImage(
			this.exitButton,
			menuCanvas.width - 320, menuCanvas.height - 160
		);
		
		utility.addClickItem(menuCanvas.width - 320, menuCanvas.height - 160, this.exitButton.width, this.exitButton.height, this.exitToGameplay, "");
	},
	
	render: function()
	{
	
	},
	
	giveQuest: function()
	{
		
	},
	
	exitToGameplay: function(empty)
	{
		entering[currentScreen] = true;
		currentScreen = ScreenState.Gameplay;
	}
};