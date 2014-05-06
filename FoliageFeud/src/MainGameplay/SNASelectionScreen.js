// Script to select the SNA level to go to

var snaSelect = {
	
	init: function()
	{
		
	},
	
	render: function()
	{
		gameplay.render();
		
		utility.addClickItem(96, 32, imgTeleportPrairie.width, imgTeleportPrairie.height, this.goToMap1, "");
		utility.addClickItem(imgTeleportForest.width + 128, 32, imgTeleportForest.width, imgTeleportForest.height, this.goToForest, "");
		utility.addClickItem(96, imgTeleportMarsh.height + 64, imgTeleportMarsh.width, imgTeleportMarsh.height, this.goToMarsh, "");
		utility.addClickItem(imgTeleportHilly.width + 128, imgTeleportHilly.height + 64, imgTeleportHilly.width, imgTeleportHilly.height, this.goToHilly, "");
		
		
		//Prairie
		utility.drawImage(
			menuSurface, imgTeleportPrairie,
			0, 0, imgTeleportPrairie.width, imgTeleportPrairie.height,
			96, 32, imgTeleportPrairie.width, imgTeleportPrairie.height
		);
		
		// Forest
		utility.drawImage(
			menuSurface, imgTeleportForest,
			0, 0, imgTeleportForest.width, imgTeleportForest.height,
			imgTeleportForest.width + 128, 32, imgTeleportForest.width, imgTeleportForest.height
		);

		// Marsh
		utility.drawImage(
			menuSurface, imgTeleportMarsh,
			0, 0, imgTeleportMarsh.width, imgTeleportMarsh.height,
			96, imgTeleportMarsh.height + 64, imgTeleportMarsh.width, imgTeleportMarsh.height
		);
		
		// Hilly
		utility.drawImage(
			menuSurface, imgTeleportHilly,
			0, 0, imgTeleportHilly.width, imgTeleportHilly.height,
			imgTeleportHilly.width + 128, imgTeleportHilly.height + 64, imgTeleportHilly.width, imgTeleportHilly.height
		);
		
		
		utility.writeText(menuSurface, ["Prairie"], 96 + 32, imgTeleportForest.height + 12, 256, 20, false);
		utility.writeText(menuSurface, ["Forest"], imgTeleportForest.width + 128 + 32, imgTeleportForest.height + 12, 256, 20, false);
		utility.writeText(menuSurface, ["Marsh"], 96 + 32, 2 * imgTeleportForest.height + 48, 256, 20, false);
		utility.writeText(menuSurface, ["Hilly"], imgTeleportForest.width + 128 + 32, 2 * imgTeleportForest.height + 48, 256, 20, false);
		
			
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