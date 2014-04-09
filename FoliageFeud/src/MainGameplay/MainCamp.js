// A script for the Sibling interaction to be given
// quests and return quests.

var mainCamp = {
	listOfQuests: [],
	background: new Image(),
	
	init: function()
	{
		this.background.src = "../img/Backgrounds/iSpyMenu.png";
	},
	
	render: function()
	{
		menuSurface.drawImage(
			this.background,
			0, 0
		);
	},
	
	giveQuest: function()
	{
		
	}
};