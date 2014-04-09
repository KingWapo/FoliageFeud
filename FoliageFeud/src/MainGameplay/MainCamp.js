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
			this.listOfQuests.push("Horsetail");
		}
		
		utility.addClickItem(menuCanvas.width - 320, menuCanvas.height - 160, this.exitButton.width, this.exitButton.height, this.exitToGameplay, "")
	},
	
	render: function()
	{
		menuSurface.drawImage(
			this.background,
			0, 0
		);
		
		utility.writeText(menuSurface, this.listOfQuests, .45 * menuCanvas.width, .25 * menuCanvas.height, menuCanvas.width / 2, 30, true);
		
		menuSurface.drawImage(
			this.exitButton,
			menuCanvas.width - 320, menuCanvas.height - 160
		);
	},
	
	giveQuest: function()
	{
		
	},
	
	exitToGameplay: function(empty)
	{
		currentScreen = ScreenState.Gameplay;
	}
};