// A script to determine the quests the player
// has and if they have any
// Created on 4/8/2014 by Iron Man

var quests = {
	plantsToIdentify: [],
	regionsToVisit: [],
	finishedQuests: [],
	questLimit: 5,
	
	hasQuest: function()
	{
		return (this.plantsToIdentify.length > 0);
	},
	
	addQuest: function(plant, region)
	{
		quests.plantsToIdentify.push(plant);
		quests.regionsToVisit.push(region);
	},
	
	addQuestFromSibling: function(plantInfo)
	{
		mainCamp.listOfQuests.splice(mainCamp.listOfQuests.indexOf(plantInfo[0]), 1);
	
		quests.addQuest(plantInfo[0], plantInfo[1]);
	},
	
	removeQuest:function(plantIndex)
	{
		this.finishedQuests.push(this.plantsToIdentify[plantIndex]);
		this.plantsToIdentify.splice(plantIndex, 1);
		this.regionsToVisit.splice(plantIndex, 1);
	},
	
	plantsInARegion: function(region)
	{
		var plants = [];
		for (var i = 0; i < this.plantsToIdentify.length; i++)
		{
			if (this.regionsToVisit[i] == region)
			{
				indices = [];
				indices.push(this.plantsToIdentify[i]);
				indices.push(i);
				plants.push(indices);
			}
		}
		return plants;
	}
};

var regions = [ "Brandon's Bib", "Ben's Castle", "Praire", "Forest", "Marsh", "Hilly"];