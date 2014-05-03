// A script for the Sibling interaction to be given
// quests and return quests.

var mainCamp = {
	listOfQuests: [],
	
	broTalk: 0,
	arrowOffset: 0,
	invasivesChosen: [],
	talkingInMainCamp: false,
	postItPos: [[-1,-1], [-1,-1], [-1,-1], [-1,-1], [-1,-1]],
	
	dingle: {
		x: 128,
		y: 3 * 128,
		sourceX: 2 * 64,
		sourceY: 0,
		width: 128,
		height: 128,
		sourceWidth: 64,
		sourceHeigth: 64,
		
		phrases: ["What can I help you with?",              													// Intro Statement      	0
				  "Go away, quit wasting my time.",																// No plants to return  	1
				  "Ahh, I see you have some plants for me, which would you like to return?",					// Plants to return			2
				  "Ooo, I like this plant!",																	// Returned a plant			3
				  "Did you happen to see any invasive plants?",													// Done returning plants	4
				  "Oh that's good. Well then, is there anything else?",											// No invasives				5
				  "Oh no, please tell me which of these you saw.",												// Invasives, choose them	6
				  "I'll have to make a note of that. Thank you. Anything else?",								// Done choosing			7
				  "It's so nice to see you again, unfortunately it's not under the best of circumstances. I need your help just as you need mine. My arch nemesis, Dr. Parsnip, has claimed these SNA",
				  "territories as his own, and is impeding my research. Not only that, but he has kidnapped your fiancee and my assistant. This shall not be tolerated, and we must work together.",
				  "The two of us can foil his plans! I need you to go out and investigate the plants to see if there is some clue as to where he is hiding. I will have the plants I need posted on this board here, you can choose",
				  "which ones you'd like to find. I'll stay here and analyse the plants for clues.",
				  "Oh, before you go, feel free to check out the other buildings here. All are bound to help you in one way or another."
				  ],
		
		sprite: ""
	},
	
	init: function()
	{
		this.talkingInMainCamp = true;
		if (gameplay.visitedBrother)
		{
			this.broTalk = 0;
		}
		else
		{
			this.broTalk = 8;
		}
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
			backgroundSurface, imgBackgroundMainCamp,
			0, 0, imgBackgroundMainCamp.width, imgBackgroundMainCamp.height,
			0, 0, imgBackgroundMainCamp.width, imgBackgroundMainCamp.height
		);
		
		utility.drawImage(
			gameplaySurface, this.dingle.sprite,
			this.dingle.sourceX, this.dingle.sourceY, this.dingle.sourceWidth, this.dingle.sourceHeigth,
			this.dingle.x, this.dingle.y, this.dingle.width, this.dingle.height
			);
		/*
		utility.drawImage(
			menuSurface, imgSmallTextBox,
			0, 0, imgSmallTextBox.width, imgSmallTextBox.height,
			32, 32, CANVAS_WIDTH - 64, imgSmallTextBox.height + 40
		);*/
		
		for (var i = 0; i < this.listOfQuests.length; i++)
		{
			var plantName = plantList[this.listOfQuests[i]].name;
			var randRegion = Math.floor(Math.random() * 4) + 2;
			
			if (this.broTalk == 0 ||
				this.broTalk == 1 ||
				this.broTalk == 5 ||
				this.broTalk == 7)
				{
					this.drawPlant(plantName, randRegion, i);
				}
		}
		
		//utility.writeText(menuSurface, [this.dingle.phrases[this.broTalk]], 64, 24 + imgSmallTextBox.height / 2, CANVAS_WIDTH - 128, 24, false);
		utility.drawTextBox([this.dingle.phrases[this.broTalk]], CANVAS_WIDTH - 128, mainCamp.incrementBroTalk)
		
		switch(this.broTalk)
		{
			case 0:
			case 1:
			case 5:
			case 7:
				this.talkingInMainCamp = false;
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
					utility.writeForClick(menuSurface, [plantName], x + 16, y + 48 + 48 * i, 256 - 32, 24, false, [mainCamp.giveQuest, [i]]);
				}
				utility.writeForClick(menuSurface, ["Done"], x + 32, y + 48 + 48 * 5, 256 - 32, 30, false, [mainCamp.finishGiving, []]);
				
				break;
			case 4:
				utility.writeForClick(menuSurface, ["Yes"], CANVAS_WIDTH - 320 - 128, CANVAS_HEIGHT - imgSmallTextBox.height / 2, 64, 30, false, [mainCamp.anyInvasives, [true]]);
				utility.writeForClick(menuSurface, ["No"], CANVAS_WIDTH - 320 - 64, CANVAS_HEIGHT - imgSmallTextBox.height / 2, 64, 30, false, [mainCamp.anyInvasives, [false]]);
				break;
			case 6:
				var x = CANVAS_WIDTH - 64 - 512;
				var y = 96;
				utility.drawImage(
					menuSurface, imgSmallTextBox,
					0, 0, imgSmallTextBox.width, imgSmallTextBox.height,
					x, y, 256 + 128, 256 + 64
					);
				var invasives = plant.getInvasivePlants();
				for (var i = 0; i < invasives.length; i++)
				{
					var invImage = plantList[invasives[i + this.arrowOffset]].sprite[0];
					utility.drawImage(
						menuSurface, invImage,
						0, 0, invImage.width, invImage.height,
						x + 64 + (i % 3) * 96, y + 32 + 88 * Math.floor(i / 3), 64, 64
					);
					index = i;
					utility.addClickItem(x + 64 + (i % 3) * 96, y + 32 + 88 * Math.floor(i / 3), 64, 64, this.addInvasive, [i])
				}
				utility.writeForClick(menuSurface, ["Done"], x + 64 + 96 + 96, y + 88 * 2.75, 64, 30, false, [mainCamp.finishInvasives, []]);
				break;
		}
		
		utility.drawImage(
			menuSurface, imgExitButton,
			0, 0, imgExitButton.width, imgExitButton.height,
			CANVAS_WIDTH - 320 + 128, CANVAS_HEIGHT - 160, imgExitButton.width, imgExitButton.height
		);
		if (!this.talkingInMainCamp) utility.addClickItem(CANVAS_WIDTH - 320 + 128, CANVAS_HEIGHT - 160, imgExitButton.width, imgExitButton.height, this.exitToGameplay, "");
	},
	
	drawPlant: function(plantName, randRegion, i)
	{
		var pos = this.postItPos[i];
		if (pos[0] < 0 && pos[1] < 0) 
		{
			this.postItPos[i] = [CANVAS_WIDTH / 2 + 196 * (i % 3),  128+ 128 * (i / 3)];
			pos = this.postItPos[i];
		}
		utility.drawImage(
			menuSurface, imgPostItNote,
			0, 0, imgPostItNote.width, imgPostItNote.height,
			pos[0], pos[1], imgPostItNote.width, imgPostItNote.height
			);
		utility.writeText(menuSurface, [plantName], pos[0] + 16, pos[1] + 32, imgPostItNote.width - 32, 16, false);
		utility.addClickItem(pos[0], pos[1], imgPostItNote.width, imgPostItNote.height, mainCamp.acceptQuest, [this.listOfQuests[i], randRegion, i]);
	},
	
	acceptQuest: function(params)
	{
		quests.addQuestFromSibling(params);
		mainCamp.postItPos.splice(params[2], 1);
	},
	
	giveQuest: function(index)
	{
		quests.finishedQuests.splice(index, 1);
		gameplay.gold += 5;
		mainCamp.broTalk = 3;
	},
	
	finishGiving: function(empty)
	{
		mainCamp.broTalk = 4;
	},
	
	anyInvasives: function(yes)
	{
		if (yes[0]) { 
			mainCamp.broTalk = 6;
		}
		else {
			mainCamp.broTalk = 5;
		}
	},
	
	addInvasive: function(index)
	{
		invasives = plant.getInvasivePlants();
		if (mainCamp.compareInvasives(invasives[index[0]]))
		{
			gameplay.gold += 5;
		}
	},
	
	finishInvasives: function(empty)
	{
		mainCamp.broTalk = 7;
	},
	
	exitToGameplay: function(empty)
	{
		if (gameplay.visitedBrother)
		{
			mainCamp.broTalk = 0;
			mainCamp.talkingInMainCamp = false;
			gameplay.invasivesSeen = [];
			mainCamp.postItPos = [[-1,-1], [-1,-1], [-1,-1], [-1,-1], [-1,-1]];
			entering[ScreenState.SiblingInteraction] = true;
			currentScreen = ScreenState.Gameplay;
			utility.clearAll();
		}
		else
		{
			gameplay.visitedBrother = true;
			mainCamp.broTalk = 12;
			mainCamp.talkingInMainCamp = true;
		}
	},
	
	talkToBro: function(empty)
	{
		if (quests.finishedQuests.length == 0)
			mainCamp.broTalk = 1;
		else 
			mainCamp.broTalk = 2;
	},
	
	incrementBroTalk: function(empty)
	{
		//mainCamp.broTalk = (mainCamp.broTalk + 1) % (mainCamp.dingle.phrases.length - 1);
	},
	
	compareInvasives: function(plantIndex)
	{
		var index = gameplay.invasivesSeen.indexOf(plantIndex);
		if (index == -1) return false;
		else
		{
			gameplay.invasivesSeen.splice(index, 1);
			return true;
		}
	}
};