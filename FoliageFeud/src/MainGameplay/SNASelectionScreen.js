// Script to select the SNA level to go to

var snaSelect = {
	
	init: function()
	{
		utility.addClickItem(96, 32, imgMapBackground.width, imgMapBackground.height, this.goToMap1, "");
		utility.addClickItem(imgMapBackground.width + 128, 32, imgMapBackground.width, imgMapBackground.height, this.goToForest, "");
		utility.addClickItem(96, imgMapBackground.height + 64, imgMapBackground.width, imgMapBackground.height, this.goToMarsh, "");
		utility.addClickItem(imgMapBackground.width + 128, imgMapBackground.height + 64, imgMapBackground.width, imgMapBackground.height, this.goToHilly, "");
	},
	
	render: function()
	{
		gameplay.render();
		
		//Map 1
		utility.drawImage(
			menuSurface, imgMapBackground,
			0, 0, imgMapBackground.width, imgMapBackground.height,
			96, 32, imgMapBackground.width, imgMapBackground.height
		);
		
		utility.drawImage(
			menuSurface, imgMap1,
			0, 0, imgMap1.width, imgMap1.height,
			128 + 128 + 32, 52, imgMap1.width, imgMap1.height
		);
		
		// Forest
		utility.drawImage(
			menuSurface, imgMapBackground,
			0, 0, imgMapBackground.width, imgMapBackground.height,
			imgMapBackground.width + 128, 32, imgMapBackground.width, imgMapBackground.height
		);
		
		utility.drawImage(
			menuSurface, imgForestMap,
			0, 0, imgForestMap.width, imgForestMap.height,
			imgMapBackground.width + 128 + 32 + 128 + 32, 52, imgForestMap.width, imgForestMap.height
		);
		
		// Marsh
		utility.drawImage(
			menuSurface, imgMapBackground,
			0, 0, imgMapBackground.width, imgMapBackground.height,
			96, imgMapBackground.height + 64, imgMapBackground.width, imgMapBackground.height
		);
		
		utility.drawImage(
			menuSurface, imgMarshMap,
			0, 0, imgMarshMap.width, imgMarshMap.height,
			128 + 128 + 32, imgMapBackground.height + 84, imgMarshMap.width, imgMarshMap.height
		);
		
		// Hilly
		utility.drawImage(
			menuSurface, imgMapBackground,
			0, 0, imgMapBackground.width, imgMapBackground.height,
			imgMapBackground.width + 128, imgMapBackground.height + 64, imgMapBackground.width, imgMapBackground.height
		);
		
		utility.drawImage(
			menuSurface, imgHillyMap,
			0, 0, imgHillyMap.width, imgHillyMap.height,
			imgMapBackground.width + 128 + 32 + 128 + 32, imgMapBackground.height + 84, imgHillyMap.width, imgHillyMap.height
		);
		
			
		var x = (CANVAS_WIDTH - imgExitButton.width) / 2;
		var y = CANVAS_HEIGHT - imgExitButton.height + 56;
		var width = 3 * imgExitButton.width / 4;
		var height = 2 * imgExitButton.height / 4;
		utility.drawImage(
			menuSurface, imgExitButton,
			0, 0, imgExitButton.width, imgExitButton.height,
			x, y, width, height
		);
		utility.addClickItem(x, y, width, height, snaSelect.exit, []);
	},
	
	goToMap1: function(empty)
	{
		gameplay.nextLevel(Level.Prairie);
		entering[ScreenState.SNASelectionScreen] = true;
		currentScreen = ScreenState.Gameplay;
	},
	
	goToForest: function(empty)
	{
		gameplay.nextLevel(Level.Forest);
		entering[ScreenState.SNASelectionScreen] = true;
		currentScreen = ScreenState.Gameplay;
	},
	
	goToMarsh: function(empty)
	{
		gameplay.nextLevel(Level.Marsh);
		entering[ScreenState.SNASelectionScreen] = true;
		currentScreen = ScreenState.Gameplay;
	},
	
	goToHilly: function(empty)
	{
		gameplay.nextLevel(Level.Hilly);
		entering[ScreenState.SNASelectionScreen] = true;
		currentScreen = ScreenState.Gameplay;
	},
	
	exit: function(empty)
	{
		currentScreen = ScreenState.Gameplay;
	}

};