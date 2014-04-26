// Script to rotate the map as needed
// Created by Iron Man on 4/25/2014

var rotate = {

	RotateMap: function(map, direction)
	{
		var newMap = [];
		for (var i = 0; i < map[0].length; i++)
		{
			var tempList = []
			for (var j = 0; j < map.length; j++)
			{
				tempList.push(0);
			}
			newMap.push(tempList);
		}
		if (direction > 3)
			direction %= 4;
		if (direction == 0) // No rotation, base case
		{
			return map;
		}
		else // 90 degree turn, decrement direction and recursively call
		{
			for (var i = 0; i < map.length; i++)
			{
				for (var j = 0; j < map[i].length; j++)
				{
					n = map.length - 1;
					var tile = map[i][j];
					if (tile >= TREE)
					{
						switch(tile)
						{
							case 7:
							case 11:
								if (direction == 2)
								{
									if (tile == 7)
										newMap[j][n - i] = 11;
									else
										newMap[j][n - i] = 7;
								}
								else
								{
									newMap[j][n - i] = tile;
								}
								break;
							case 9:
								newMap[j][n - i] = tile + 1;
								break;
							case 5:
							case 13:
							case 14:
							case 15:
							case 16:
							case 17:
							case 18:
							case 20:
							case 21:
							case 22:
							case 24:
								newMap[j][n - i] = tile + 4;
								break;
							case 25:
							case 26:
							case 28:
								newMap[j][n - i] = tile - 12;
								break;
							case 10:
							case 19:
								newMap[j][n - i] = tile - 4;
								break;
							case 29:
							case 30:
								newMap[j][n - i] = tile + 2;
								break;
							case 6:
							case 31:
								newMap[j][n - i] = tile - 1;
								break;
							case 32:
								newMap[j][n - i] = tile - 3;
								break;
							case 23:
							case 27:
								newMap[j][n - i] = tile;
								break;
						}
					}
					else
					{
						newMap[j][n - i] = tile;
					}
				}
			}
			return this.RotateMap(newMap, direction - 1);
		}
	}
}