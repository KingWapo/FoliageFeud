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
function addItem(x, y, width, height, func)
{
	var item = Object.create(clickObj);
	item.x = x;
	item.y = y;
	item.width = width;
	item.height = height;
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
		if (posx >= clickable[i].x && posx <= clickable[i].x + clickable[i].width &&
			posy >= clickable[i].y && posy <= clickable[i].y + clickable[i].height)
		{
			clickable[i].func();
		}
	}
}

function isIntersecting(x, y, width, height)
{
	for (var i = 0; i < clickable.length; i++)
	{
		if (((clickable[i].x + clickable[i].width >= x &&
			clickable[i].y + clickable[i].height >= y) ||
			(x <= clickable[i].x && y <= clickable[i].y)) &&
			((x + width >= clickable[i].x &&
			y + height >= clickable[i].y) ||
			(clickable[i].x <= x && clickable[i].y <= y)))
			return true;
	}
	
	return false;
}

window.addEventListener("click", handleClick, false);