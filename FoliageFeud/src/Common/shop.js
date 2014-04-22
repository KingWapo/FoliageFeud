// JavaScript Document
var shop ={
	display:true,
	adventure: Object.create(buyableObject),
	
	
drawShop:function()
{
	
		
		menuSurface.drawImage(
			imgShopBg,
			0, 0
		);
		menuSurface.drawImage(
			imgExitButton,
			menuCanvas.width - 320, menuCanvas.height - 160
		);
		menuSurface.drawImage(
			imgAdventure,
			96, 138
		);
		
			this.initShop();
		utility.addClickItem(menuCanvas.width - 320, menuCanvas.height - 160, imgExitButton.width, imgExitButton.height, gameplay.writtingClear, "");
		utility.addClickItem( 96,138,imgAdventure.width,imgAdventure.height,this.buyAdventure,"");
		
	
		
		
},
initShop:function()
{
	shop.adventure.price=1;
	shop.adventure.name="adventure";
	shop.adventure.x=96;
	shop.adventure.y=138;
	shop.adventure.init();
	
},
buyAdventure:function()
{
	shop.adventure.buy();
},

	
};


