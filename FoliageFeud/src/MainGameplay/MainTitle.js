// Created by Iron Man 2/26/2014

// Edited on 3/28/2014 to contain all info in
// an object for cleaner and easier to read code.
// --Iron Man

// The Main Title Screen

var title = {
	playAsGirl: Object.create(spriteObject),
	playAsBoy: Object.create(spriteObject),
	
	init: function()
	{
		this.playAsGirl.sourceWidth = 256;
		this.playAsGirl.sourceHeight = 128;
		this.playAsGirl.width = 256;
		this.playAsGirl.height = 128;
		this.playAsGirl.x = (menuCanvas.width - this.playAsGirl.width) / 2;
		this.playAsGirl.y = (menuCanvas.height - this.playAsGirl.height) / 2 - 32;
		utility.addClickItem(this.playAsGirl.x, this.playAsGirl.y, this.playAsGirl.width, this.playAsGirl.height, this.playAsGirlClicked);
		
		this.playAsBoy.sourceWidth = 256;
		this.playAsBoy.sourceHeight = 128;
		this.playAsBoy.width = 256;
		this.playAsBoy.height = 128;
		this.playAsBoy.x = (menuCanvas.width - this.playAsBoy.width) / 2;
		this.playAsBoy.y = ((menuCanvas.height - this.playAsBoy.height) / 2)+96;
		utility.addClickItem(this.playAsBoy.x, this.playAsBoy.y, this.playAsBoy.width, this.playAsBoy.height, this.playAsBoyClicked);
	},
	
	playAsBoyClicked: function()
	{
		currentSprite = SpriteState.Boy;
		exiting[currentScreen] = true;
		
	},
	
	playAsGirlClicked: function()
	{
		currentSprite = SpriteState.Girl;
		console.debug(" button " );
		exiting[currentScreen] = true;
	},
	
	render: function()
	{
		backgroundSurface.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
		gameplaySurface.clearRect(0, 0, gameplayCanvas.width, gameplayCanvas.height);
		menuSurface.clearRect(0, 0, menuCanvas.width, menuCanvas.height);
		
		menuSurface.drawImage(
			imgGirlButton,
			this.playAsGirl.x, this.playAsGirl.y
			
			);
		menuSurface.drawImage(
			imgBoyButton,
			this.playAsBoy.x, this.playAsBoy.y
			);
		backgroundSurface.drawImage(
			imgMenuBg,
			0, 0
			);
	}
}