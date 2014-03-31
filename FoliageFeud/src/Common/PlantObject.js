// Created by Batman

// All plant objects

var plantList = [];

function PlantObject(name, traits, numImages)
{
	this.name = name;
	this.sprite = [];
	
	for (var i = 0; i < numImages; i++)
	{
		this.sprite[i] = new Image();
		this.sprite[i].src = "../img/Plants/".concat(name, "/", i, ".png");
	}
	
	this.traits = traits;
	this.harvested = false;
}

var plant = {
	getRandTrait: function(index)
	{
		var i = Math.floor(Math.random() * plantList[index].traits.length);
		
		return plantList[index].traits[i];
	},

	getName: function(index)
	{
		return plantList[index].name;
	}
}

// Creates a list of all possible plants
plantList.push(new PlantObject("Liverwort", ["No leaves or stem", "Flattened, branching thallus", "Found near moist, shady stream banks"], 6));
plantList.push(new PlantObject("Hair-Cap Moss", ["Pointed leaves", "Found in dense colonies in moist, acidic soils", "Specialized internal vascular tissues"], 6));
plantList.push(new PlantObject("Peat Moss", ["Forms large, deep colonies or floating mats", "Upright stems", "Spherical brown-to-black sporophyte capsules"], 8));