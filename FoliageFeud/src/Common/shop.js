// JavaScript Document
var shop ={
	display:true,
	menuUI:Object.create(spriteObject),
	
	
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
		
		utility.addClickItem(menuCanvas.width - 320, menuCanvas.height - 160, imgExitButton.width, imgExitButton.height, gameplay.writtingClear, "");
		
		
}
	
};


