var matching = {
	tileSize: 105,
	cards: [],
	
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
		
		
		var imgsPerRow = 6;
		var gapBetween = 32;
		
		for (var i = 0; i < this.cards.length; i++)
		{
			var x = ((this.tileSize + gapBetween - 12) * (i % imgsPerRow)) + (this.tileSize * 2) + gapBetween + 112;
			var y = ((this.tileSize + gapBetween + 4) * Math.floor((i) / imgsPerRow)) + gapBetween + 10;
			
			if (i === 0 || i === 3)
				x += 3;
				
			utility.addClickItem(x, y, this.tileSize, this.tileSize, this.flipCard, [i]);

			utility.drawImage
			(
				backgroundSurface, imgQuestionMark,
				0, 0, this.tileSize, this.tileSize, x, y,
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
		console.debug(plantList[matching.cards[i].index].name);
	},
	
	createNameCard: function(index)
	{
		var card = Object.create(cardObj);
		card.index = index;
		card.isImg = false;
		
		return card;
	},
	
	createImgCard: function(index)
	{
		var card = Object.create(cardObj);
		card.index = index;
		card.isImg = true;
		
		return card;
	}
};

var cardObj = {
	index: -1,
	isImg: false,
};