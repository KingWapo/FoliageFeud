// Script to select the SNA level to go to

var snaSelect = {
	
	init: function()
	{
		utility.addClickItem(128, 128, imgMap1.width, imgMap1.height, this.goToMap1, "");
	},
	
	render: function()
	{
		
		menuSurface.drawImage(
			imgMapBackground,
			96, 32
		);
		
		menuSurface.drawImage(
			imgMapBackground,
			imgMapBackground.width + 128, 32
		);
		
		menuSurface.drawImage(
			imgMapBackground,
			96, imgMapBackground.height + 64
		);
		
		menuSurface.drawImage(
			imgMapBackground,
			imgMapBackground.width + 128, imgMapBackground.height + 64
		);
		
		menuSurface.drawImage(
			imgMap1,
			128, 64
		);
	},
	
	goToMap1: function(empty)
	{
		gameplay.nextLevel(Level.Map1);
		entering[ScreenState.SNASelectionScreen] = true;
		currentScreen = ScreenState.Gameplay;
	}

};