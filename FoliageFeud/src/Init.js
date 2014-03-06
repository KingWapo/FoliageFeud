// Created by Iron Man 2/26/2014

// Script to Initialize anything as needed

function scriptInit()
{
	// The main title scripts
	var titlejs = document.createElement("script");
	titlejs.type = "text/javascript";
	titlejs.src = "MainTitle.js";
	document.body.appendChild(titlejs);
	
	
	// The main gameplay script for the player
	var playerjs = document.createElement("script");
	playerjs.type = "text/javascript";
	playerjs.src = "PlayerScript.js";
	document.body.appendChild(playerjs);

}