// JavaScript Document
var shop ={
	display:true,
	catHat: Object.create(buyableObject),
	
	
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
			imgCatHat,
			50, 50
		);
		
			this.initShop();
		
		
		utility.addClickItem(menuCanvas.width - 320, menuCanvas.height - 160, imgExitButton.width, imgExitButton.height, gameplay.writtingClear, "");
		utility.addClickItem( 50,50,imgCatHat.width,imgCatHat.height,this.buyCat,"");
		
	
		
		
},
initShop:function()
{
	shop.catHat.price=1;
},
buyCat:function()
{
	shop.catHat.buy();
},

	
};


