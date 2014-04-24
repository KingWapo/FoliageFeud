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
		
		utility.drawImage(
			menuSurface, imgMapBackground,
			0, 0, imgMapBackground.width, imgMapBackground.height,
			96, 32, imgMapBackground.width, imgMapBackground.height
		);
		
		utility.drawImage(
			menuSurface, imgMapBackground,
			0, 0, imgMapBackground.width, imgMapBackground.height,
			imgMapBackground.width + 128, 32, imgMapBackground.width, imgMapBackground.height
		);
		
		utility.drawImage(
			menuSurface, imgMapBackground,
			0, 0, imgMapBackground.width, imgMapBackground.height,
			96, imgMapBackground.height + 64, imgMapBackground.width, imgMapBackground.height
		);
		
		utility.drawImage(
			menuSurface, imgMapBackground,
			0, 0, imgMapBackground.width, imgMapBackground.height,
			imgMapBackground.width + 128, imgMapBackground.height + 64, imgMapBackground.width, imgMapBackground.height
		);
		
		utility.drawImage(
			menuSurface, imgMap1,
			0, 0, imgMap1.width, imgMap1.height,
			128, 64, imgMap1.width, imgMap1.height
		);
	},
	
	goToMap1: function(empty)
	{
		gameplay.nextLevel(Level.Map1);
		entering[ScreenState.SNASelectionScreen] = true;
		currentScreen = ScreenState.Gameplay;
	}

};