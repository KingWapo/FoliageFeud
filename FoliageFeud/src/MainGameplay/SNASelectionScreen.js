// Script to select the SNA level to go to

var snaSelect = {
	background: new Image(),
	Map1: new Image(),
	
	init: function()
	{
		this.background.src = "../img/Backgrounds/iSpyMenu.png";
		this.Map1.src = "../img/Tokens/cat.png";
		
		utility.addClickItem(128, 128, this.Map1.width, this.Map1.height, this.goToMap1, "");
	},
	
	render: function()
	{
		menuSurface.drawImage(
			this.background,
			0, 0
		);
		
		menuSurface.drawImage(
			this.Map1,
			128, 128
		);
	},
	
	goToMap1: function(empty)
	{
		gameplay.nextLevel(Level.Map1);
		currentScreen = ScreenState.Gameplay;
	}

};