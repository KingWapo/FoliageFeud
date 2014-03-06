// Created by Batman

// Click Handler

// List of clickable objects in current screen
var clickable = [];

// Clickable object
// Stores location, size, and function to run when clicked
var clickObj = 
{
	x: 0,
	y: 0,
	w: 0,
	h: 0,
	func: ""
};

// Add item to list
function addItem(x, y, w, h, func)
{
	var item = Object.create(clickObj);
	item.x = x;
	item.y = y;
	item.w = w;
	item.h = h;
	item.func = func;
	
	clickable.push(item);
}

function clearClickHandler()
{
	while (clickable.length > 0)
	{
		clickable.pop();
	}
}

// Determines if object was clicked, and runs function
function handleClick(event)
{
	// Gets position of click
	var rect = canvas.getBoundingClientRect();
	var posx = event.clientX - rect.left;
	var posy = event.clientY - rect.top;
	
	// Checks each object to see if it was clicked
	for (var i = 0; i < clickable.length; i++)
	{
		// If image was clicked, runs specified function
		if (posx >= clickable[i].x && posx <= clickable[i].x + clickable[i].w &&
			posy >= clickable[i].y && posy <= clickable[i].y + clickable[i].h)
		{
			clickable[i].func();
		}
	}
}

window.addEventListener("click", handleClick, false);