
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
		utility.addClickItem(this.playAsGirl.x, this.playAsGirl.y, this.playAsGirl.width, this.playAsGirl.height, this.loadClicked);
		
		this.playAsBoy.sourceWidth = imgBoyButton.width;
		this.playAsBoy.sourceHeight = imgBoyButton.height;
		this.playAsBoy.width = this.playAsGirl.width;
		this.playAsBoy.height = this.playAsGirl.height;
		this.playAsBoy.x = this.playAsGirl.x;
		this.playAsBoy.y = this.playAsGirl.y + 128;
		utility.addClickItem(this.playAsBoy.x, this.playAsBoy.y, this.playAsBoy.width, this.playAsBoy.height, this.newGameClicked);
		
		utility.startNewSong(songMainTitle);
	},
	
	newGameClicked: function()
	{
		exiting[currentScreen] = true;
		quests.addQuest(Math.floor(Math.random() * plantList.length), 0);
		
	},
	
	loadClicked: function()
	{
		exiting[currentScreen] = true;
		utility.checkCookie();
	},
	
	demoClicked: function()
	{
		window.location.href = "demo.html";
	},
	
	creditsClicked: function()
	{
		
	},
	
	render: function()
	{
		utility.clearAll();
		x = (1152 - imgLoadGameButton.width) / 2 - 128;
		y = (512 - imgLoadGameButton.height) / 2 - 32;
		utility.drawImage(
			menuSurface, imgLoadGameButton,
			0, 0, imgLoadGameButton.width, imgLoadGameButton.height,
			x, y, imgLoadGameButton.width, imgLoadGameButton.height
			);
		utility.addClickItem(x, y, imgLoadGameButton.width, imgLoadGameButton.height, this.loadClicked);
		utility.drawImage(
			menuSurface, imgDemoButton,
			0, 0, imgDemoButton.width, imgDemoButton.height,
			x, y + 128, imgDemoButton.width, imgDemoButton.height
			);
		utility.addClickItem(x, y + 128, imgDemoButton.width, imgDemoButton.height, this.demoClicked);
		utility.drawImage(
			menuSurface, imgNewGameButton,
			0, 0, imgNewGameButton.width, imgNewGameButton.height,
			x + 256 + 32, y, imgNewGameButton.width, imgNewGameButton.height
			);
		utility.addClickItem(x + 256 + 32, y, imgNewGameButton.width, imgNewGameButton.height, this.newGameClicked);
		utility.drawImage(
			menuSurface, imgCreditsButton,
			0, 0, imgCreditsButton.width, imgCreditsButton.height,
			x + 256 + 32, y + 128, imgCreditsButton.width, imgCreditsButton.height
			);
		utility.addClickItem(x + 256 + 32, y + 128, imgCreditsButton.width, imgCreditsButton.height, this.creditsClicked);
		utility.drawImage(
			backgroundSurface, imgMenuBg,
			0, 0, imgMenuBg.width, imgMenuBg.height,
			0, 0, 1152, 512
			);
	}
}