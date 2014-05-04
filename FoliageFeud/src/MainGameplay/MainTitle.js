
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
		utility.clearAll();
		this.playAsGirl.sourceWidth = imgGirlButton.width;
		this.playAsGirl.sourceHeight = imgGirlButton.height;
		this.playAsGirl.width = 276;
		this.playAsGirl.height = 107;
		this.playAsGirl.x = (1152 - this.playAsGirl.width) / 2;
		this.playAsGirl.y = (512 - this.playAsGirl.height) / 2 - 32;
		utility.addClickItem(this.playAsGirl.x, this.playAsGirl.y, this.playAsGirl.width, this.playAsGirl.height, this.playAsGirlClicked);
		
		this.playAsBoy.sourceWidth = imgBoyButton.width;
		this.playAsBoy.sourceHeight = imgBoyButton.height;
		this.playAsBoy.width = this.playAsGirl.width;
		this.playAsBoy.height = this.playAsGirl.height;
		this.playAsBoy.x = this.playAsGirl.x;
		this.playAsBoy.y = this.playAsGirl.y + 128;
		utility.addClickItem(this.playAsBoy.x, this.playAsBoy.y, this.playAsBoy.width, this.playAsBoy.height, this.playAsBoyClicked);
		
		utility.startNewSong(songMainTitle);
	},
	
	playAsBoyClicked: function()
	{
		currentSprite = SpriteState.Boy;
		exiting[currentScreen] = true;
		quests.addQuest(Math.floor(Math.random() * plantList.length), 0);
		
	},
	
	playAsGirlClicked: function()
	{
		currentSprite = SpriteState.Girl;
		exiting[currentScreen] = true;
		utility.checkCookie();
	},
	
	render: function()
	{
		utility.clearSurfaces();
		
		utility.drawImage(
			menuSurface, imgGirlButton,
			0, 0, this.playAsGirl.sourceWidth, this.playAsGirl.sourceHeight,
			this.playAsGirl.x, this.playAsGirl.y, this.playAsGirl.width, this.playAsGirl.height
			);
		utility.drawImage(
			menuSurface, imgBoyButton,
			0, 0, this.playAsBoy.sourceWidth, this.playAsBoy.sourceHeight,
			this.playAsBoy.x, this.playAsBoy.y, this.playAsBoy.width, this.playAsBoy.height
			);
		utility.drawImage(
			backgroundSurface, imgMenuBg,
			0, 0, imgMenuBg.width, imgMenuBg.height,
			0, 0, 1152, 512
			);
	}
}