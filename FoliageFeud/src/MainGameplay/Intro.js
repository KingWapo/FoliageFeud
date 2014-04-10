// JavaScript Document
var Intro = {
	girlImage: new Image(),
	boyImage: new Image(),
	Girl: Object.create(spriteObject),
	Boy: Object.create(spriteObject),
	
	introLoaded: false,
		init: function()
	{
	
		cameraController.buildMap(Maps.introMap, 0);
	},
		
	
	
};