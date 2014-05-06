// Script to select Character to play as.
// Created by Iron Man 5/3/2014

var characterSelection = {
	
	sprite0: Object.create(spriteObject),
	sprite1: Object.create(spriteObject),
	sprite2: Object.create(spriteObject),
	sprite3: Object.create(spriteObject),
	sprite4: Object.create(spriteObject),
	curFrame: 0,
	curDirection: 3,
	animReset: 100,
	animTime: 0,
	fromShop: true,
	
	init: function()
	{
		this.curFrame = 0;
		this.curDirection = 3;
		this.animTime = 0;
		
		if (this.fromShop)
		{
			
			this.sprite0.x = (CANVAS_WIDTH - this.sprite0.width) / 2;
			this.sprite0.y = (CANVAS_HEIGHT) / 2;
			switch(originalSprite)
			{
				case SpriteState.Boy:
					this.sprite0.sprite = imgMaleSprite;
					break;
				case SpriteState.Girl:
					this.sprite0.sprite = imgFemaleSprite;
					break;
				case SpriteState.Boy2:
					this.sprite0.sprite = imgMaleDiverseSprite;
					break;
				case SpriteState.Girl2:
					this.sprite0.sprite = imgFemaleDiverseSprite;
					break;
			}
			
			this.sprite1.x = CANVAS_WIDTH / 3;
			this.sprite1.y = CANVAS_HEIGHT / 3;
			this.sprite1.sprite = imgBotnipSprite;
			
			this.sprite2.x = 2 * CANVAS_WIDTH / 3 - 64;
			this.sprite2.y = CANVAS_HEIGHT / 3;
			this.sprite2.sprite = imgParsnipSprite;
			
			this.sprite3.x = CANVAS_WIDTH / 3;
			this.sprite3.y = 2 * CANVAS_HEIGHT / 3;
			if (originalSprite == SpriteState.Boy || originalSprite == SpriteState.Girl) this.sprite3.sprite = imgDingleSprite;
			else this.sprite3.sprite = imgBlackDingleSprite;
			
			this.sprite4.x = 2 * CANVAS_WIDTH / 3 - 64;
			this.sprite4.y = 2 * CANVAS_HEIGHT / 3;
			this.sprite4.sprite = imgEnglishmanSprite;
			

		}
		else
		{
			this.sprite1.x = CANVAS_WIDTH / 3;
			this.sprite1.y = CANVAS_HEIGHT / 3;
			this.sprite1.sprite = imgMaleSprite;
			
			this.sprite2.x = 2 * CANVAS_WIDTH / 3 - 64;
			this.sprite2.y = CANVAS_HEIGHT / 3;
			this.sprite2.sprite = imgFemaleSprite;
			
			this.sprite3.x = CANVAS_WIDTH / 3;
			this.sprite3.y = 2 * CANVAS_HEIGHT / 3;
			this.sprite3.sprite = imgMaleDiverseSprite;
			
			this.sprite4.x = 2 * CANVAS_WIDTH / 3 - 64;
			this.sprite4.y = 2 * CANVAS_HEIGHT / 3;
			this.sprite4.sprite = imgFemaleDiverseSprite;
		}
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
			backgroundSurface, imgMenuBg,
			0, 0, imgMenuBg.width, imgMenuBg.height,
			0, 0, imgMenuBg.width, imgMenuBg.height
			);
		if ( this.fromShop)
		{
			
			utility.drawImage(
				gameplaySurface, this.sprite0.sprite,
				this.sprite0.sourceWidth * this.curFrame, this.sprite0.sourceHeight * this.curDirection, this.sprite0.sourceWidth, this.sprite0.sourceHeight,
				this.sprite0.x, this.sprite0.y, this.sprite0.width, this.sprite0.height
				);
			utility.addClickItem(this.sprite0.x, this.sprite0.y, this.sprite0.width, this.sprite0.height, function(){currentSprite = originalSprite; exiting[currentScreen] = true;});
			
			utility.drawImage(
				gameplaySurface, this.sprite1.sprite,
				this.sprite1.sourceWidth * (this.curDirection - 1), 0, this.sprite1.sourceWidth, this.sprite1.sourceHeight,
				this.sprite1.x, this.sprite1.y, this.sprite1.width, this.sprite1.height
				);
			utility.addClickItem(this.sprite1.x, this.sprite1.y, this.sprite1.width, this.sprite1.height, function(){currentSprite = SpriteState.Botnip; exiting[currentScreen] = true;});
				
			utility.drawImage(
				gameplaySurface, this.sprite2.sprite,
				this.sprite2.sourceWidth * this.curFrame, this.sprite2.sourceHeight * this.curDirection, this.sprite2.sourceWidth, this.sprite2.sourceHeight,
				this.sprite2.x, this.sprite2.y, this.sprite2.width, this.sprite2.height
				);
			utility.addClickItem(this.sprite2.x, this.sprite2.y, this.sprite2.width, this.sprite2.height, function(){currentSprite = SpriteState.Parsnip; exiting[currentScreen] = true;});
				
			utility.drawImage(
				gameplaySurface, this.sprite3.sprite,
				this.sprite3.sourceWidth * this.curFrame, this.sprite3.sourceHeight * this.curDirection, this.sprite3.sourceWidth, this.sprite3.sourceHeight,
				this.sprite3.x, this.sprite3.y, this.sprite3.width, this.sprite3.height
				);
			utility.addClickItem(this.sprite3.x, this.sprite3.y, this.sprite3.width, this.sprite3.height, this.chooseSibling);
				
			utility.drawImage(
				gameplaySurface, this.sprite4.sprite,
				this.sprite4.sourceWidth * this.curFrame, this.sprite4.sourceHeight * this.curDirection, this.sprite4.sourceWidth, this.sprite4.sourceHeight,
				this.sprite4.x, this.sprite4.y, this.sprite4.width, this.sprite4.height
				);
			utility.addClickItem(this.sprite4.x, this.sprite4.y, this.sprite4.width, this.sprite4.height, function(){currentSprite = SpriteState.Englishman; exiting[currentScreen] = true;});
		}
		else
		{
			utility.drawImage(
				gameplaySurface, this.sprite1.sprite,
				this.sprite1.sourceWidth * this.curFrame, this.sprite1.sourceHeight * this.curDirection, this.sprite1.sourceWidth, this.sprite1.sourceHeight,
				this.sprite1.x, this.sprite1.y, this.sprite1.width, this.sprite1.height
				);
			utility.addClickItem(this.sprite1.x, this.sprite1.y, this.sprite1.width, this.sprite1.height, function(){currentSprite = SpriteState.Boy; originalSprite = SpriteState.Boy; exiting[currentScreen] = true;});
				
			utility.drawImage(
				gameplaySurface, this.sprite2.sprite,
				this.sprite2.sourceWidth * this.curFrame, this.sprite2.sourceHeight * this.curDirection, this.sprite2.sourceWidth, this.sprite2.sourceHeight,
				this.sprite2.x, this.sprite2.y, this.sprite2.width, this.sprite2.height
				);
			utility.addClickItem(this.sprite2.x, this.sprite2.y, this.sprite2.width, this.sprite2.height, function(){currentSprite = SpriteState.Girl; originalSprite = SpriteState.Girl; exiting[currentScreen] = true;});
				
			utility.drawImage(
				gameplaySurface, this.sprite3.sprite,
				this.sprite3.sourceWidth * this.curFrame, this.sprite3.sourceHeight * this.curDirection, this.sprite3.sourceWidth, this.sprite3.sourceHeight,
				this.sprite3.x, this.sprite3.y, this.sprite3.width, this.sprite3.height
				);
			utility.addClickItem(this.sprite3.x, this.sprite3.y, this.sprite3.width, this.sprite3.height, function(){currentSprite = SpriteState.Boy2; originalSprite = SpriteState.Boy2; exiting[currentScreen] = true;});
				
			utility.drawImage(
				gameplaySurface, this.sprite4.sprite,
				this.sprite4.sourceWidth * this.curFrame, this.sprite4.sourceHeight * this.curDirection, this.sprite4.sourceWidth, this.sprite4.sourceHeight,
				this.sprite4.x, this.sprite4.y, this.sprite4.width, this.sprite4.height
				);
			utility.addClickItem(this.sprite4.x, this.sprite4.y, this.sprite4.width, this.sprite4.height, function(){currentSprite = SpriteState.Girl2; originalSprite = SpriteState.Girl2; exiting[currentScreen] = true;});
		}
	},
	
	chooseSibling: function()
	{
		if (originalSprite == SpriteState.Boy || originalSprite == SpriteState.Girl)
			currentSprite = SpriteState.Dingle;
		else 
			currentSprite = SpriteState.BlackDingle;
		exiting[currentScreen] = true;
	}
};