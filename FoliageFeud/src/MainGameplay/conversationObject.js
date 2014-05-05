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
	
	//setPlayerSprite();
	var count=0;
	this.drawTalking();
	switch(this.convoType)
	{
		case  "tutorial" :
		{
			this.speaking=true;
			this.conversation.push("You are up!?! I have taken your brothers assistant.This merely phase one of my revenge" , "Hey! that is my assitant! How dare you mess with me you sad excuse for a carrot!", "carrot! HOW dare you!!! I am the dreaded Professor Parsnip!"," you are just another one of my failed experiments now return my assistant!", "Sorry to interupt,but that is my fiance")
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
	
	switch(this.index)
	{
		case 0:
		
		{	this.speakerReset();
			this.speaking=true;
			this.parsnip=true;
			var strings=[];
			strings.push(this.conversation[this.index]);
				gameplay.createTextBox(400,375,320,132);
			utility.writeText(menuSurface, strings, 420,425,320, 18, false);
			this.drawTalking();
		}
		break;
		case 1:
		{	
			this.speakerReset();
			this.speaking=true;
			var strings=[];
			this.sibling=true;
			strings.pop();
			this.drawTalking();
			strings.push(this.conversation[this.index]);
			gameplay.createTextBox(400,375,320,132);
			utility.writeText(menuSurface, strings, 425,425, 320, 25, false);
			this.drawTalking();
		
			
		}
		break;
		case 2:
		{	
			this.speakerReset();
			this.speaking=true;
			var strings=[];
			this.parsnip=true;
			strings.pop();
			this.drawTalking();
			strings.push(this.conversation[this.index]);
			gameplay.createTextBox(400,375,320,132);
			utility.writeText(menuSurface, strings, 425,425, 320, 25, false);
			this.drawTalking();
		
			
		}
		break;
		case 3:
		{
		this.speaking=true;
			var strings=[];
			this.speakerReset();
			this.sibling=true;
			strings.pop();
			this.drawTalking();
			strings.push(this.conversation[this.index]);
			gameplay.createTextBox(400,375,320,132);
			utility.writeText(menuSurface, strings, 425,425, 320, 25, false);
			this.drawTalking();
	}
	break;
	case 4:
	{
	this.speaking=false;
	this.speakerReset();
	
	}
	break;
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
/*setPlayerSpite:function()
{
     if(this.playerSprite=="boy")
	 {
		return 
	 }
}
*/
	
}