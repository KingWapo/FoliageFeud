var matching = {
	tileSize: 105,
	cards: [],
	card1: -1,
	card2: -1,
	numFlipped: 0,
	
	init: function()
	{
		utility.clearAll();
		
		this.cards = [];
		
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
			}
			else
			{
				sprite = imgQuestionMark;
				
				utility.addClickItem(x, y, this.tileSize, this.tileSize, this.flipCard, [i]);
			}
			
			utility.drawImage
			(
				backgroundSurface, sprite,
				0, 0, sprite.width, sprite.height, x, y,
				this.tileSize, this.tileSize
			);
		}
		
		utility.drawImage(
			backgroundSurface, imgInfoOverlay,
			0, 0, imgInfoOverlay.width, imgInfoOverlay.height,
			0, 0, imgInfoOverlay.width, imgInfoOverlay.height
		);
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
			matching.checkMatch();
		}
	},
	
	checkMatch: function()
	{
		console.debug("checking match");
		matching.numFlipped = 0;
		
		if (matching.card1 === matching.card2)
		{
			for (var i = 0; i < matching.cards.length; i++)
			{
				if (matching.cards[i].index === matching.card1)
					matching.cards[i].isFound = true;
			}
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
			exiting[currentScreen] = true;
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
	}
};

var cardObj = {
	index: -1,
	isImg: false,
	isFlipped: false,
	isFound: false,
};