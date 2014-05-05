// Created By Iron Man

// Debug stuff:

window.addEventListener("keydown", function(event) 
{ 
	if (event.keyCode >= 48 && event.keyCode <= 57) 
	{ 
		if (event.keyCode - 48 == ScreenState.WorldEvent)
			vs.init(ScreenState.WorldEvent);
		else
			switchGamemode(event.keyCode - 48); 
	}
	if (event.keyCode === 190)
	{
		info.debugInfo = !info.debugInfo;
		if (info.debugInfo)
			console.debug("debugging info");
		else
			console.debug("not debugging info");
	}
	if (event.keyCode === 188)
	{
		utility.debugSound = !utility.debugSound;
		if (utility.debugSound)
			console.debug("debugging sound");
		else
			console.debug("not debugging sound");
	}
	if (event.keyCode == 61)
	{
		currentSprite = (currentSprite + 1) % 5;
		gameplay.updateSprite();
	}
	if (event.keyCode == 173)
	{
		currentSprite = (currentSprite - 1) % 5;
		gameplay.updateSprite();
	}
	if (event.keyCode == 221)
	{
		var curLevel = (gameplay.currentLevel + 1) % 6
		if (curLevel == 0) curLevel = 1;
		gameplay.nextLevel(curLevel);
	}
}, false);

// Edit Log:
// Edited on 2/25/2014 by Iron Man
// 		Added Screen Management Functionality to be expanded upon later.

// The main Game Loop for Foliage Feud

// Request smoother animation frames
window.requestAnimFrame = (function() {
	        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	        function(callback) {
		        window.setTimeout(callback, 1000 / 60);
	        };
        })();
		

var playerBePlayin = false;

// Bool list for the loaded positions
entering = [true, // Title
		 true, // Gameplay
		 true, // Information
		 true, // Observation
		 true, // SkillBook
		 true, // TrainingMode
		 true, // WorldEvent
		 true, // BaseCamp
		 true, // End
		 true, // Matching

		 true, // Shop
		 true, // SNA
		 true, // Sibling

		 true, //Intro
		 ];
// Bool list for the loaded positions
screensLoaded = [true, // Title
				 false, // Gameplay
				 false, // Information
				 false, // Observation
				 false, // SkillBook
				 false, // TrainingMode
				 false, // WorldEvent
				 false, // BaseCamp
				 false, // End
				 false, // Matching
				 false, // Shop
				 false, // SNA
				 false, // Sibling
				 false, //Intro

				 ];

// Bool list for the loaded positions
exiting = [false, // Title
			 false, // Gameplay
			 false, // Information
			 false, // Observation
			 false, // SkillBook
			 false, // TrainingMode
			 false, // WorldEvent
			 false, // BaseCamp
			 false, // End

			 false, // Matching
			 false, // Shop
			 false, // SNA
			 false, // Sibling

			 false,  // TestCode
			 false// Intro

			 ];

// Enum to determine the screen the game is currently at
ScreenState = {
	Title: 0,
	Gameplay: 1,
	Information: 2,
	Observation: 3,
	SkillBook: 4,
	TrainingMode: 5,
	WorldEvent: 6,
	BaseCamp: 7,
	End: 8,
	Matching: 9,

	ShopScreen: 10,
	SNASelectionScreen: 11,
	SiblingInteraction: 12,

	CharacterSelection: 13,
};

// Instances of the Screens 
//var title = Object.create(titleObject);

SpriteState = {
	Girl: 0,
	Boy: 1,
	Girl2: 6,
	Boy2: 7,
	Parsnip: 2,
	Dingle: 3,
	BlackDingle: 4,
	Botnip: 5,
	Englishman: 6
};

// vars to hold current and previous screens
if (isDemo)
{
	var currentScreen = ScreenState.TrainingMode;
}
else
{
	var currentScreen = ScreenState.Title;
}
var currentSprite = SpriteState.Girl;

// Frames per a second
var fps = 60;

var counter = 0;

//mainUpdate();

