// Script to select the SNA level to go to

var snaSelect = {
	background: new Image(),
	Map1: new Image(),
	
	init: function()
	{
		utility.addClickItem(128, 128, imgMap1.width, imgMap1.height, this.goToMap1, "");
	},
	
	render: function()
	{
		menuSurface.drawImage(
			imgCommonBg,
			0, 0
		);
		
		menuSurface.drawImage(
			imgMap1,
			128, 128
		);
	},
	
	goToMap1: function(empty)
	{
		gameplay.nextLevel(Level.Map1);
		entering[ScreenState.SNASelectionScreen] = true;
		currentScreen = ScreenState.Gameplay;
	}

};