// Created by Batman

// All plant objects

var plantList = [];

function PlantObject(name, lname, family, bloom, invasive, traits, numImages)
{
	this.name = name;
	this.lname = lname;
	this.family = family;
	this.bloom = bloom;
	this.invasive = invasive;
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
	},
	
	getHarvested: function()
	{
		var harvestList = [];
		
		for (var i = 0; i < plantList.length; i++)
		{
			if (!plantList[i].harvested)
				harvestList.push(i);
		}
		
		return harvestList;
	}
}

// Creates a list of all possible plants
plantList.push(new PlantObject("Garlic Mustard", "Alliaria petiolata", "Mustard", "Spring", true, ["Biannual forms a rosette", "Can be 12 to 40 inches tall in second year", "White flowers with four petals", "Has a capsule fruit that can be 1 to 2 inches long", "Strong garlic odor when crushed"], 5));
plantList.push(new PlantObject("Leafy Spurge", "Euphorbia esula", "Spurge", "Spring", true, ["Grows anywhere between 6 and 36 inchest", "Shoots have alternate leaves at top of stem", "Milky white sap on inside of plants", "Sap can cause allergic reaction"], 4));
plantList.push(new PlantObject("Spotted Knapweed", "Centaurea beibersteinii", "Aster and Sunflower", "Mid summer to fall", true, ["Biannual or perennial", "Can be 1 to 4 feet during second year", "Pinkish-purple flowers", "Linear leaves that are pinnately lobed"], 4));
plantList.push(new PlantObject("Purple Loosestrife", "Lythrum salcaria", "Loosestrife", "Late summer", true, ["Flowers are in spikes", "Has 5 petals that are pink-purple in color", "Leaves are opposite or whorls of 3 and have long, smooth edges", "Can grow to 6 feet tall", "Can be partially woody"], 5));
plantList.push(new PlantObject("Reed Canary Grass", "Phalaris arundinaceae", "Grass", "Early summer", true, ["Can grow 2 to 6 feet tall", "Stems are hairless", "Leaves can be 3 to 10 inches long", "Leaves have a rough texture", "Flowers are in dense clusters", "Can have green to purple flower", "Has a tan seed"], 5));
plantList.push(new PlantObject("Phragmites", "Phragmites autralis", "Grass", "Late summer", true, ["Can grow 3 to 20 feet tall", "Has hollow stems", "Has smooth leaves", "Leaves are 6 to 24 inches long", "Flowers are in spikelets", "Flowers are light brown to purple"], 4));
plantList.push(new PlantObject("Buckthorn", "Rhamnus cathartica or Frangula alnus", "Buckthorn", "Spring", true, ["Shrubby plant", "Can grow 20 to 25 feet tall", "Grey to brown bark", "Has lenticels", "Has inconspicuous flowers and red berries in summer and fall"], 4));