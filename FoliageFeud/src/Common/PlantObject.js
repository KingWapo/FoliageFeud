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
	this.traits = traits;
	this.numImages = numImages;
	this.harvested = false;
	this.loaded = false;
}

var plant = {
	totalPlantImagesLoaded: 0,
	curPlantImagesLoaded: 0,
	
	loadPlant: function(curPlant)
	{
		for (var i = 0; i < curPlant.numImages; i++)
		{
			plant.totalPlantImagesLoaded += 1;
			curPlant.sprite[i] = new Image();
			curPlant.sprite[i].src = "../img/Plants/" + curPlant.name + "/" + i + ".jpg";
			curPlant.sprite[i].addEventListener("load", plant.plantLoaded, false);
		}
		
		curPlant.loaded = true;
	},
	
	plantLoaded: function()
	{
		plant.curPlantImagesLoaded += 1;
		//console.debug("plants loaded ", plant.totalPlantImagesLoaded, ', ', plant.curPlantImagesLoaded);
		if (plant.totalPlantImagesLoaded == plant.curPlantImagesLoaded)
			ispy.readyToRender = true;
	},
	
	getRandTrait: function(index)
	{
		var i = Math.floor(Math.random() * plantList[index].traits.length);
		
		return plantList[index].traits[i];
	},
	
	get2Traits: function(index)
	{
		var curTraits = [];
		
		for (var i = 0; i < 2; i++){
			var trait;
			
			if (curTraits.length < 1)
				trait = plant.getRandTrait(index);
			else
			{
				do
				{
					trait = plant.getRandTrait(index);
				} while (utility.contains(curTraits, trait));
			}
				
			curTraits.push(trait);
		}
		
		return curTraits;
	},

	getName: function(index)
	{
		return plantList[index].name;
	},
	
	getRandPlant: function()
	{
		return Math.floor(Math.random() * plantList.length);
	},
	
	getMultiplePlants: function(n)
	{
		var curPlants = [];
		
		for (var i = 0; i < n; i++){
			var plantIndex;
			
			if (curPlants.length < 1)
				do
				{
					plantIndex = plant.getRandPlant();
				} while (plantIndex === ispy.requestedPlant);
			else
			{
				do
				{
					plantIndex = plant.getRandPlant();
				} while (utility.contains(curPlants, plantIndex) || plantIndex === ispy.requestedPlant);
			}
				
			curPlants.push(plantIndex);
		}
		
		return curPlants;
	},
	
	getRandUnHarvested: function()
	{
		var i;
		
		do
		{
			i = plant.getRandPlant();
		} while (plantList[i].harvested);
		
		return i;
	},
	
	getMultipleUnHarvested: function(n)
	{
		var curPlants = [];
		
		for (var i = 0; i < n; i++){
			var plantIndex;
			
			if (curPlants.length < 1)
				plantIndex = plant.getRandUnHarvested();
			else
			{
				do
				{
					plantIndex = plant.getRandUnHarvested();
				} while (utility.contains(curPlants, plantIndex) || plantIndex === ispy.requestedPlant);
			}
				
			curPlants.push(plantIndex);
		}
		
		return curPlants;
	},
	
	getInvasivePlants: function()
	{
		var invasive = [];
		
		for (var i = 0; i < plantList.length; i++)
		{
			if (plantList[i].invasive)
				invasive.push(i);
		}
		
		return invasive;
	}
}

