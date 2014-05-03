// Script to select Character to play as.
// Created by Iron Man 5/3/2014

var characterSelection = {
	
	male1: Object.create(spriteObject),
	female1: Object.create(spriteObject),
	male2: Object.create(spriteObject),
	female2: Object.create(spriteObject),
	curFrame: 0,
	curDirection: 3,
	animReset: 100,
	animTime: 0,
	
	init: function()
	{
		this.curFrame = 0;
		this.curDirection = 3;
		this.animTime = 0;
		
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
		
		this.animTime = (this.animTime + 1) % this.animReset;
		
		if (this.animTime % 2 == 0)
			this.curFrame = (this.curFrame + 1) % 9;
		
		if (this.animTime % 5 == 0)
		{
			if (this.animTime > this.animReset - 25)
			{
				switch(this.curDirection)
				{
					case 1:
						this.curDirection = 4;
						break;
					case 2:
						this.curDirection = 3;
						break;
					case 3:
						this.curDirection = 1;
						break;
					case 4:
						this.curDirection = 2;
						break;
				}
			}
		}
		
		utility.drawImage(
			backgroundSurface, imgCommonBg,
			0, 0, imgCommonBg.width, imgCommonBg.height,
			0, 0, imgCommonBg.width, imgCommonBg.height
			);
		
		utility.drawImage(
			gameplaySurface, this.male1.sprite,
			this.male1.sourceWidth * this.curFrame, this.male1.sourceHeight * this.curDirection, this.male1.sourceWidth, this.male1.sourceHeight,
			this.male1.x, this.male1.y, this.male1.width, this.male1.height
			);
		utility.addClickItem(this.male1.x, this.male1.y, this.male1.width, this.male1.height, function(){currentSprite = SpriteState.Boy; exiting[currentScreen] = true;});
			
		utility.drawImage(
			gameplaySurface, this.female1.sprite,
			this.female1.sourceWidth * this.curFrame, this.female1.sourceHeight * this.curDirection, this.female1.sourceWidth, this.female1.sourceHeight,
			this.female1.x, this.female1.y, this.female1.width, this.female1.height
			);
		utility.addClickItem(this.female1.x, this.female1.y, this.female1.width, this.female1.height, function(){currentSprite = SpriteState.Girl; exiting[currentScreen] = true;});
			
		utility.drawImage(
			gameplaySurface, this.male2.sprite,
			this.male2.sourceWidth * this.curFrame, this.male2.sourceHeight * this.curDirection, this.male2.sourceWidth, this.male2.sourceHeight,
			this.male2.x, this.male2.y, this.male2.width, this.male2.height
			);
		utility.addClickItem(this.male2.x, this.male2.y, this.male2.width, this.male2.height, function(){currentSprite = SpriteState.Boy2; exiting[currentScreen] = true;});
			
		utility.drawImage(
			gameplaySurface, this.female2.sprite,
			this.female2.sourceWidth * this.curFrame, this.female2.sourceHeight * this.curDirection, this.female2.sourceWidth, this.female2.sourceHeight,
			this.female2.x, this.female2.y, this.female2.width, this.female2.height
			);
		utility.addClickItem(this.female2.x, this.female2.y, this.female2.width, this.female2.height, function(){currentSprite = SpriteState.Girl2; exiting[currentScreen] = true;});
	}
};