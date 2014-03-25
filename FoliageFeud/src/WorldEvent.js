// Script to play the world events mode. 
// Created by Iron Man on 3/25/2014

var worldEventMap = [
   //1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20
	[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // 1
	[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // 2
	[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // 3
	[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // 4
	[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // 5
	[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // 6
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 7
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]  // 8
];


var xMovement = 0;
var playerPosition;
var cameraPosition;

function onEnterWorldEvent()
{
	playerPosition = [player.x, player.y];
	cameraPosition = [camera.x, camera.y];
	
	camera.x = 0;
	camera.y = 0;
	
	player.x = 0;
	player.y = 5 * player.height;
}

function onExitWorldEvent()
{
	player.x = playerPosition[0];
	player.y = playerPosition[1];
	camera.x = cameraPosition[0];
	camera.y = cameraPosition[1];
}

function worldEventUpdate()
{
	
}

function worldEventRender()
{
	cameraRender();
}

function buildWorldEventsMap()
{
	buildMap(worldEventMap);
}
