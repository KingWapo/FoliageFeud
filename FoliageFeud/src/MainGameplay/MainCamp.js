// A script for the Sibling interaction to be given
// quests and return quests.

var mainCamp = {
	listOfQuests: [],
	
	broTalk: 0,
	
	dingle: {
		x: 128,
		y: 3 * 128,
		sourceX: 2 * 64,
		sourceY: 0,
		width: 128,
		height: 128,
		sourceWidth: 64,
		sourceHeigth: 64,
		
		phrases: ["Hello my sibling, it is quite nice to see you",              // Intro Statement
				  "Go away, quit wasting my time",								// No plants to return
				  "Ahh, I see you have some plants for me, which would you like to return?"
				  ],
		
		sprite: ""
	},
	
	init: function()
	{
		this.listOfQuests = [];
		
		this.dingle.x = 128;
		this.dingle.y = 1.5 * 128;
		
		for (var i = quests.plantsToIdentify.length; i < quests.questLimit; i++)
		{
			var newPlant;
			
			if (this.listOfQuests.length < 1)
			{
				do
				{
					newPlant = plant.getRandUnHarvested();
				} while (utility.contains(quests.plantsToIdentify, newPlant));
			}
			else
			{
				do
				{
					newPlant = plant.getRandUnHarvested();
				} while (utility.contains(this.listOfQuests, newPlant) || utility.contains(quests.plantsToIdentify, newPlant));
			}
			
			this.listOfQuests.push(newPlant);
		}
	},
	
	render: function()
	{
		utility.clearAll();
		
		utility.drawImage(
			backgroundSurface, imgCommonBg,
			0, 0, imgCommonBg.width, imgCommonBg.height,
			0, 0, imgCommonBg.width, imgCommonBg.height
		);
		
		utility.drawImage(
			gameplaySurface, this.dingle.sprite,
			this.dingle.sourceX, this.dingle.sourceY, this.dingle.sourceWidth, this.dingle.sourceHeigth,
			this.dingle.x, this.dingle.y, this.dingle.width, this.dingle.height
			);
		
		utility.drawImage(
			menuSurface, imgSmallTextBox,
			0, 0, imgSmallTextBox.width, imgSmallTextBox.height,
			32, 32, CANVAS_WIDTH - 64, imgSmallTextBox.height
		);
		
		for (var i = 0; i < this.listOfQuests.length; i++)
		{
			var plantName = plantList[this.listOfQuests[i]].name;
			var randRegion = Math.floor(Math.random() * 4) + 2;
			
			utility.writeForClick(menuSurface, [plantName], .45 * CANVAS_WIDTH, .35 * CANVAS_HEIGHT + (48 * i), CANVAS_WIDTH / 2, 24, true, [quests.addQuestFromSibling, [this.listOfQuests[i], randRegion]]);
		}
		
		utility.writeText(menuSurface, [this.dingle.phrases[this.broTalk]], 64, 32 + imgSmallTextBox.height / 2, CANVAS_WIDTH - 128, 24, false);
		
		
		switch(this.broTalk)
		{
			case 0:
			case 1:
				utility.addClickItem(this.dingle.x, this.dingle.y, this.dingle.width, this.dingle.height, this.talkToBro, []); // First bro talk phrase
				break;
			case 2:
				var x = CANVAS_WIDTH - 64 - 128 - 256;
				var y = 96;
				utility.drawImage(
					menuSurface, imgSmallTextBox,
					0, 0, imgSmallTextBox.width, imgSmallTextBox.height,
					x, y, 256, 256
					);
					
				for (var i = 0; i < quests.finishedQuests.length; i++)
				{
					var plantName = plantList[quests.finishedQuests[i]].name;
					utility.writeForClick(menuSurface, [plantName], x + 16, y + 48 + 48 * i, 256 - 32, 24, true, [mainCamp.giveQuest, [i]]);
				}
				break;
		}
		
		utility.drawImage(
			menuSurface, imgExitButton,
			0, 0, imgExitButton.width, imgExitButton.height,
			CANVAS_WIDTH - 320, CANVAS_HEIGHT - 160, imgExitButton.width, imgExitButton.height
		);
		
		utility.addClickItem(CANVAS_WIDTH - 320, CANVAS_HEIGHT - 160, imgExitButton.width, imgExitButton.height, this.exitToGameplay, "");
	},
	
	giveQuest: function(index)
	{
		console.debug("Removing index " + index);
	},
	
	exitToGameplay: function(empty)
	{
		entering[ScreenState.SiblingInteraction] = true;
		currentScreen = ScreenState.Gameplay;
		utility.clearAll();
	},
	
	talkToBro: function(empty)
	{
		switch(mainCamp.broTalk)
		{
			case 0: // Intro statement
				if (quests.finishedQuests.length == 0)
					mainCamp.broTalk = 1;
				else
					mainCamp.broTalk = 2;
				break;
		}
	}
};