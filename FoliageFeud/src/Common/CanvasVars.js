// Script to allow acces to the canvases at any time
// Created by Iron Man 3/28/2014

// The canvas and its drawing surface
var backgroundCanvas = document.getElementById("backgroundCanvas");
var backgroundSurface = backgroundCanvas.getContext("2d");

var gameplayCanvas = document.getElementById("gameplayCanvas");
var gameplaySurface = gameplayCanvas.getContext("2d");

var menuCanvas = document.getElementById("menuCanvas");
var menuSurface = menuCanvas.getContext("2d");


CANVAS_WIDTH = 1152;
CANVAS_HEIGHT = 512;