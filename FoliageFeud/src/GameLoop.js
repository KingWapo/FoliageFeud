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

// Add the plants
var plantobj = document.createElement("script");
plantobj.type = "text/javascript";
plantobj.src = "PlantObj.js";
document.body.appendChild(plantobj);

// Loads the collision detection
var cd = document.createElement("script");
cd.type = "text/javascript";
cd.src = "CollisionDetection.js";
document.body.appendChild(cd);

// Load the click handler
var clickhandler = document.createElement("script");
clickhandler.type = "text/javascript";
clickhandler.src = "Clickhandler.js";
document.body.appendChild(clickhandler);

// Load the title screen
var screenjs = document.createElement("script");
screenjs.type = "text/javascript";
screenjs.src = "MainTitle.js";
document.body.appendChild(screenjs);

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

// vars to hold current and previous screens
var currentScreen = ScreenState.Title;


// Frames per a second
var fps = 60;

var counter = 0;

// The canvas and its drawing surface
var backgroundCanvas = document.getElementById("backgroundCanvas");
var backgroundSurface = backgroundCanvas.getContext("2d");

var canvas = document.getElementById("gameplayCanvas");
var drawingSurface = canvas.getContext("2d");

var menuCanvas = document.getElementById("menuCanvas");
var menuSurface = menuCanvas.getContext("2d");

// This is to create and initialize the layers
// of the canvas using a third party source of 
// canvaslayers.js
// -Iron Man
//
// Didn't really work the way I wanted...
/*
var container = new CanvasLayers.Container(canvas, true);

// Initialize the background to always draw white
container.onRender = function(layer, rect, context) {
	context.fillStyle = "#fff";
	context.fillRect(0, 0, layer.getWidth(), layer.getHeight());
}

var gameplayLayer = new CanvasLayers.Layer(0, 0, canvas.width, canvas.height);
//gameplayLayer.onRender = function(layer, rect, context) {
//	console.debug("Enter onRender");
//	render();
//}
container.getChildren().add(gameplayLayer); // Add the gameplayLayer to the children of the container


var menuLayer;
*/
// Load the image files
var image = new Image();
image.addEventListener("load", loadHandler, false);
image.src = "../img/cat.png";


function loadHandler()
{
	console.debug("Loads");
	mainUpdate();
}

function mainUpdate()
{
	// Find the screen currently being used and update it.
	switch(currentScreen)
	{
		case ScreenState.Title: // Main Title Screen
			// Dynamically Load Main Title js file (Not working...)
			if (!screensLoaded[currentScreen])
			{
				var newScreenjs = document.createElement("script");
				newScreenjs.type = "text/javascript";
				newScreenjs.src = "MainTitle.js";
				document.body.replaceChild(newScreenjs, screenjs);
				screenjs = newScreenjs;
				console.debug("In Title");
			}
			
			break;
		case ScreenState.Gameplay: // Gameplay Screen
			// Load Gameplay js file
			
			if (!screensLoaded[currentScreen])
			{
				var newScreenjs = document.createElement("script");
				newScreenjs.type = "text/javascript";
				newScreenjs.src = "PlayerScript.js";
				document.body.replaceChild(newScreenjs, screenjs);
				screenjs = newScreenjs;
				console.debug("In Gameplay");
				//gameplayLayer.onRender = function(layer, rect, context) {
				//	console.debug("Enter onRender");
				//	render();
				//}
			}
			break;
		case ScreenState.Information:
			break;
		case ScreenState.Observation:
			// Load ISpy js file
			
			if (!screensLoaded[currentScreen])
			{
				var newScreenjs = document.createElement("script");
				newScreenjs.type = "text/javascript";
				newScreenjs.src = "ISpyLoop.js";
				document.body.replaceChild(newScreenjs, screenjs);
				screenjs = newScreenjs;
				console.debug("In ISpy");
			}
			break;
		case ScreenState.SkillBook:
			break;
		case ScreenState.TrainingMode:
			break;
		case ScreenState.WorldEvent:
			break;
		case ScreenState.End:
			break;
	}
	//The animation loop
  	setTimeout( function()
		{
			requestAnimFrame(mainUpdate, canvas);
		}, 1000/30);
	
	update();
	
	mainRender();
}

function mainRender()
{
	backgroundSurface.save();
	drawingSurface.save();
	
	render(); 
	
	backgroundSurface.restore();
	drawingSurface.restore();
	
	
	// New attempt at rendering
	//
	//container.redraw();
}

// Needs to be last call in each game mode to properly load screens
function loadScreens()
{
	for (var i = 0; i < screensLoaded.length; i++)
	{
		if (i == currentScreen)
		{
			screensLoaded[i] = true;
		}
		else
		{
			screensLoaded[i] = false;
		}
	}
}