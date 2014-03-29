// Created by Batman

// All plant objects

// Environment constants
var MARSH   = "Marsh";
var WATER   = "Water";
var FOREST  = "Forest";
var CLIFF   = "Cliff";
var PRAIRIE = "Prairie";

//var plantNames = ["brown", "orange", "red", "white", "yellow"];
var plantList = [];

function Plant(name, traits, numImages)
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

// Creates a list of all possible plants
plantList.push(new Plant("Liverwort", ["No leaves or stem", "Flattened, branching thallus", "Found near moist, shady stream banks"], 6));
plantList.push(new Plant("Hair-Cap Moss", ["Pointed leaves", "Found in dense colonies in moist, acidic soils", "Specialized internal vascular tissues"], 6));
plantList.push(new Plant("Peat Moss", ["Forms large, deep colonies or floating mats", "Upright stems", "Spherical brown-to-black sporophyte capsules"], 8));