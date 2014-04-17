var matching = {
	tileSize: 128,
	cards: [],
	
	init: function()
	{
		this.cards = plant.getMultiplePlants(9);
		
		console.debug(this.cards);
		
		for (var i = 0; i < this.cards.length; i++)
		{
			var tempNameCard = Object.create(cardObj);
			tempNameCard = matching.createNameCard(this.cards[i]);
			this.cards[i] = tempNameCard;
			
			var tempImgCard = Object.create(cardObj);
			tempImgCard = matching.createImgCard(this.cards[i]);
			this.cards.push(tempImgCard);
		}
		
		this.cards.shuffle();
		
		
		var imgsPerRow = 6;
		var gapBetween = 32;
		
		for (var i = this.plantsPerPage * this.page; i < Math.min(this.plantsPerPage * (this.page + 1), plantList.length); i++)
		{
			var sprite = new Image();
			var x = ((this.tileSize + gapBetween - 12) * (i % imgsPerRow)) + (this.tileSize * 2) + gapBetween + 112;
			var y = ((this.tileSize + gapBetween + 4) * Math.floor((i % this.plantsPerPage) / imgsPerRow)) + gapBetween + 10;
			
			if (i === 0 || i === 3)
				x += 3;
				
			sprite = imgQuestionMark;
			utility.addClickItem(x, y, this.tileSize, this.tileSize, this.flipCard, [i]);

			utility.writeText(menuSurface, [i], x, y, 50, 20, true);
			backgroundSurface.drawImage
			(
				sprite,
				0, 0, sprite.width, sprite.height, x, y,
				this.tileSize, this.tileSize
			);
		}
		
		backgroundSurface.drawImage(
			imgInfoOverlay,
			0, 0
		);
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