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
plantList.push(new PlantObject("Club Moss", ["Small, erect, trailing, or creeping, evergreen perennial", "Narrow, simple, crowded leaves"], 7));
plantList.push(new PlantObject("Spike Moss", ["Small, pale green plants", "Smaller leaves than club moss", "Often confused with mosses"], 5));
plantList.push(new PlantObject("Horsetail", ["Mostly small to medium-sized erect plants", "Rigid, hollow, jointed, fluted, branched or unbranched stems", "Triangular, non-photosynthetic leaves"], 7));
plantList.push(new PlantObject("Bracken Fern", ["Strong, coarse toothed fern", "Large leaves", "Triangular outline"], 6));
plantList.push(new PlantObject("Sensitive Fern", ["Large triangular sterile fronts", "Lobed at tip", "Divided into pinnules at base"], 6));