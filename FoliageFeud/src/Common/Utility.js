// Created by Batman

// Clickable object
// Stores location, size, and function to run when clicked
var clickObj = {
	x: 0,
	y: 0,
	w: 0,
	h: 0,
	func: "",
	param: ""
};

// Click Handler
var utility = {
	// List of clickable objects in current screen
	clickable: [],
	colors: [],
	
	// Clear screen and all objects from clickable
	clearAll: function()
	{
		this.clearClickHandler();
		
		backgroundSurface.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
		gameplaySurface.clearRect(0, 0, gameplayCanvas.width, gameplayCanvas.height);
		menuSurface.clearRect(0, 0, menuCanvas.width, menuCanvas.height);
	},
	
	// Add item to the list
	addClickItem: function(x, y, width, height, func, param)
	{
		var item = Object.create(clickObj);
		item.x = x;
		item.y = y;
		item.width = width;
		item.height = height;
		item.func = func;
		item.param = param;
		
		// Debug location of click items
		/*
		menuSurface.rect(x, y, width, height);
		menuSurface.stroke();
		*/
		
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
				utility.clickable[i].func(utility.clickable[i].param);
			}
		}
	},
	
	// Shuffle array
	shuffle: function(array)
	{
		var curIndex = array.length;
		var tempVal;
		var randIndex;
		
		while (0 !== curIndex)
		{
			randIndex = Math.floor(Math.random() * curIndex);
			curIndex -= 1;
			
			tempVal = array[curIndex];
			array[curIndex] = array[randIndex];
			array[randIndex] = tempVal;
		}
		
		return array;
	},
	
	// Write text to screen, wrapping if hits max width
	writeText: function(context, text, x, y, maxWidth, fontSize, isOutlined)
	{
		context.fillStyle = "white";
		context.font = fontSize + "px Evilgreen";
		
		context.lineWidth = 1;
		context.strokeStyle = "black";
		
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
					
					if (isOutlined)
						context.strokeText(line, x, y);
						
					line = words[i] + ' ';
					y += fontSize;
				}
				else
				{
					line = testLine;
				}
			}
			
			context.fillText(line, x, y);
			
			if (isOutlined)
				context.strokeText(line, x, y);
			
			y += fontSize * 2;
		}
	},
	
	// Write text to screen, wrapping if hits max width, and adding a click handler
	// clickHandler[0] is function
	// clickHandler[1] is array of parameters
	writeForClick: function(context, text, x, y, maxWidth, fontSize, isOutlined, clickHandler)
	{
		context.fillStyle = "white";
		context.font = fontSize + "px Evilgreen";
		
		context.lineWidth = 1;
		context.strokeStyle = "black";
		
		var height = 0;
		
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
					
					if (isOutlined)
						context.strokeText(line, x, y);
						
					line = words[i] + ' ';
					y += fontSize;
					
					height += fontSize;
				}
				else
				{
					line = testLine;
				}
			}
			
			context.fillText(line, x, y);
			
			if (isOutlined)
				context.strokeText(line, x, y);
			
			height += fontSize;
			
			utility.addClickItem(x, y - height, testWidth, height, clickHandler[0], clickHandler[1]);
			
			y += fontSize * 2;
		}
	},
	
	contains: function(array, element)
	{
		for (var i = 0; i < array.length; i++)
		{
			if (array[i] == element)
				return true;
		}
		
		return false;
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