// Created by Batman

// All plant objects

var plantList = [];

function PlantObject(name, lname, regions, invasive, traits, numImages)
{
	this.name = name;
	this.lname = lname;
	this.regions = regions;
	this.invasive = invasive;
	this.sprite = [];
	this.traits = traits;
	this.harvested = false;
	
	for (var i = 0; i < numImages; i++)
	{
		var tempImg = new Image();
		tempImg.src = "../img/Plants/" + this.name + "/" + i + ".jpg";
		this.sprite.push(tempImg);
	}
	
	for (var i = 0; i < regions.length; i++)
	{
		switch (regions[i])
		{
			case Level.Prairie:
				plant.prairie += 1;
				break;
			case Level.Forest:
				plant.forest += 1;
				break;
			case Level.Marsh:
				plant.marsh += 1;
				break;
			case Level.Hilly:
				plant.hilly += 1;
				break;
		}
	}
}

var plant = {
	totalPlantImagesLoaded: 0,
	curPlantImagesLoaded: 0,
	totalHarvestAmount: 0,
	prairie: 0,
	forest: 0,
	marsh: 0,
	hilly: 0,
	
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
	},
	
	getTotalHarvestedAmount: function()
	{
		var plantCount = 0;
			
		for (var i = 0; i < plantList.length; i++)
		{
			if (plantList[i].harvested)
				plantCount++;
		}
		
		return plantCount;
	}
}