// Creates a list of all possible plants
plantList.push(new PlantObject("Garlic Mustard", "Alliaria petiolata", "Mustard", "Spring", true, ["Biannual forms a rosette", "Can be 12 to 40 inches tall in second year", "White flowers with four petals", "Has a capsule fruit that can be 1 to 2 inches long", "Strong garlic odor when crushed"], 5));
plantList.push(new PlantObject("Leafy Spurge", "Euphorbia esula", "Spurge", "Spring", true, ["Grows anywhere between 6 and 36 inches", "Shoots have alternate leaves at top of stem", "Milky white sap on inside of plants", "Sap can cause allergic reaction"], 4));
plantList.push(new PlantObject("Spotted Knapweed", "Centaurea beibersteinii", "Aster and Sunflower", "Mid summer to fall", true, ["Biannual or perennial", "Can be 1 to 4 feet during second year", "Pinkish-purple flowers", "Linear leaves that are pinnately lobed"], 4));
plantList.push(new PlantObject("Purple Loosestrife", "Lythrum salcaria", "Loosestrife", "Late summer", true, ["Flowers are in spikes", "Has 5 petals that are pink-purple in color", "Leaves are opposite or whorls of 3 and have long, smooth edges", "Can grow to 6 feet tall", "Can be partially woody"], 5));
plantList.push(new PlantObject("Reed Canary Grass", "Phalaris arundinaceae", "Grass", "Early summer", true, ["Can grow 2 to 6 feet tall", "Stems are hairless", "Leaves can be 3 to 10 inches long", "Leaves have a rough texture", "Flowers are in dense clusters", "Can have green to purple flower", "Has a tan seed"], 5));
plantList.push(new PlantObject("Phragmites", "Phragmites autralis", "Grass", "Late summer", true, ["Can grow 3 to 20 feet tall", "Has hollow stems", "Has smooth leaves", "Leaves are 6 to 24 inches long", "Flowers are in spikelets", "Flowers are light brown to purple"], 4));
plantList.push(new PlantObject("Buckthorn", "Rhamnus cathartica or Frangula alnus", "Buckthorn", "Spring", true, ["Shrubby plant", "Can grow 20 to 25 feet tall", "Grey to brown bark", "Has lenticels", "Has inconspicuous flowers and red berries in summer and fall"], 4));
plantList.push(new PlantObject("Honeysuckle", "Lonicera", "Honeysuckle", "Mid to late spring", true, ["Is a shrub", "Can grow to 15 feet tall", "Has papery bark", "Has tubular flowers", "Has red fruit"], 4));
plantList.push(new PlantObject("Water-Milfoil", "Myriophyllum", "Watermilfoil", "", false, ["Perennial submersed aquatic", "Leaves are whorled and pinnately compound with thread-like leaflets", "Can grow up to 15 feet deep in water"], 4));
plantList.push(new PlantObject("Common Liverwort", "Marchantia polymorpha", "Liverwort", "", false, ["Has no stems or leaves", "Has flattened, branching thallus held in ground by rhizoids", "Grows mostly in shady regions"], 4));
plantList.push(new PlantObject("Peat Moss", "Sphagnum", "Peat Moss", "", false, ["Grows in wetlands and forms deep colonies or floating mats", "Usually grows upright and close to its neighboring plant", "Branches are arranged spirally at top or in clusters", "When mature it has sporophyte capsules that are brown to black"], 4));
plantList.push(new PlantObject("Hair-Cap Moss", "Polytrichum", "Moss", "", false, ["Stem can be up to 12 inches tall", "Spirally arranged leaves that are pointed", "Usually grows in dense groups"], 4));
plantList.push(new PlantObject("Club Moss", "Lycopodium", "Club Moss", "", false, ["Small evergreen perennial that is erect, trialing, or creeping", "Leaves are close together and are narrow and simple", "Sexual reproduction is by a single spore, but some also propagate by growing when older plants die off", "Mostly found in woodland or forest understory"], 4));
plantList.push(new PlantObject("Spike Moss", "Selaginella", "Spike Moss", "", false, ["Grows mostly lower or close to the ground", "Pale green in color and smaller leaves than club moss", "Has both male and female gametophytes produced by two types of spores"], 4));
plantList.push(new PlantObject("Horsetail", "Equisetum", "Horsetail", "", false, ["Small or medium plants", "Can grow rigid, hollow, jointed, fluted, branched, or unbranched", "Leaves are triangular and non-photosynthetic", "Plant spreads through underground rhizomes, but also has a strobilus"], 4));
plantList.push(new PlantObject("Royal Fern", "Osmunda regalis", "Royal Fern", "", false, ["Fronds are bipinnately compound with oblong pinnules that are large and widely spaced", "Fronds can grow over 3 feet tall", "Has fertile fronds that are specialized in spore production", "Turn brown in early summer", "Found in wet forests and bogs"], 4));
plantList.push(new PlantObject("Cinnamon Fern", "Osmunda cinnamomea", "Royal Fern", "", false, ["Sterile fronds are up to 4 feet tall and are pinnately lobed", "Sterile fronds grow in circles around the fertile fronds that develop in last spring", "Fronds are a cinnamon color when mature and are shorter and narrower than sterile fronds"], 4));
plantList.push(new PlantObject("Interrupted Fern", "Osmunda claytoniana", "Royal Fern", "", false, ["Fronds are large and pinnately compound with pinnae that are shorter near the tip and base", "Fronds are dark brown in color", "Grow on drier sites"], 4));
plantList.push(new PlantObject("Bracken Fern", "Pteridium aquilinum", "Bracken", "", false, ["Leaves are large and triangular in outline", "Leaves are divided into pinnae and pinnules", "Often found in poor soil in open woods or woodland openings"], 4));
plantList.push(new PlantObject("Sensitive Fern", "Onoclea sensibilis", "Wood Fern", "", false, ["Sterile fronds are large and triangular in shape", "Fronds are lobed at the tips and usually divided into pinnules closer to the base", "Fertile fronds are separate and have sporangia enclosed in pinnae that are bead-like"], 4));
plantList.push(new PlantObject("Common Polypody", "Polypodium virginianum", "Polypody", "", false, ["Small fern only growing to about 1 foot tall", "Fronds are firm evergreen and pinnately lobed", "Sori are red-brown and located on the underside of fronds", "Mostly grows in damp, shady places on rocks or logs"], 4));
plantList.push(new PlantObject("Maidenhair Fern", "Adiantum pedatum", "Maidenhair", "", false, ["About 2 feet tall with fronds that are finely divided and flat with distinct asymmetrical pinnules", "Wiry and shiny black leafstalks", "Sori located on the underside of the pinnae", "Usually found in understories of rich woods"], 4));
plantList.push(new PlantObject("Balsam Fir", "Abies balsamea", "Pine", "", false, ["Grows to about 40 to 60 feet with needles that are flat", "Needles are about 3/4 to 1 1/2 inches long", "Needles are blunt or notched at the tip and have 2 silvery bands of stomata on the underside", "Cones are 2 to 4 inches long and are purplish, cylindrical, and pointed upwards", "Bark has 'blisters' when young and is a gray reddish-brown when mature"], 4));
plantList.push(new PlantObject("White Spruce", "Picea glauca", "Pine", "", false, ["Grows to about 60 feet", "Has needles that are rigid, prickly, 4-sided, and about 3/4 inches long", "Cones are about 1-2 inches and have thick, smooth, flexible scales", "Bark is ashy brown on outer part and silvery on the inside"], 4));
plantList.push(new PlantObject("Black Spruce", "Picea mariana", "Pine", "", false, ["Grows to about 30 feet", "Needles are rigid, dark green, 4-sided in cross section, and about 1/4 to 1/2 inches long", "Cones are about 1/2 to 1 inch long and have brittle, rough scales", "Bark is reddish brown on the outer part and olive green on the inside", "Found in bogs"], 4));
plantList.push(new PlantObject("Hemlock", "Tsuga canadensis", "Pine", "", false, ["Grows to about 60 to 75 feet", "Needles are minutely stalked, 2-ranked, about 1/4 to 3/4 inches long, and have 2 white bands of stomata on the underside", "Cones are attached by a small stalk and they are about 1/2 to 3/4 inches long", "Bark is a purplish brown, scaly, and deeply furrowed when mature", "Found in cool, moist sites"], 4));
plantList.push(new PlantObject("Tamarack", "Larix laricina", "Pine", "", false, ["Deciduous conifer that is slow growing and can get up to 40 to 80 feet", "Needles are short, and clustered in bunchest of 12 or more", "Needles turn golden yellow in the fall", "Cones are about 1/2 to 1 inch long", "Bark is dark and flaky", "Found in acid bogs"], 4));
plantList.push(new PlantObject("Eastern White Pine", "Pinus strobus", "Pine", "", false, ["Grows up to 100 feet tall", "Needles grow in bundles of 5", "Needles are 3 to 5 inches long and are soft", "Stomata in fine white line on 2 spots of every needle", "Cones are curved and about 4 to 8 inches long with spineless scales", "Bark is gray, smooth when young and matures into broken rectangular blocks"], 4));
plantList.push(new PlantObject("Red Pine", "Pinus resinosa", "Pine", "", false, ["Grows 50 to 100 feet tall", "Needles are 2 to 4 inchesl long and are in bundles of 2", "Bark is scaly and twigs are yellowish and turn a reddish-brown", "Cones are 1 to 2 1/2 inches long"], 4));
plantList.push(new PlantObject("Jack Pine", "Pinus banksiana", "Pine", "", false, ["Grows 70 to 80 feet tall", "Needles are 1 to 1 1/2 inches in bunches of 2 and are stiff and dark green", "Bark is dark gray to reddish brown and scaly", "Cones are 1 to 2 inches long and usually curved toward the tip of the branch"], 4));
plantList.push(new PlantObject("Yew", "Taxus ssp.", "Yew", "", false, ["Evergreen shrubs with needles that are flat, short, and 2-ranked", "Cones are small, red, fleshy, and berry-like"], 4));
plantList.push(new PlantObject("Northern White Cedar", "Thuja occidentalis", "Cypress", "", false, ["Slender evergreen tree with decay resistant wood", "Leaves are a yellowish green and scale like, alternating in right-angled pairs", "Cones are erect on branchlets and 1/4 to 1/2 inches", "Fibrous bark with reddish brown to gray color", "Found in non-acidic swamps"], 4));
plantList.push(new PlantObject("Eastern Red-Cedar", "Juniperus virginiana", "Cypress", "", false, ["Dense evergreen tree with round branchlets that are covered in green scales that are closely packed", "Small round cones that are 1/4 inch in diameter", "Fleshy, green cones that turn a waxy blue", "Scaly bark that is ash gray to reddish brown"], 4));
plantList.push(new PlantObject("American White Water Lily", "Nymphaea odorata", "Water Lily", "Early summer to fall", false, ["Perennial aquatic plants with white or pinkish flowers that are 2 to 8 inches wide", "Leaves are floating and have long petioles that extend down into the substrate", "Found in still, shallow water"], 4));
plantList.push(new PlantObject("Bullhead Pond Lily", "Nuphar variegata", "Water Lily", "Late spring to early fall", false, ["Perennial aquatic plant with yellow flowers that are above the water with round, heart-shaped leaves that float", "Flowers have 5 or 6 yellow sepals that are large and small, short petals", "Found in ponds and slow streams"], 4));
plantList.push(new PlantObject("Wild-Ginger", "Asarum canadense", "Birthwort", "Early spring", false, ["Perennial herb that grows 2 to 8 inches tall", "Leaves are either heart or kidney shaped at the base", "Grows with 2 hairy leaves and usually found in colonies", "Has a reddish brown flower that has 3 parts"], 4));
/*plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());*/