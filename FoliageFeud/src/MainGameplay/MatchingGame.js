var matching = {
	tileSize: 105,
	cards: [],
	card1: -1,
	card2: -1,
	numFlipped: 0,
	checkMatchDelay: 0,
	matchesMade: 0,
	timer: 1800,
	timerFull: 1800,
	timerFullNotTraining: 1200,
	fromTraining: false,
	fromEnd: false,
	won: false,
	
	init: function()
	{
		utility.clearAll();
		
		this.cards = [];
		this.matchesMade = 0;
		if (!this.fromEnd)
			this.timer = this.timerFull;
		else
			this.timer = this.timerFullNotTraining;
		
		console.debug(this.fromEnd, ", ", this.timer / 30);
		var plantCards = plant.getMultiplePlants(9);
		
		for (var i = 0; i < plantCards.length; i++)
		{
			var tempNameCard = Object.create(cardObj);
			tempNameCard = matching.createNameCard(plantCards[i]);
			this.cards.push(tempNameCard);
			
			var tempImgCard = Object.create(cardObj);
			tempImgCard = matching.createImgCard(plantCards[i]);
			this.cards.push(tempImgCard);
		}
		
		utility.shuffle(this.cards);
	},
	
	render: function()
	{
		utility.clearAll();
		
		utility.drawImage(
			backgroundSurface, imgISpyBg,
			0, 0, imgISpyBg.width, imgISpyBg.height,
			0, 0, imgISpyBg.width, imgISpyBg.height
		);
		
		this.renderTimer();
		
		utility.writeText(backgroundSurface, ["Match the plant names with its image.", "Click on the pictures to flip them over.", "You have made " + this.matchesMade + " matches"], 96, 128, 64 * 4, 25, false);
		
		var imgsPerRow = 6;
		var gapBetween = 32;
		
		for (var i = 0; i < this.cards.length; i++)
		{
			var x = ((this.tileSize + gapBetween - 12) * (i % imgsPerRow)) + (this.tileSize * 2) + gapBetween + 112;
			var y = ((this.tileSize + gapBetween + 4) * Math.floor((i) / imgsPerRow)) + gapBetween + 10;
			
			if (i === 0 || i === 3)
				x += 3;

			var sprite;
			
			if (this.cards[i].isFlipped || this.cards[i].isFound)
			{
				sprite = plantList[this.cards[i].index].sprite[0];
				
				if (this.cards[i].isImg)
				{
					utility.drawImage
					(
						backgroundSurface, sprite,
						0, 0, sprite.width, sprite.height, x, y,
						this.tileSize, this.tileSize
					);
				}
				else
				{
					utility.writeText(backgroundSurface, [plantList[this.cards[i].index].name], x + 10, y + 40, this.tileSize - 20, 15, false);
				}
				
				if (this.cards[i].isFound)
				{
					utility.drawImage
					(
						gameplaySurface, imgCheckmark,
						0, 0, imgCheckmark.width, imgCheckmark.height,
						x, y, 32, 32
					);
				}
			}
			else
			{
				sprite = imgQuestionMark;
		
				utility.drawImage
				(
					backgroundSurface, sprite,
					0, 0, sprite.width, sprite.height, x, y,
					this.tileSize, this.tileSize
				);
				
				if (this.numFlipped != 2)
					utility.addClickItem(x, y, this.tileSize, this.tileSize, this.flipCard, [i]);
			}
		}
		
		utility.drawImage(
			backgroundSurface, imgInfoOverlay,
			0, 0, imgInfoOverlay.width, imgInfoOverlay.height,
			0, 0, imgInfoOverlay.width, imgInfoOverlay.height
		);
		
		if (this.numFlipped == 2)
		{
			this.checkMatchDelay = (this.checkMatchDelay + 1) % 15;
			
			if (this.checkMatchDelay == 0)
				this.checkMatch();
		}
	},
	
	renderTimer: function()
	{
		if (this.timer > 0)
		{
			var fullTime;
			
			if (!this.fromEnd)
				fullTime = this.timerFull;
			else
				fullTime = this.timerFullNotTraining;
				
			utility.drawImage
			(
				backgroundSurface, imgTimerBg,
				0, 0, imgTimerBg.width, imgTimerBg.height,
				82, 40, 256, 32
			);
			utility.drawImage
			(
				backgroundSurface, imgTimer,
				0, 0, imgTimer.width, imgTimer.height,
				84, 42, Math.floor(256*this.timer/fullTime), 32
			);
			
			if (this.fromEnd)
			{
				utility.drawImage
				(
					backgroundSurface, imgParsnipSprite,
					0, 192, 64, 64,
					Math.floor(256*this.timer/fullTime) + 52, 26, 64, 64
				);
			}
			
			this.timer -= 1;
		}
		else
		{
			this.won = false;
			this.exitMatching();
		}
	},
	
	flipCard: function(i)
	{
		matching.numFlipped += 1;
			
		matching.cards[i].isFlipped = true;
		
		console.debug(plantList[matching.cards[i].index].name);
		
		if (matching.numFlipped === 1)
			matching.card1 = matching.cards[i].index;
		else if (matching.numFlipped === 2)
		{
			matching.card2 = matching.cards[i].index;
			//matching.checkMatch();
		}
	},
	
	checkMatch: function()
	{
		matching.numFlipped = 0;
		
		if (matching.card1 === matching.card2)
		{
			for (var i = 0; i < matching.cards.length; i++)
			{
				if (matching.cards[i].index === matching.card1)
					matching.cards[i].isFound = true;
			}
			
			matching.matchesMade += 1;
		}
		
		var allFound = true;
		
		for (var i = 0; i < matching.cards.length; i++)
		{
			matching.cards[i].isFlipped = false;
			if (matching.cards[i].isFound == false)
				allFound = false;
		}
		
		matching.card1 = -1;
		matching.card2 = -1;
		
		if (allFound)
		{
			this.won = true;
			matching.exitMatching();
		}
	},
	
	createNameCard: function(index)
	{
		var card = Object.create(cardObj);
		card.index = index;
		card.isImg = false;
		card.isFlipped = false;
		card.isFound = false;
		
		return card;
	},
	
	createImgCard: function(index)
	{
		var card = Object.create(cardObj);
		card.index = index;
		card.isImg = true;
		card.isFlipped = false;
		card.isFound = false;
		
		return card;
	},
	
	exitMatching: function()
	{
		if (matching.fromTraining)
		{
			trainingGame.returnRate = Math.min(1.5, (-.0000007 * matching.timer * matching.timer) + (.0021 * matching.timer) + .0009);
			console.debug("Matching done: ", trainingGame.returnRate);
			trainingGame.finishGame();
		}
		exiting[currentScreen] = true;
	}
};

var cardObj = {
	index: -1,
	isImg: false,
	isFlipped: false,
	isFound: false,
};