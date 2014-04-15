// Script to select the SNA level to go to

var snaSelect = {
	
	init: function()
	{
		utility.addClickItem(96, 32, imgMapBackground.width, imgMapBackground.height, this.goToMap1, "");
		utility.addClickItem(imgMapBackground.width + 128, 32, imgMapBackground.width, imgMapBackground.height, this.goToMap1, "");
		utility.addClickItem(96, 32, imgMapBackground.width, imgMapBackground.height, this.goToMap1, "");
		utility.addClickItem(imgMapBackground.width + 128, imgMapBackground.height + 64, imgMapBackground.width, imgMapBackground.height, this.goToMap1, "");
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