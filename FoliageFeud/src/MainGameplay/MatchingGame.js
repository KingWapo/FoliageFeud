var matching = {
	tileSize: 128,
	cards: [],
	
	init: function()
	{
		this.cards = plant.getMultiplePlants(9);
		
		for (var i = 0; i < this.cards.length; i++)
		{
			var tempNameCard = Object.create(cardObj);
			tempNameCard.createNameCard(this.cards[i]);
			this.cards[i] = tempCard;
			
			var tempImgCard = Object.create(cardObj);
			tempImgCard.createImgCard(this.cards[i]);
			this.cards.push(tempImgCard);
		}
		
		this.cards.shuffle();
		
		console.debug(this.cards);
	}
};

var cardObj = {
	index: -1,
	isImg: false,
	
	createNameCard: function(index)
	{
		this.index = index;
		this.isImg = false;
	},
	
	createImgCard: function(index)
	{
		this.index = index;
		this.isImg = true;
	}
};