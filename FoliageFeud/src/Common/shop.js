// JavaScript Document
var shop ={
	display:true,
	menuUI:Object.create(spriteObject),
	
	
drawShop:function()
{
	
		
		utility.drawImage(
			menuSurface, imgShopBg,
			0, 0, imgShopBg.width, imgShopBg.height,
			0, 0, imgShopBg.width, imgShopBg.height
		);
		utility.drawImage(
			menuSurface, imgExitButton,
			0, 0, imgExitButton.width, imgExitButton.height,
			1152 - 320, 512 - 160, imgExitButton.width, imgExitButton.height
		);
		
		utility.addClickItem(menuCanvas.width - 320, menuCanvas.height - 160, imgExitButton.width, imgExitButton.height, gameplay.writtingClear, "");
		
		
}
	
};


