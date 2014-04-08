// A script to determine the quests the player
// has and if they have any
// Created on 4/8/2014 by Iron Man

var quests = {
	plantsToIdentify: [],
	regionsToVisit: [],
	
	hasQuest: function()
	{
		return (this.plantsToIdentify.length > 0);
	},
	
	addQuest: function(plant, region)
	{
		this.plantsToIdentify.push(plant);
		this.regionsToVisit.push(region);
	},
	
	removeQuest:function(plant, region)
	{
		var plantIndex = this.plantsToIdentify.indexOf(plant);
		if (plantIndex > -1)
		{
			this.plantsToIdentify = this.plantsToIdentify.splice(plantIndex, 1);
			this.regionsToVisit = this.regionsToVisit.splice(plantIndex, 1);
		}
	},
	
	plantsInARegion: function(region)
	{
		var plants = [];
		for (var i = 0; i < this.plantsInARegion.length; i++)
		{
			if (regionsToVisit[i] == region)
			{
				plants.push(plantsToIdentify[i]);
			}
		}
		return plants;
	}
};