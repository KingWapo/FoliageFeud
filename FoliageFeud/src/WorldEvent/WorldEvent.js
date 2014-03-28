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
var playerVars;
var cameraPosition;
var entered = false;
var exited = false;
var offset = 10;

function onEnterWorldEvent()
{
	playerVars = [player.x, player.y, player.speed, player.animation];
	cameraPosition = [camera.x, camera.y];
	
	camera.x = 0;
	camera.y = 0;
	
	player.x = 5 * player.width;
	player.y = 5 * player.height + offset;
	player.speed = player.runSpeed;
	player.animation = Animation.WorldEventRight;
}

function onExitWorldEvent()
{
	player.x = playerVars[0];
	player.y = playerVars[1];
	player.walkSpeed = playerVars[2];
	player.animation = playerVars[3];
	camera.x = cameraPosition[0];
	camera.y = cameraPosition[1];
}

function worldEventUpdate()
{
	player.updateAnimation();
}

function worldEventRender()
{
	cameraRender();
}

function buildWorldEventsMap()
{
	buildMap(worldEventMap);
}
