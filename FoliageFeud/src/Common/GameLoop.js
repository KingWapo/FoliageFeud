// Created By Iron Man

// Debug stuff:

window.addEventListener("keydown", function(event) 
{ 
	if (event.keyCode >= 48 && event.keyCode <= 57) 
	{ 
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

quests.addQuest(Math.floor(Math.random() * plantList.length), 0);

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
		 true, // TestCode
		 true, // Shop
		 true, // SNA
		 true, // Sibling
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
				 false, // TestCode
				 false, // Shop
				 false, // SNA
				 false, // Sibling
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
			 false, // TestCode
			 false, // Shop
			 false, // SNA
			 false, // Sibling
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
	TestCode: 9,
	ShopScreen: 10,
	SNASelectionScreen: 11,
	SiblingInteraction: 12,
};

// Instances of the Screens 
//var title = Object.create(titleObject);

SpriteState = {
	Girl: 0,
	Boy: 1
};

// vars to hold current and previous screens
var currentScreen = ScreenState.Title;
var currentSprite = SpriteState.Girl;

// Frames per a second
var fps = 60;

var counter = 0;

//mainUpdate();

function mainUpdate()
{
	backgroundSurface.save();
	gameplaySurface.save();
	
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
				screensLoaded[currentScreen] = false;
				currentScreen = ScreenState.Gameplay;
				screensLoaded[currentScreen] = true;
				exiting[currentScreen] = false;
				utility.clearClickHandler();
			}
			break;
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
				switchGamemode(ScreenState.Gameplay);
				utility.clearClickHandler();
			}
			break;
		case ScreenState.SkillBook:
			break;
		case ScreenState.TrainingMode:
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
			break;
		case ScreenState.TestCode:
			if (entering[currentScreen])
			{
				test.init();
				entering[currentScreen] = false;
			}
			if (exiting[currentScreen])
			{
				switchGamemode(ScreenState.Gameplay);
			}
			break;
		case ScreenState.ShopScreen:
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
	entering[currentScreen] = true;
}