function mainUpdate()
{
	backgroundSurface.save();
	gameplaySurface.save();
	
	utility.handleScale();
	
	// Find the screen currently being used and update it.
	switch(currentScreen)
	{
		case ScreenState.Title: // Main Title Screen
			if (entering[currentScreen])
			{
				title.init();
				entering[currentScreen] = false;
			}
			title.render();
			if (exiting[currentScreen])
			{
				
				switchGamemode(ScreenState.CharacterSelection); //Activate CharacterSelection screen
				//switchGamemode(ScreenState.Gameplay); // Remove this
			}
			break;
		case ScreenState.CharacterSelection:
			if (entering[currentScreen])
			{
				characterSelection.init();
				entering[currentScreen] = false;
			}
			characterSelection.render();
			if (exiting[currentScreen])
			{
				switchGamemode(ScreenState.Gameplay);
			}
		case ScreenState.BaseCamp: // BaseCamp Screen
			if (entering[currentScreen])
			{
			}
			
			
			break;
		case ScreenState.Gameplay: // Gameplay Screen
			if (entering[currentScreen])
			{
				gameplay.init();
				entering[currentScreen] = false;
			}
			
			gameplay.update();
			gameplay.render();
			break;
			
		case ScreenState.Information: // Information Screen
			if (entering[currentScreen])
			{
				info.page = 0;
				info.init();
				entering[currentScreen] = false;
			}
			if (exiting[currentScreen])
			{
				
				switchGamemode(ScreenState.Gameplay);
			}
			info.render();
			info.update();
			break;
		case ScreenState.Observation: // ISpy Gameplay
			if (entering[currentScreen])
			{
				ispy.init();
				entering[currentScreen] = false;
				
			}
			if (exiting[currentScreen])
			{
				gameplay.writtingClear();
				if (ispy.fromTraining)
				{
					switchGamemode(ScreenState.TrainingMode);
					ispy.fromTraining = false;
				}
				else if (ispy.fromEnd)
				{
					switchGamemode(ScreenState.End);
					ispy.fromEnd = false;
				}
				else
					switchGamemode(ScreenState.Gameplay);
				utility.clearClickHandler();
			}
			else
			{
				if (ispy.readyToRender)
					ispy.render();
			}
			break;
		case ScreenState.SkillBook:
			
			break;
		case ScreenState.TrainingMode:
			if (entering[currentScreen])
			{
				trainingScreen.init();
				entering[currentScreen] = false;
			}
			trainingScreen.render();
			break;
		case ScreenState.WorldEvent:
			if (entering[currentScreen])
			{
				screensLoaded[currentScreen] = true;
				worldEvent.init();
				entering[currentScreen] = false;
			}
			worldEvent.update();
			worldEvent.render();
			if (exiting[currentScreen])
			{
				screensLoaded[currentScreen] = false;
				entering[currentScreen] = true;
				exiting[currentScreen] = false;
				worldEvent.onExit();
			}
			break;
		case ScreenState.End:
			if (entering[currentScreen])
			{
				endScene.init();
				entering[currentScreen] = false;
			}
			endScene.update();
			endScene.render();
			if (exiting[currentScreen])
			{
				screensLoaded[currentScreen] = false;
				entering[currentScreen] = true;
				exiting[currentScreen] = false;
				gameplay.nextLevel(Level.BaseCamp);
				currentScreen = ScreenState.Gameplay;
			}
			break;
		case ScreenState.Matching:
			if (entering[currentScreen])
			{
				matching.init();
				entering[currentScreen] = false;
			}
			matching.render();
			if (exiting[currentScreen])
			{
				if (matching.fromTraining)
				{
					matching.fromTraining = false;
					switchGamemode(ScreenState.TrainingMode);
				}
				else if (matching.fromEnd)
				{
					matching.fromEnd = false;
					if (matching.won)
					{
						switchGamemode(ScreenState.End);
					}
					else
					{
						endScene.overallIndex = 1;
						switchGamemode(ScreenState.End);
					}
				}
				else
					switchGamemode(ScreenState.Gameplay);
			}
			break;

		case ScreenState.ShopScreen:
		if (entering[currentScreen])
			{
				shop.initShop();
				entering[currentScreen] = false;
			}
			shop.render();
			break;
		case ScreenState.SNASelectionScreen:
			if (entering[currentScreen])
			{
				snaSelect.init();
				entering[currentScreen] = false;
			}
			snaSelect.render();
			break;
		case ScreenState.SiblingInteraction:
			if (entering[currentScreen])
			{
				mainCamp.init();
				entering[currentScreen] = false;
			}
			mainCamp.render();
			break;
		case ScreenState.Intro:
			if (entering[currentScreen])
			{
				Intro.init();
				entering[currentScreen] = false;
			}
			title.render();
			if (exiting[currentScreen])
			{
				switchGamemode(ScreenState.Gameplay);
			}

			break;
	}
	//The animation loop
  	setTimeout( function()
		{
			requestAnimFrame(mainUpdate, gameplayCanvas);
		}, 1000/30);
	
	backgroundSurface.restore();
	gameplaySurface.restore();
}

function switchGamemode(newScreen)
{
	screensLoaded[currentScreen] = false;
	exiting[currentScreen] = false;
	if (currentScreen == ScreenState.WorldEvent)
	{
		worldEvent.onExit();
	}
	currentScreen = newScreen;
	screensLoaded[currentScreen] = true;
	if (currentScreen != ScreenState.Gameplay)
		entering[currentScreen] = true;
}