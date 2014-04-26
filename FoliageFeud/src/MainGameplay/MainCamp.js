// A script for the Sibling interaction to be given
// quests and return quests.

var mainCamp = {
	listOfQuests: [],
	
	init: function()
	{
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
	},
	
	render: function()
	{
		utility.clearAll();
		
		utility.drawImage(
			menuSurface, imgCommonBg,
			0, 0, imgCommonBg.width, imgCommonBg.height,
			0, 0, imgCommonBg.width, imgCommonBg.height
		);
		
		for (var i = 0; i < this.listOfQuests.length; i++)
		{
			var plantName = plantList[this.listOfQuests[i]].name;
			
			utility.writeForClick(menuSurface, [plantName], .45 * CANVAS_WIDTH, .25 * CANVAS_HEIGHT + (60 * i), CANVAS_WIDTH / 2, 30, true, [quests.addQuestFromSibling, [this.listOfQuests[i], 2]]);
		}
		
		utility.drawImage(
			menuSurface, imgExitButton,
			0, 0, imgExitButton.width, imgExitButton.height,
			CANVAS_WIDTH - 320, CANVAS_HEIGHT - 160, imgExitButton.width, imgExitButton.height
		);
		
		utility.addClickItem(CANVAS_WIDTH - 320, CANVAS_HEIGHT - 160, imgExitButton.width, imgExitButton.height, this.exitToGameplay, "");
	},
	
	giveQuest: function()
	{
		
	},
	
	exitToGameplay: function(empty)
	{
		entering[ScreenState.SiblingInteraction] = true;
		currentScreen = ScreenState.Gameplay;
		utility.clearAll();
	}
};