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
		
		for (var i = quests.plantsToIdentify.length; i < quests.questLimit; i++)
		{
			var newPlant;
			
			do
			{
				newPlant = Math.floor(Math.random() * plantList.length);
			} while (utility.contains(quests.plantsToIdentify, newPlant) || plantList[newPlant].harvested)
			
			this.listOfQuests.push(newPlant);
		}
		
		menuSurface.drawImage(
			this.background,
			0, 0
		);
		
		for (var i = 0; i < this.listOfQuests.length; i++)
		{
			var plantName = plantList[this.listOfQuests[i]].name;
			
			utility.writeForClick(menuSurface, [plantName], .45 * menuCanvas.width, .25 * menuCanvas.height + (60 * i), menuCanvas.width / 2, 30, true, [quests.addQuest, this.listOfQuests[i]]);
		}
		
		menuSurface.drawImage(
			this.exitButton,
			menuCanvas.width - 320, menuCanvas.height - 160
		);
		
		utility.addClickItem(menuCanvas.width - 320, menuCanvas.height - 160, this.exitButton.width, this.exitButton.height, this.exitToGameplay, "")
	},
	
	render: function()
	{
	
	},
	
	giveQuest: function()
	{
		
	},
	
	exitToGameplay: function(empty)
	{
		currentScreen = ScreenState.Gameplay;
	}
};