// Creates a list of all possible plants
plantList.push(new PlantObject("Garlic Mustard", "Alliaria petiolata", [Level.Forest],true, ["Biannual forms a rosette", "Can be 12 to 40 inches tall in second year", "White flowers with four petals", "Has a capsule fruit that can be 1 to 2 inches long", "Strong garlic odor when crushed"], 5));
plantList.push(new PlantObject("Leafy Spurge", "Euphorbia esula", [Level.Prairie], true, ["Grows anywhere between 6 and 36 inches", "Shoots have alternate leaves at top of stem", "Milky white sap on inside of plants", "Sap can cause allergic reaction"], 4));
plantList.push(new PlantObject("Spotted Knapweed", "Centaurea beibersteinii", [Level.Prairie], true, ["Biannual or perennial", "Can be 1 to 4 feet during second year", "Pinkish-purple flowers", "Linear leaves that are pinnately lobed"], 4));
plantList.push(new PlantObject("Purple Loosestrife", "Lythrum salcaria", [Level.Marsh, Level.Prairie], true, ["Flowers are in spikes", "Has 5 petals that are pink-purple in color", "Leaves are opposite or whorls of 3 and have long, smooth edges", "Can grow to 6 feet tall", "Can be partially woody"], 5));
plantList.push(new PlantObject("Reed Canary Grass", "Phalaris arundinaceae", [Level.Marsh, Level.Prairie], true, ["Can grow 2 to 6 feet tall", "Stems are hairless", "Leaves can be 3 to 10 inches long", "Leaves have a rough texture", "Flowers are in dense clusters", "Can have green to purple flower", "Has a tan seed"], 5));
plantList.push(new PlantObject("Phragmites", "Phragmites autralis", [Level.Marsh], true, ["Can grow 3 to 20 feet tall", "Has hollow stems", "Has smooth leaves", "Leaves are 6 to 24 inches long", "Flowers are in spikelets", "Flowers are light brown to purple"], 4));
plantList.push(new PlantObject("Buckthorn", "Rhamnus cathartica or Frangula alnus", [Level.Forest, Level.Hilly, Level.Prairie, Level.Marsh], true, ["Shrubby plant", "Can grow 20 to 25 feet tall", "Grey to brown bark", "Has lenticels", "Has inconspicuous flowers and red berries in summer and fall"], 4));
plantList.push(new PlantObject("Honeysuckle", "Lonicera", [Level.Forest], true, ["Is a shrub", "Can grow to 15 feet tall", "Has papery bark", "Has tubular flowers", "Has red fruit"], 4));
plantList.push(new PlantObject("Water-Milfoil", "Myriophyllum", [Level.Marsh], false, ["Perennial submersed aquatic", "Leaves are whorled and pinnately compound with thread-like leaflets", "Can grow up to 15 feet deep in water"], 4));
plantList.push(new PlantObject("Common Liverwort", "Marchantia polymorpha", [Level.Marsh], false, ["Has no stems or leaves", "Has flattened, branching thallus held in ground by rhizoids", "Grows mostly in shady regions"], 4));
plantList.push(new PlantObject("Peat Moss", "Sphagnum", [Level.Marsh, Level.Forest], false, ["Grows in wetlands and forms deep colonies or floating mats", "Usually grows upright and close to its neighboring plant", "Branches are arranged spirally at top or in clusters", "When mature it has sporophyte capsules that are brown to black"], 4));
plantList.push(new PlantObject("Hair-Cap Moss", "Polytrichum", [Level.Marsh, Level.Hilly], false, ["Stem can be up to 12 inches tall", "Spirally arranged leaves that are pointed", "Usually grows in dense groups"], 4));
plantList.push(new PlantObject("Club Moss", "Lycopodium", [Level.Forest], false, ["Small evergreen perennial that is erect, trialing, or creeping", "Leaves are close together and are narrow and simple", "Sexual reproduction is by a single spore, but some also propagate by growing when older plants die off", "Mostly found in woodland or forest understory"], 4));
plantList.push(new PlantObject("Spike Moss", "Selaginella", [Level.Forest], false, ["Grows mostly lower or close to the ground", "Pale green in color and smaller leaves than club moss", "Has both male and female gametophytes produced by two types of spores"], 4));
plantList.push(new PlantObject("Horsetail", "Equisetum", [Level.Marsh, Level.Forest, Level.Prairie], false, ["Small or medium plants", "Can grow rigid, hollow, jointed, fluted, branched, or unbranched", "Leaves are triangular and non-photosynthetic", "Plant spreads through underground rhizomes, but also has a strobilus"], 4));
plantList.push(new PlantObject("Royal Fern", "Osmunda regalis", [Level.Marsh, Level.Forest], false, ["Fronds are bipinnately compound with oblong pinnules that are large and widely spaced", "Fronds can grow over 3 feet tall", "Has fertile fronds that are specialized in spore production", "Turn brown in early summer", "Found in wet forests and bogs"], 4));
plantList.push(new PlantObject("Cinnamon Fern", "Osmunda cinnamomea", [Level.Prairie, Level.Forest, Level.Marsh, Level.Hilly], false, ["Sterile fronds are up to 4 feet tall and are pinnately lobed", "Sterile fronds grow in circles around the fertile fronds that develop in last spring", "Fronds are a cinnamon color when mature and are shorter and narrower than sterile fronds"], 4));
plantList.push(new PlantObject("Interrupted Fern", "Osmunda claytoniana", [Level.Forest], false, ["Fronds are large and pinnately compound with pinnae that are shorter near the tip and base", "Fronds are dark brown in color", "Grow on drier sites"], 4));
plantList.push(new PlantObject("Bracken Fern", "Pteridium aquilinum", [Level.Forest], false, ["Leaves are large and triangular in outline", "Leaves are divided into pinnae and pinnules", "Often found in poor soil in open woods or woodland openings"], 4));
plantList.push(new PlantObject("Sensitive Fern", "Onoclea sensibilis", [Level.Marsh, Level.Forest], false, ["Sterile fronds are large and triangular in shape", "Fronds are lobed at the tips and usually divided into pinnules closer to the base", "Fertile fronds are separate and have sporangia enclosed in pinnae that are bead-like"], 4));
plantList.push(new PlantObject("Common Polypody", "Polypodium virginianum", [Level.Forest], false, ["Small fern only growing to about 1 foot tall", "Fronds are firm evergreen and pinnately lobed", "Sori are red-brown and located on the underside of fronds", "Mostly grows in damp, shady places on rocks or logs"], 4));
plantList.push(new PlantObject("Maidenhair Fern", "Adiantum pedatum", [Level.Hilly], false, ["About 2 feet tall with fronds that are finely divided and flat with distinct asymmetrical pinnules", "Wiry and shiny black leafstalks", "Sori located on the underside of the pinnae", "Usually found in understories of rich woods"], 4));
plantList.push(new PlantObject("Balsam Fir", "Abies balsamea", [Level.Marsh], false, ["Grows to about 40 to 60 feet with needles that are flat", "Needles are about 3/4 to 1 1/2 inches long", "Needles are blunt or notched at the tip and have 2 silvery bands of stomata on the underside", "Cones are 2 to 4 inches long and are purplish, cylindrical, and pointed upwards", "Bark has 'blisters' when young and is a gray reddish-brown when mature"], 4));
plantList.push(new PlantObject("White Spruce", "Picea glauca", [Level.Forest], false, ["Grows to about 60 feet", "Has needles that are rigid, prickly, 4-sided, and about 3/4 inches long", "Cones are about 1-2 inches and have thick, smooth, flexible scales", "Bark is ashy brown on outer part and silvery on the inside"], 4));
plantList.push(new PlantObject("Black Spruce", "Picea mariana", [Level.Marsh], false, ["Grows to about 30 feet", "Needles are rigid, dark green, 4-sided in cross section, and about 1/4 to 1/2 inches long", "Cones are about 1/2 to 1 inch long and have brittle, rough scales", "Bark is reddish brown on the outer part and olive green on the inside", "Found in bogs"], 4));
plantList.push(new PlantObject("Hemlock", "Tsuga canadensis", [Level.Hilly], false, ["Grows to about 60 to 75 feet", "Needles are minutely stalked, 2-ranked, about 1/4 to 3/4 inches long, and have 2 white bands of stomata on the underside", "Cones are attached by a small stalk and they are about 1/2 to 3/4 inches long", "Bark is a purplish brown, scaly, and deeply furrowed when mature", "Found in cool, moist sites"], 4));
plantList.push(new PlantObject("Tamarack", "Larix laricina", [Level.Marsh], false, ["Deciduous conifer that is slow growing and can get up to 40 to 80 feet", "Needles are short, and clustered in bunches of 12 or more", "Needles turn golden yellow in the fall", "Cones are about 1/2 to 1 inch long", "Bark is dark and flaky", "Found in acid bogs"], 4));
plantList.push(new PlantObject("Eastern White Pine", "Pinus strobus", [Level.Forest], false, ["Grows up to 100 feet tall", "Needles grow in bundles of 5", "Needles are 3 to 5 inches long and are soft", "Stomata in fine white line on 2 spots of every needle", "Cones are curved and about 4 to 8 inches long with spineless scales", "Bark is gray, smooth when young and matures into broken rectangular blocks"], 4));
plantList.push(new PlantObject("Red Pine", "Pinus resinosa", [Level.Forest], false, ["Grows 50 to 100 feet tall", "Needles are 2 to 4 inchesl long and are in bundles of 2", "Bark is scaly and twigs are yellowish and turn a reddish-brown", "Cones are 1 to 2 1/2 inches long"], 4));
plantList.push(new PlantObject("Jack Pine", "Pinus banksiana", [Level.Forest], false, ["Grows 70 to 80 feet tall", "Needles are 1 to 1 1/2 inches in bunches of 2 and are stiff and dark green", "Bark is dark gray to reddish brown and scaly", "Cones are 1 to 2 inches long and usually curved toward the tip of the branch"], 4));
plantList.push(new PlantObject("Yew", "Taxus ssp.", [Level.Hilly, Level.Forest], false, ["Evergreen shrubs with needles that are flat, short, and 2-ranked", "Cones are small, red, fleshy, and berry-like"], 4));
plantList.push(new PlantObject("Northern White Cedar", "Thuja occidentalis", [Level.Hilly], false, ["Slender evergreen tree with decay resistant wood", "Leaves are a yellowish green and scale like, alternating in right-angled pairs", "Cones are erect on branchlets and 1/4 to 1/2 inches", "Fibrous bark with reddish brown to gray color", "Found in non-acidic swamps"], 4));
plantList.push(new PlantObject("Eastern Red-Cedar", "Juniperus virginiana", [Level.Prairie], false, ["Dense evergreen tree with round branchlets that are covered in green scales that are closely packed", "Small round cones that are 1/4 inch in diameter", "Fleshy, green cones that turn a waxy blue", "Scaly bark that is ash gray to reddish brown"], 4));
plantList.push(new PlantObject("American White Water Lily", "Nymphaea odorata", [Level.Marsh], false, ["Perennial aquatic plants with white or pinkish flowers that are 2 to 8 inches wide", "Leaves are floating and have long petioles that extend down into the substrate", "Found in still, shallow water"], 4));
plantList.push(new PlantObject("Bullhead Pond Lily", "Nuphar variegata", [Level.Marsh], false, ["Perennial aquatic plant with yellow flowers that are above the water with round, heart-shaped leaves that float", "Flowers have 5 or 6 yellow sepals that are large and small, short petals", "Found in ponds and slow streams"], 4));
plantList.push(new PlantObject("Wild-Ginger", "Asarum canadense", [Level.Forest, Level.Hilly], false, ["Perennial herb that grows 2 to 8 inches tall", "Leaves are either heart or kidney shaped at the base", "Grows with 2 hairy leaves and usually found in colonies", "Has a reddish brown flower that has 3 parts"], 4));
plantList.push(new PlantObject("Jack-in-the-Pulpit", "Arisaema triphyllum", [Level.Forest], false, ["Perennial herb that is 1 to 3 feet tall", "Has a distinctive single inflorescence and usually has 2 compound leaves of 3 leaflets over it", "Small yellow flowers on a spadix that is usually hidden in the green and reddish striped spathe"], 4));
plantList.push(new PlantObject("Skunk-Cabbage", "Symplocarpus foetidus", [Level.Forest, Level.Marsh], false, ["Perennial herb that grows in wet, shady areas and swamps", "Produces a skunk-like odor when crushed", "Flowers are small and green and about 3 to 6 inches long", "Inflorescence is purple to green and at ground level is surrounded by a purple-brown and green"], 4));
plantList.push(new PlantObject("Duckweed", "Spirodella polyrrhiza", [Level.Marsh], false, ["Very small, perennial, floating plant with no leaves", "Consists of a globular or flattened thallus that sometimes has roots and sometimes does not", "Very rarely produces tiny white flowers", "Most reproduction is from vegetative buds", "Usually in nutrient rich lakes and ponds"], 4));
plantList.push(new PlantObject("Common Arrowhead", "Sagittaria latifolia", [Level.Forest, Level.Marsh], false, ["Aquatic perennial herb with arrow-shaped emergent leaves that are variable", "Flowers are about 1 inch wide, have 3 petals and usually grow in whorls of 3 from an underbranched stalk", "Staminate flowers usually grow on the upper portion of the stalk and pistillate flowers below"], 4));
plantList.push(new PlantObject("Pondweed", "Potamogeton spp.", [Level.Marsh], false, ["Perennial aquatic plants found in many bodies of water", "Leaves are alternate entire, and some have wavy or curly edges", "Some leaves float on surface of water while others are submerged", "Flowers are held above the water or in small clusters in the axils of submerged leaves", "Flowers are small and inconspicuous and are in short spikes"], 4));
plantList.push(new PlantObject("Trout Lily", "Erythronium americanum", [Level.Forest], false, ["Perennial herb that is small and has solitary, nodding, 6 parted flowers that are 1 1/2 inches long", "Flowers are either yellow or white", "Leaves are 4 to 8 inches long, mottled or spotted, relatively narrow, growing close to the ground", "Found in moist woods"], 4));
plantList.push(new PlantObject("Trillium", "Trillium spp.", [Level.Forest, Level.Marsh], false, ["Small perennial herbs with leaves in a whorl of 3", "Flowers are white or red and are large, solitary, and have 3 parts", "Usually found in woods, can be found in uplands or swamps depending on species"], 4));
plantList.push(new PlantObject("Bellwort", "Uvularia grandiflora or Uvularia Sessilifolia", [Level.Forest, Level.Hilly], false, ["Perennial herb that has erect, forking stems", "Alternate leaves that are mostly above the fork", "Flowers are 6 parted, elongated, and nodding", "U. grandiflora have yellow flowers that are 1 to 2 inches long and are spirally twisted", "U. sessilifolia have cream to pale yellow flowers that are small"], 4));
plantList.push(new PlantObject("Lady's Slipper", "Cypripedium spp.", [Level.Marsh, Level.Prairie, Level.Forest], false, ["Perennial herb that usually has a solitary flower that forms a hollow pouch due to a prominent 'lip'", "Flowers are either yellow, pink, red, or white"], 4));
plantList.push(new PlantObject("Blue-Flag", "Iris spp.", [Level.Marsh], false, ["Perennial herb that is aquatic to semi-aquatic", "Flowers are 2 to 4 inches wide, showy, blue or violet, and have yellow markings", "Leaves are long and narrow, flattened, sheathing the stem", "Grows in wet ground and shallow water"], 4));
plantList.push(new PlantObject("Daylily", "Hemerocallis fulva", [Level.Prairie, Level.Forest, Level.Marsh], false, ["Perennial herb that has rosette of leaves and flower stalks that are 2 to 4 feet tall", "Leaves are basal, linear, floppy, and taper to a point", "From the center of a rosette flower stalks arise and grow taller than the leaves", "The flowers are orange with 6 parts and are 4 inches wide"], 4));
plantList.push(new PlantObject("Cat-Tail", "Typha spp.", [Level.Marsh], false, ["Perennial herbs that are around 9 feet tall and grass-like leaves", "Flowers are staminate and are in loose deciduous spikes above the characteristic and dense brown cylinder of pistillate flowers and fruits", "Emergent from shallow waters in marshes and ditches"], 4));
plantList.push(new PlantObject("Field Nut Sedge", "Cyperus esculentus", [Level.Marsh], false, ["Grassy perennial that grows 6 to 24 inches tall", "Unbranched with 3 angled main stem mostly covered by leaf sheaths", "Leaves are mostly light green", "Has an umbel on the top that is yellow or golden brown and has floral spikes on leafy bracts", "Found in moist open sites"], 4));
plantList.push(new PlantObject("Kentucky Bluegrass", "Poa pratensis", [Level.Prairie, Level.Hilly], true, ["Perennial lawn and pasture grass", "Stem growing 12 to 18 inches tall and is hairless", "Leaves are long, dark green, narrow, and folded when young", "Inflorescence is oblong to pyramidal"], 4));
plantList.push(new PlantObject("Quackgrass", "Elymus repens", [Level.Marsh, Level.Prairie], true, ["Perennial grass with stems that are 1 1/2 to 3 feet tall with erect green or purplish spikes", "Spreads through rhizomes", "Some spikelets are flowered and well separated"], 4));
plantList.push(new PlantObject("Wheat", "Triticum aestivum", [Level.Prairie], false, ["Annual grass with flat blades and thick spikes", "Grows about 1 1/2 to 4 feet tall", "Spikelets placed flatwise at each joint of a continuous or jointed floral stalk with 2 to 5 flowers and is usually solitary"], 4));
plantList.push(new PlantObject("Foxtail", "Setaria spp.", [Level.Prairie], false, ["Annual grass that grows 1 to 3 feet with panicles that are narrow, dense, and spike-like", "Some bristles are below the spikelets"], 4));
plantList.push(new PlantObject("Corn", "Zea mays", [Level.Prairie], false, ["Annual plant that is tall and has broad leaf blades with overlapping sheaths", "Spikelets that are staminate occur in long, spike-like branches, which are in large spreading terminal panicles", "Spikelets that are pisitillate are in rows on a thickened axis, which are in leave axils and enclosed in bracts"], 4));
/*plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
/*plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
/*plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
/*plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
/*plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
/*plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
/*plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
/*plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
plantList.push(new PlantObject());
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
plantList.push(new PlantObject());*/

/*
console.debug("Num Plants: ", plantList.length);
console.debug("   Prairie: ", plant.prairie);
console.debug("    Forest: ", plant.forest);
console.debug("     Marsh: ", plant.marsh);
console.debug("     Hilly: ", plant.hilly);
*/