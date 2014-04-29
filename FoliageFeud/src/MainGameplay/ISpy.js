// Created by Batman

// ISpy game mode

var ispy = {
	// Size of image on screen
	imgSize: 170,
	// Index of requested plant
	requestedPlant: -1,
	// Arrays of current plants and their sprites
	curPlants: [],
	curTraits: [],
	curSprites: [],
	gameEnd: false,
	isCorrect: false,
	dingleBotFailResponses: ["Hmmm, not the one I would have chosen.. Oh well, Come back to base and I'll give you a chance to redeem yourself."],
	dingleBotWinResponses: ["You make this look easy. Come back to base and I'll give you that dubloon I promised you."],
	responseOffset: 0,
	readyToRender: false,
	
	// Training mode variables
	fromTraining: false,
	gamesPlayed: 0,
	maxGames: 10,
	gamesCorrect: 0,
	
	// Initialize game mode
	init: function()
	{
		// Clear canvases and click handler
		utility.clearAll();
		
		this.gameEnd = false;
		this.isCorrect = false;
		this.readyToRender = false;
		
		if (this.fromTraining)
			this.requestedPlant = plant.getRandPlant();
		
		this.responseOffset = 0;
		
		// Add plants to ispy pool
		this.curPlants = plant.getMultiplePlants(3);
		this.curTraits = [];
		this.curSprites = [];
		
		// Add requested plant to ispy pool
		this.curPlants.push(this.requestedPlant);
		
		// Shuffle array
		this.curPlants = utility.shuffle(this.curPlants);
		
		for (var i = 0; i < this.curPlants.length; i++)
		{
			if (!plantList[this.curPlants[i]].loaded)
			{
				//console.debug("loaded ", plantList[this.curPlants[i]].loaded);
				plant.loadPlant(plantList[this.curPlants[i]]);
			}
		}
		
		// Get 2 random traits for the plant
		this.curTraits = plant.get2Traits(this.requestedPlant);
		
		console.debug("ispy: ", this.curPlants);

		for (var i = 0; i < this.curPlants.length; i++)
		{
			var imgNum = Math.floor(Math.random() * plantList[this.curPlants[i]].sprite.length);
			
			this.curSprites.push(plantList[this.curPlants[i]].sprite[imgNum]);
			//console.debug(this.curSprites[i]);
		}
	},
	
	// Draws objects to screen for game mode
	render: function()
	{
		utility.clearAll();
		
		var requested = this.curPlants.indexOf(this.requestedPlant);
		console.debug(requested, ", ", this.curPlants.length);
		
		utility.drawImage(
			backgroundSurface, imgISpyBg,
			0, 0, imgISpyBg.width, imgISpyBg.height,
			0, 0, imgISpyBg.width, imgISpyBg.height
		);
		
		// Plants in current list
		//console.debug("Current plant list: ", this.curPlants[0], ", ", this.curPlants[1], ", ", this.curPlants[2], ", ", this.curPlants[3]);
		
		// Write plant name and traits to screen
		var strings = [];
		
		// Add plant name to string array
		strings.push("Requested Plant: ".concat(plantList[this.requestedPlant].name));
		
		// Add traits to string array
		for (var j = 0; j < this.curTraits.length; j++)
		{
			strings.push(this.curTraits[j]);
		}
		
		utility.writeText(backgroundSurface, strings, 96, 64, 64 * 4, 25, false);
		
		// Draw plants on screen and add them to click handler
		for (var j = 0; j < this.curPlants.length; j++)
		{
			//console.debug("loop: ", j, ", ", i);
			var x;
			var y;
			
			switch (j)
			{
				case 0:
					x = 472;
					y = 54;
					break;
				case 1:
					x = 720;
					y = 32;
					break;
				case 2:
					x = 528;
					y = 286;
					break;
				case 3:
					x = 796;
					y = 260;
					break;
			}
			
			if (!this.gameEnd)
			{
				if (this.curPlants[j] === this.requestedPlant)
					utility.addClickItem(x, y, this.imgSize, this.imgSize, this.harvestPlant, [j]);
				else
					utility.addClickItem(x, y, this.imgSize, this.imgSize, this.ignorePlant, [j]);
			}
			
			utility.drawImage
			(
				backgroundSurface, this.curSprites[j],
				0, 0, this.curSprites[j].width, this.curSprites[j].height,
				x, y, this.imgSize, this.imgSize
			);
			
			if (plantList[this.curPlants[j]].invasive)
			{
				utility.drawImage
				(
					gameplaySurface, imgInvasivemark,
					0, 0, imgInvasivemark.width, imgInvasivemark.height,
					x + 80, y + 80, imgInvasivemark.width, imgInvasivemark.height
				);
				if (!utility.contains(gameplay.invasivesSeen, this.curPlants[j]))
				{
					gameplay.invasivesSeen.push(this.curPlants[j]);
					console.debug('added invasive: ',  plantList[this.curPlants[j]].name);
				}
			}
		}
		
		utility.drawImage
		(
			backgroundSurface, imgISpyOverlay,
			0, 0, imgISpyOverlay.width, imgISpyOverlay.height,
			0, 0, 1152, 512
		);
		
		if (this.gameEnd)
		{
			if (!ispy.fromTraining)
			{
				var textOffset = 128;
				var responseString = [];
				
				utility.drawImage
				(
					menuSurface, imgLargeTextBox,
					0, 0, imgLargeTextBox.width, imgLargeTextBox.height,
					textOffset, CANVAS_HEIGHT - this.responseOffset, imgLargeTextBox.width, imgLargeTextBox.height
				);
				
				if (this.isCorrect)
				{
					if (gameplay.currentLevel != Level.Tutorial && !ispy.fromTraining)
						responseString.push(this.dingleBotWinResponses[Math.floor(Math.random() * this.dingleBotWinResponses.length)]);
					else
						responseString.push("Strong in the ways of plant, you are.");
				}
				else
				{
					if (gameplay.currentLevel != Level.Tutorial && !ispy.fromTraining)
						responseString.push(this.dingleBotFailResponses[Math.floor(Math.random() * this.dingleBotFailResponses.length)]);
					else
						responseString.push("That is not the plant you are looking for.  /space_wizard_brain_manipulation");
				}
			
				utility.writeText(menuSurface, responseString, textOffset + 20, CANVAS_HEIGHT - this.responseOffset + 48, 840, 20, false);
				utility.writeForClick(menuSurface, ["Close"], 782 + textOffset, CANVAS_HEIGHT - this.responseOffset - 32 + imgLargeTextBox.height, 100, 20, false, [ispy.leaveISpy, ['']]);
					
				if (this.responseOffset < 120)
					this.responseOffset += 24;
			}
			else
			{
				this.gamesPlayed += 1;
				
				if (this.gamesPlayed < this.maxGames)
				{
					console.debug("Playing game ", this.gamesPlayed);
					this.init();
				}
				else
				{
					trainingGame.returnRate = (.02 * this.gamesCorrect * this.gamesCorrect) + (.1 * this.gamesCorrect);
					console.debug(trainingGame.returnRate);
					ispy.leaveISpy();
				}
			}
		}
	},

	// Handle correct guess
	harvestPlant: function(i)
	{
		if (!ispy.fromTraining)
		{
			quests.finishedQuests.push(ispy.requestedPlant);
			//console.debug('cur quests: ', quests.plantsToIdentify);
			//console.debug('harvested : ', ispy.requestedPlant, ', ', plantList[ispy.requestedPlant].name);
			
			// Show that plant was harvested
			plantList[ispy.requestedPlant].harvested = true;
		}
		else
			ispy.gamesCorrect += 1;

		// Exit game mode
		ispy.gameEnd = true;
		ispy.isCorrect = true;
	},

	// Handle incorrect guess
	ignorePlant: function(i)
	{
		if (gameplay.currentLevel != Level.Tutorial && !ispy.fromTraining)
		{
			quests.addQuest(ispy.requestedPlant, gameplay.currentLevel);
			//console.debug(quests.plantsToIdentify);
			//console.debug(ispy.requestedPlant, ', ', plantList[ispy.requestedPlant].name);
		}
		
		//console.debug("You selected the wrong flower");
		
		gameplay.placeObservationEvent();
		
		ispy.gameEnd = true;
		ispy.isCorrect = false;
	},
	
	leaveISpy: function()
	{
		// Reset requested plant index
		if (ispy.fromTraining)
			trainingGame.finishGame();
			
		ispy.requestedPlant = -1;
		ispy.fromTraining = false;
		ispy.gamesPlayed = 0;
		ispy.gamesCorrect = 0;
		ispy.readyToRender = false;
		
		exiting[currentScreen] = true;
	},
	
	setRequested: function(plantIndex)
	{
		ispy.requestedPlant = plantIndex;
	}
};