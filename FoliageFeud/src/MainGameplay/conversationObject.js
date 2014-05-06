// JavaScript Document
var conversationObject=
{
	parsnip:false,
	mainCharacter:false,
	sibling:false,
	conversation:[],
	convoType:"none",
	height:0,
	width:0,
	speaking:false,
	index:0,
	arrow:true,
	siblling:true,
	player:true,
	playerSprite:"",
	
checkConversation:function()
{
	
	
	var count=0;
	this.drawTalking();
	switch(this.convoType)
	{
		case  "tutorial" :
		{
			this.speaking=true;
			this.conversation.push("You are up. I have taken your brothers assistant.This merely phase one of my revenge." , "Hey! that is my assitant. How dare you mess with me you sad excuse for a carrot.", "carrot! HOW dare you!!! I am the dreaded Professor Parsnip!"," you are just another one of my failed experiments now return my assistant!", "Sorry to interupt,but that is my fiance...also why do you look so old?","..I was trying to age myself to get a discount on chemicals...after I did this I heard the chemicals weren't even labeled. I regret my decision","You are a mad scientist who can't afford supplies?", " The hat buisness has been slow thanks to that thing that took your beloved fiance"," It is all part of my plan. As a product of nature I shall claim it for myself. ONLY I can master its knowledge. ", "Well now he ran off hurry brother get to that bouncing exclamation point I have set up", " I can't swim..or climb..","Well lucky for you I have placed my new power coins near by. Gather them and you will instantly learn how to pass over any obstacle."," for a price I will even give you the newer models", "You are making a profit off me losing my fiance.. ", "Maybe my next expriement will be made with NON discount chemicals and won't try to take over the natural world ", " FINE i'll help you, but only because the wedding is coming up"  )
			this.startConvoTutorial();
		}
	break;
		case "none":
		{
			this.conversation=[];
			
		}
		break;
	}
	
},
startConvoTutorial:function()
{
	
	switch(utility.textIndex)
	{
		case 0:
		case 2:
		case 8:
		{	/*this.speakerReset();
			this.speaking=true;
			var strings=[];
			strings.push(this.conversation[this.index]);
				gameplay.createTextBox(400,375,352,132);
			utility.writeText(menuSurface, strings, 410,425,320, 16, false);*/
			this.parsnip=true;
			this.drawTalking();
		}
		break;
		case 1:
		case 3:
		case 5:
		case 7:
		case 9:
		case 11:
		case 12:
		case 14:
		{	
			/*this.speakerReset();
			this.speaking=true;
			var strings=[];
			strings.pop();
			this.drawTalking();
			strings.push(this.conversation[this.index]);
			gameplay.createTextBox(400,375,352,132);
			utility.writeText(menuSurface, strings, 410,425, 320, 16, false);*/
			this.sibling=true;
			this.drawTalking();
		
			
		}
	break;
	case 4:
	{
		this.speaking=true;
			var strings=[];
			this.speakerReset();
			this.getPlayerSprite();
			strings.pop();
			strings.push(this.conversation[this.index]);
			gameplay.createTextBox(400,375,320,132);
			utility.writeText(menuSurface, strings, 410,425, 320, 16, false);
			this.drawTalking();
	
	
	}
	break;
		case 6:
	{
		this.speaking=true;
			var strings=[];
			this.speakerReset();
			this.getPlayerSprite();
			strings.pop();
			strings.push(this.conversation[this.index]);
			gameplay.createTextBox(400,375,320,132);
			utility.writeText(menuSurface, strings, 410,425, 320, 16, false);
			this.drawTalking();
	
	
	}
	break;
			case 10:
	{
		this.speaking=true;
			var strings=[];
			this.speakerReset();
			this.getPlayerSprite();
			strings.pop();
			strings.push(this.conversation[this.index]);
			gameplay.createTextBox(400,375,320,132);
			utility.writeText(menuSurface, strings, 410,425, 320, 16, false);
			this.drawTalking();
	
	
	}
	break;
				case 13:
	{
		this.speaking=true;
			var strings=[];
			this.speakerReset();
			this.getPlayerSprite();
			strings.pop();
			strings.push(this.conversation[this.index]);
			gameplay.createTextBox(400,375,320,132);
			utility.writeText(menuSurface, strings, 410,425, 320, 16, false);
			this.drawTalking();
	
	
	}
					case 15:
	{
		this.speaking=true;
			var strings=[];
			this.speakerReset();
			this.getPlayerSprite();
			strings.pop();
			strings.push(this.conversation[this.index]);
			gameplay.createTextBox(400,375,320,132);
			utility.writeText(menuSurface, strings, 410,425, 320, 16, false);
			this.drawTalking();
	
	
	}
	break;
	
					case 16:
	{
		this.speaking=false;
			var strings=[];
			this.speakerReset();
	
	}
	
		
		
}
	

	
	
	
},
drawTalking:function()
{
	if(this.parsnip==true)
	{
		
		utility.drawImage(
			menuSurface, imgNip,
			0, 0, imgNip.width, imgNip.height,
			400, 250, imgNip.width, imgNip.height
		);
		
	}
	if(this.sibling==true)
	{
		
		utility.drawImage(
			menuSurface, imgShopSibling,
			0, 0, imgShopSibling.width, imgShopSibling.height,
			400, 250, imgShopSibling.width, imgShopSibling.height
		);
		
		
	}
	if(this.speaking==true)
	{
		imgRightArrow
		utility.drawImage(
			menuSurface, imgRightArrow,
			0, 0, imgRightArrow.width,imgRightArrow.height,
			525, 475, imgRightArrow.width, imgRightArrow.height
		);
		utility.addClickItem(525,475,imgRightArrow.width,imgRightArrow.height,conversationObject.nextPage);
	}
},
nextPage:function()
{
	conversationObject.index+=1;
	utility.clearAll();
	
},
speakerReset:function()
{
	this.parsnip=false;
	this.player=false;
	this.sibling=false;
},
getPlayerSprite:function()
{
     if(this.playerSprite=="boy")
	 {
		 utility.drawImage(
			menuSurface, imgBoyTalking,
			0, 0, imgBoyTalking.width, imgBoyTalking.height,
			400, 250, 64, 64
		);
		 
		
	 }
	  if(this.playerSprite=="girl")
	 {
		 utility.drawImage(
			menuSurface, imgBoyTalking,
			0, 0, imgBoyTalking.width, imgBoyTalking.height,
			400, 250, 64, 64
		);
		 
		
	 } if(this.playerSprite=="boy2")
	 {
		 utility.drawImage(
			menuSurface, imgBoyTalking,
			0, 0, imgBoyTalking.width, imgBoyTalking.height,
			400, 250, 64, 64
		);
		 
		
	 } if(this.playerSprite=="girl2")
	 {
		 utility.drawImage(
			menuSurface, imgBoyTalking,
			0, 0, imgBoyTalking.width, imgBoyTalking.height,
			400, 250, 64, 64
		);
		 
		
	 }
}

	
}