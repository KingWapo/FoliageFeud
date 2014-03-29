// Created by Batman

// Clickable object
// Stores location, size, and function to run when clicked
var clickObj = {
	x: 0,
	y: 0,
	w: 0,
	h: 0,
	func: ""
};

// Click Handler
var utility = {
	// List of clickable objects in current screen
	clickable: [],
	
	// Clear screen and all objects from clickable
	clearAll: function()
	{
		this.clearClickHandler();
		
		backgroundSurface.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
		gameplaySurface.clearRect(0, 0, gameplayCanvas.width, gameplayCanvas.height);
		menuSurface.clearRect(0, 0, menuCanvas.width, menuCanvas.height);
	},
	
	// Add item to the list
	addClickItem: function(x, y, width, height, func)
	{
		var item = Object.create(clickObj);
		item.x = x;
		item.y = y;
		item.width = width;
		item.height = height;
		item.func = func;
		
		this.clickable.push(item);
	},
	
	// Clear list
	clearClickHandler: function()
	{
		this.clickable = [];
	},
	
	// Determines if object was clicked, and runs function
	handleClick: function(event)
	{
		// Gets position of click
		var rect = gameplayCanvas.getBoundingClientRect();
		var posx = event.clientX - rect.left;
		var posy = event.clientY - rect.top;
		
		// Checks each object to see if it was clicked
		for (var i = 0; i < utility.clickable.length; i++)
		{
			// If image was clicked, runs specified function
			if (posx >= utility.clickable[i].x && posx <= utility.clickable[i].x + utility.clickable[i].width &&
				posy >= utility.clickable[i].y && posy <= utility.clickable[i].y + utility.clickable[i].height)
			{
				utility.clickable[i].func(i);
			}
		}
	},
	
	// Write text to screen, wrapping if hits max width
	writeText: function(context, text, x, y, maxWidth, lineHeight)
	{
		context.clearRect(0, 0, 1152, 512);
		
		context.fillStyle = "#000";
		context.font = "20px Arial";
		
		for (var j = 0; j < text.length; j++)
		{
			var words = text[j].split(' ');
			var line = '';
			
			for (var i = 0; i < words.length; i++)
			{
				var testLine = line + words[i] + ' ';
				var metrics = context.measureText(testLine);
				var testWidth = metrics.width;
				
				if (testWidth > maxWidth && i > 0)
				{
					context.fillText(line, x, y);
					line = words[i] + ' ';
					y += lineHeight;
				}
				else
				{
					line = testLine;
				}
			}
			
			context.fillText(line, x, y);
			
			y += lineHeight * 2;
		}
	},
	
	clamp: function(val, minVal, maxVal)
	{
		return Math.max(minVal, Math.min(val, maxVal));
	},
	
	collisionDetection: function(chaseTheCollider, brandonTheCollidee)
	{
		if ( chaseTheCollider.x > brandonTheCollidee.x + brandonTheCollidee.width ||
			 chaseTheCollider.x + chaseTheCollider.width < brandonTheCollidee.x ||
			 chaseTheCollider.y > brandonTheCollidee.y + brandonTheCollidee.height ||
			 chaseTheCollider.y + chaseTheCollider.height < brandonTheCollidee.y) {
			return false;
		}
		else {
			return true;
		}
	}
};

window.addEventListener("click", utility.handleClick, false);