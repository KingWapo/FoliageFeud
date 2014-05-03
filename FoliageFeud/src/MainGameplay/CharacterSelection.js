// Script to select Character to play as.
// Created by Iron Man 5/3/2014

var characterSelection = {
	
	male1: Object.create(spriteObject),
	female1: Object.create(spriteObject),
	male2: Object.create(spriteObject),
	female2: Object.create(spriteObject),
	
	init: function()
	{
		this.male1.x = CANVAS_WIDTH / 4;
		this.male1.y = CANVAS_HEIGHT / 4;
		this.male1.sprite = imgMaleSprite;
		
		this.female1.x = 3 * CANVAS_WIDTH / 4;
		this.female1.y = CANVAS_HEIGHT / 4;
		this.female1.sprite = imgFemaleSprite;
		
		this.male2.x = CANVAS_WIDTH / 4;
		this.male2.y = 3 * CANVAS_HEIGHT / 4;
		this.male2.sprite = imgMaleDiverseSprite;
		
		this.female2.x = 3 * CANVAS_WIDTH / 4;
		this.female2.y = 3 * CANVAS_HEIGHT / 4;
		this.female2.sprite = imgFemaleDiverseSprite;
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
			gameplaySurface, this.male1.sprite,
			this.male1.sourceX, this.male1.sourceY, this.male1.sourceWidth, this.male1.sourceHeight,
			this.male1.x, this.male1.y, this.male1.width, this.male1.height
			);
			
		utility.drawImage(
			gameplaySurface, this.female1.sprite,
			this.female1.sourceX, this.female1.sourceY, this.female1.sourceWidth, this.female1.sourceHeight,
			this.female1.x, this.female1.y, this.female1.width, this.female1.height
			);
			
		utility.drawImage(
			gameplaySurface, this.male2.sprite,
			this.male2.sourceX, this.male2.sourceY, this.male2.sourceWidth, this.male2.sourceHeight,
			this.male2.x, this.male2.y, this.male2.width, this.male2.height
			);
			
		utility.drawImage(
			gameplaySurface, this.female2.sprite,
			this.female2.sourceX, this.female2.sourceY, this.female2.sourceWidth, this.female2.sourceHeight,
			this.female2.x, this.female2.y, this.female2.width, this.female2.height
			);
	}
};