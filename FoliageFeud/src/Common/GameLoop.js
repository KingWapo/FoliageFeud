// Created By Iron Man

// Debug stuff:

window.addEventListener("keydown", function(event) 
{ 
	if (event.keyCode >= 48 && event.keyCode <= 57) 
	{ 
		currentScreen = event.keyCode - 48; 
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
		 true // End
		 ];
// Bool list for the loaded positions
screensLoaded = [true, // Title
				 false, // Gameplay
				 false, // Information
				 false, // Observation
				 false, // SkillBook
				 false, // TrainingMode
				 false, // WorldEvent
				 false // End
				 ];

// Bool list for the loaded positions
exiting = [false, // Title
			 false, // Gameplay
			 false, // Information
			 false, // Observation
			 false, // SkillBook
			 false, // TrainingMode
			 false, // WorldEvent
			 false // End
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
	End: 7
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

mainUpdate();

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
			}
			informationUpdate();
			informationRender();
			break;
		case ScreenState.Observation: // ISpy Gameplay
			if (entering[currentScreen])
			{
				ispy.init();
			}
			ispy.update();
			ispy.render();
			break;
		case ScreenState.SkillBook:
			break;
		case ScreenState.TrainingMode:
			break;
		case ScreenState.WorldEvent:
			if (!entered)
			{
				entered = true;
				onEnterWorldEvent();
			}
			buildWorldEventsMap();
			screensLoaded[currentScreen] = true;
			if (exited)
			{
				screensLoaded[ScreenState.WorldEvent] = false;
				screensLoaded[ScreenState.Gameplay] = true;
				entered = false;
				exited = false;
			}
			break;
		case ScreenState.End:
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