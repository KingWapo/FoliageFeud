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
	readyToRender: false,
	invasiveSeen: false,
	hasInvasive: false,
	questIndex: -1,
	
	// Training mode variables
	fromTraining: false,
	fromEnd: false,
	gamesPlayed: 0,
	maxGames: 10,
	gamesCorrect: 0,
	gameHistory: new Array(this.maxGames),
	snipHistory: [],
	snipChance: .8,
	CORRECT: 0,
	INCORRECT: 1,
	
	// Initialize game mode
	init: function()
	{
		// Clear canvases and click handler
		utility.clearAll();
		
		this.gameEnd = false;
		this.isCorrect = false;
		this.readyToRender = true;
		this.hasInvasive = false;
		
		if (this.fromTraining || this.fromEnd)
		{
			this.requestedPlant = plant.getRandPlant();
			if (this.gamesPlayed == 0)
			{
				for (var i = 0; i < this.gameHistory.length; i++)
				{
					this.gameHistory[i] = -1;
				}
				
				this.snipHistory = [];
			}
		}
		
		this.responseOffset = 0;
		
		// Add plants to ispy pool
		this.curPlants = plant.getMultiplePlants(3);
		this.curTraits = [];
		this.curSprites = [];
		
		// Add requested plant to ispy pool
		this.curPlants.push(this.requestedPlant);
		if (utility.debugAll)
		{
			console.debug(this.curPlants);
		}
		
		// Shuffle array
		this.curPlants = utility.shuffle(this.curPlants);
		
		if (utility.debugAll)
		{
			console.debug(this.curPlants);
		}
		
		for (var i = 0; i < this.curPlants.length; i++)
		{
			if (plantList[this.curPlants[i]].invasive)
				this.hasInvasive = true;
		}
		
		// Get 2 random traits for the plant
		this.curTraits = plant.get2Traits(this.requestedPlant);
		
		if (utility.debugAll)
			console.debug("ispy: ", this.curPlants);

		for (var i = 0; i < this.curPlants.length; i++)
		{
			var imgNum = Math.floor(Math.random() * plantList[this.curPlants[i]].sprite.length);
			
			this.curSprites.push(plantList[this.curPlants[i]].sprite[imgNum]);
			if (utility.debugAll)
			{
				//console.debug(this.curSprites[i]);
			}
		}
	},
	
	// Draws objects to screen for game mode
	render: function()
	{
		utility.clearAll();
		
		var requested = this.curPlants.indexOf(this.requestedPlant);
		if (utility.debugAll)
			console.debug(requested, ", ", this.curPlants.length);
		
		utility.drawImage(
			backgroundSurface, imgISpyBg,
			0, 0, imgISpyBg.width, imgISpyBg.height,
			0, 0, imgISpyBg.width, imgISpyBg.height
		);
		
		if (this.fromTraining || this.fromEnd)
		{
			utility.drawImage
			(
				backgroundSurface, gameplay.player.sprite,
				128, 0, 64, 64,
				CANVAS_WIDTH - 68, 32, 64, 64
			);
			
			if (this.fromEnd)
			{
				utility.drawImage
				(
					backgroundSurface, imgParsnipSprite,
					0, 192, 64, 64,
					CANVAS_WIDTH - 132, 32, 64, 64
				);
			}
			
			for (var i = 0; i < this.gameHistory.length; i++)
			{
				if (this.gameHistory[i] == this.CORRECT)
				{
					utility.drawImage
					(
						backgroundSurface, imgCheckmark,
						0, 0, imgCheckmark.width, imgCheckmark.height,
						CANVAS_WIDTH - 52, 32 * (i + 3), 32, 32
					);
				}
				else if (this.gameHistory[i] == this.INCORRECT)
				{
					utility.drawImage
					(
						backgroundSurface, imgInvasivemark,
						0, 0, imgInvasivemark.width, imgInvasivemark.height,
						CANVAS_WIDTH - 52, 32 * (i + 3), 32, 32
					);
				}
				if (i < this.snipHistory.length)
				{
					if (this.snipHistory[i])
					{
						utility.drawImage
						(
							backgroundSurface, imgCheckmark,
							0, 0, imgCheckmark.width, imgCheckmark.height,
							CANVAS_WIDTH - 116, 32 * (i + 3), 32, 32
						);
					}
					else if (!this.snipHistory[i])
					{
						utility.drawImage
						(
							backgroundSurface, imgInvasivemark,
							0, 0, imgInvasivemark.width, imgInvasivemark.height,
							CANVAS_WIDTH - 116, 32 * (i + 3), 32, 32
						);
					}
				}
			}
		}
		
		// Plants in current list
		if (utility.debugAll)
		{
			//console.debug("Current plant list: ", this.curPlants[0], ", ", this.curPlants[1], ", ", this.curPlants[2], ", ", this.curPlants[3]);
		}
		
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
			
			if (!this.gameEnd && (this.invasiveSeen || !this.hasInvasive))
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
					x + 100, y + 5, imgInvasivemark.width, imgInvasivemark.height
				);
				if (!utility.contains(gameplay.invasivesSeen, this.curPlants[j]))
				{
					gameplay.invasivesSeen.push(this.curPlants[j]);
					if (utility.debugAll)
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
		
		if (!this.invasiveSeen && this.hasInvasive)
		{
			utility.drawTextBox(["Do you see that red check?  That means a plant is invasive.  After seeing one, come back to camp and I'll give you a reward for identifying them."], "not in use", function(){ispy.invasiveSeen = true;});
		}
		
		if (this.gameEnd)
		{
			if (!ispy.fromTraining && !this.fromEnd)
			{
				var response = [];
				
				if (this.isCorrect)
				{
					if (gameplay.currentLevel != Level.Tutorial && !ispy.fromTraining)
						response.push(this.dingleBotWinResponses[Math.floor(Math.random() * this.dingleBotWinResponses.length)]);
					else
						response.push("Strong in the ways of plant, you are.");
				}
				else
				{
					if (gameplay.currentLevel != Level.Tutorial && !ispy.fromTraining)
						response.push(this.dingleBotFailResponses[Math.floor(Math.random() * this.dingleBotFailResponses.length)]);
					else
						response.push("That is not the plant you are looking for.  /space_wizard_brain_manipulation");
				}
				
				utility.drawTextBox(response, "not in use", ispy.leaveISpy);
			}
			else
			{
				this.gamesPlayed += 1;
				
				if (this.gamesPlayed < this.maxGames)
				{
					if (utility.debugAll)
						console.debug("Playing game ", this.gamesPlayed);
					this.init();
				}
				else
				{
					trainingGame.returnRate = (.0125 * this.gamesCorrect * this.gamesCorrect) + (.025 * this.gamesCorrect);
					if (utility.debugAll)
						console.debug(trainingGame.returnRate);
					ispy.leaveISpy();
				}
			}
		}
	},

	// Handle correct guess
	harvestPlant: function(i)
	{
		if (!ispy.fromTraining && !ispy.fromEnd)
		{
			quests.finishedQuests.push(ispy.requestedPlant);
			plant.totalHarvestAmount += 1;
			for (var i = 0; i < gameplay.questlog.length; i++)
			{
				if (gameplay.questlog[i][0] == ispy.requestedPlant &&
					gameplay.questlog[i][1] == gameplay.currentLevel &&
					!gameplay.questlog[i][2])
					{
						gameplay.questlog[i][2] = true;
					}
			}
			
			// Show that plant was harvested
			plantList[ispy.requestedPlant].harvested = true;
		}
		else
		{
			ispy.gamesCorrect += 1;
			ispy.gameHistory[ispy.gamesPlayed] = ispy.CORRECT;
		}
		
		if (ispy.fromEnd){
			var d = Math.random();
			ispy.snipHistory.push(d < ispy.snipChance);
			console.debug(ispy.snipHistory[ispy.snipHistory.length - 1]);
			}

		// Exit game mode
		ispy.gameEnd = true;
		ispy.isCorrect = true;
	},

	// Handle incorrect guess
	ignorePlant: function(i)
	{
		if (gameplay.currentLevel != Level.Tutorial && !ispy.fromTraining && !ispy.fromEnd)
		{
			quests.addQuest(ispy.requestedPlant, gameplay.currentLevel);
			
			if (utility.debugAll)
			{
				//console.debug(quests.plantsToIdentify);
				//console.debug(ispy.requestedPlant, ', ', plantList[ispy.requestedPlant].name);
			}
		}
		else
		{
			ispy.gameHistory[ispy.gamesPlayed] = ispy.INCORRECT;
		}
		
		if (utility.debugAll)
		{
			//console.debug("You selected the wrong flower");
		}
		
		if (ispy.fromEnd)
			ispy.snipHistory.push(Math.random() < ispy.snipChance);
		
		gameplay.placeObservationEvent();
		
		ispy.gameEnd = true;
		ispy.isCorrect = false;
	},
	
	leaveISpy: function()
	{
		// Reset requested plant index
		if (ispy.fromTraining)
			trainingGame.finishGame();
			
		if (ispy.fromEnd)
		{
			var snipCorrect = 0;
			var playerCorrect = 0;
			for (var i = 0; i < this.maxGames; i++)
			{
				if (ispy.gameHistory[i] == ispy.CORRECT) playerCorrect += 1;
				if (ispy.snipHistory[i]) snipCorrect += 1;
			}
			console.debug("Snip Correct: " + snipCorrect + " Player Correct: " + playerCorrect);
			if (snipCorrect > playerCorrect) endScene.overallIndex = 0;
		}
			
		ispy.requestedPlant = -1;
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