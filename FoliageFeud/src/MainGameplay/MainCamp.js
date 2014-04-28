// A script for the Sibling interaction to be given
// quests and return quests.

var mainCamp = {
	listOfQuests: [],
	
	broTalk: 0,
	arrowOffset: 0,
	invasivesChosen: [],
	
	dingle: {
		x: 128,
		y: 3 * 128,
		sourceX: 2 * 64,
		sourceY: 0,
		width: 128,
		height: 128,
		sourceWidth: 64,
		sourceHeigth: 64,
		
		phrases: ["Hello my sibling, it is quite nice to see you.",              								// Intro Statement      	0
				  "Go away, quit wasting my time.",																// No plants to return  	1
				  "Ahh, I see you have some plants for me, which would you like to return?",					// Plants to return			2
				  "Ooo, I like this plant!",																	// Returned a plant			3
				  "Did you happen to see any invasive plants?",													// Done returning plants	4
				  "Oh that's good. Well then, is there anything else?",											// No invasives				5
				  "Oh no, please tell me which of these you saw.",												// Invasives, choose them	6
				  "I'll have to make a note of that. Thank you. Anything else?"									// Done choosing			7
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
			
			if (this.broTalk == 0 ||
				this.broTalk == 1 ||
				this.broTalk == 5 ||
				this.broTalk == 7)
				utility.writeForClick(menuSurface, [plantName], .45 * CANVAS_WIDTH, .35 * CANVAS_HEIGHT + (48 * i), CANVAS_WIDTH / 2, 24, true, [quests.addQuestFromSibling, [this.listOfQuests[i], randRegion]]);
		}
		
		utility.writeText(menuSurface, [this.dingle.phrases[this.broTalk]], 64, 32 + imgSmallTextBox.height / 2, CANVAS_WIDTH - 128, 24, false);
		
		
		switch(this.broTalk)
		{
			case 0:
			case 1:
			case 5:
			case 7:
				utility.addClickItem(this.dingle.x, this.dingle.y, this.dingle.width, this.dingle.height, this.talkToBro, []); // First bro talk phrase
				break;
			case 2:
			case 3:
				var x = CANVAS_WIDTH - 64 - 128 - 256;
				var y = 96;
				utility.drawImage(
					menuSurface, imgSmallTextBox,
					0, 0, imgSmallTextBox.width, imgSmallTextBox.height,
					x, y, 256, 256 + 64
					);
				for (var i = 0; i < Math.min(quests.finishedQuests.length, 5); i++)
				{
					var plantName = plantList[quests.finishedQuests[i]].name;
					utility.writeForClick(menuSurface, [plantName], x + 16, y + 48 + 48 * i, 256 - 32, 24, true, [mainCamp.giveQuest, [i]]);
				}
				utility.writeForClick(menuSurface, ["Done"], x + 32, y + 48 + 48 * 5, 256 - 32, 30, true, [mainCamp.finishGiving, []]);
				
				break;
			case 4:
				utility.writeForClick(menuSurface, ["Yes"], CANVAS_WIDTH - 320, imgSmallTextBox.height, 64, 30, true, [mainCamp.anyInvasives, [true]]);
				utility.writeForClick(menuSurface, ["No"], CANVAS_WIDTH - 320 + 64, imgSmallTextBox.height, 64, 30, true, [mainCamp.anyInvasives, [false]]);
				break;
			case 6:
				var x = CANVAS_WIDTH - 64 - 128 - 256;
				var y = 96;
				utility.drawImage(
					menuSurface, imgSmallTextBox,
					0, 0, imgSmallTextBox.width, imgSmallTextBox.height,
					x, y, 256, 256 + 64
					);
				var invasives = plant.getInvasivePlants();
				for (var i = 0; i < Math.min(invasives.length, 4); i++)
				{
					var invImage = plantList[invasives[i + this.arrowOffset]].sprite[0];
					utility.drawImage(
						menuSurface, invImage,
						0, 0, invImage.width, invImage.height,
						x + 64 + (i % 2) * 96, y + 32 + 88 * (i / 2), 64, 64
					);
					index = i;
					utility.addClickItem(x + 64 + (i % 2) * 96, y + 32 + 88 * (i / 2), 64, 64, this.addInvasive, [i])
				}
				utility.writeForClick(menuSurface, ["Done"], x + 64 + 96, y + 32 + 88 * 2.75, 64, 30, true, [mainCamp.finishInvasives, []]);
				break;
		}
		
		utility.drawImage(
			menuSurface, imgExitButton,
			0, 0, imgExitButton.width, imgExitButton.height,
			CANVAS_WIDTH - 320 + 128, CANVAS_HEIGHT - 160, imgExitButton.width, imgExitButton.height
		);
		
		utility.addClickItem(CANVAS_WIDTH - 320 + 128, CANVAS_HEIGHT - 160, imgExitButton.width, imgExitButton.height, this.exitToGameplay, "");
	},
	
	giveQuest: function(index)
	{
		console.debug("Removing index " + index);
		quests.finishedQuests.splice(index);
		mainCamp.broTalk = 3;
	},
	
	finishGiving: function(empty)
	{
		mainCamp.broTalk = 4;
	},
	
	anyInvasives: function(yes)
	{
		console.debug("Any Invasives: " + yes);
		if (yes[0]) { 
			mainCamp.broTalk = 6;
		}
		else {
			mainCamp.broTalk = 5;
		}
		console.debug("Talk should be at: " + mainCamp.broTalk)
	},
	
	addInvasive: function(index)
	{
		invasives = plant.getInvasivePlants();
		mainCamp.invasivesChosen.push(invasives[index[0]]);
		console.debug(index[0]);
	},
	
	finishInvasives: function(empty)
	{
		mainCamp.broTalk = 7;
	},
	
	exitToGameplay: function(empty)
	{
		mainCamp.broTalk = 0;
		entering[ScreenState.SiblingInteraction] = true;
		currentScreen = ScreenState.Gameplay;
		utility.clearAll();
	},
	
	talkToBro: function(empty)
	{
		if (quests.finishedQuests.length == 0)
			mainCamp.broTalk = 1;
		else 
			mainCamp.broTalk = 2;
	}
};