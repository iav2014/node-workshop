const co = require('co');
const skills = require('./skills.js');
const stringSimilarity = require('string-similarity');


co(function* () {
	console.log('co function');
	yield skills.loadSkills();
	var percent = 0, winner = 0;
	var goal = {};
	for (var i = 0; i < skills.getSkills().length; i++) {
		var pointer = skills.getSkills()[i];
		//console.log(pointer.examples());
		
		if (typeof pointer.intent === 'function') {
			
			//for (var j = 0; j < pointer.intent().keywords.length; j++) {
			console.log('keywords', pointer.intent().keywords);
			if (pointer.intent().keywords.length > 0) {
				var result = stringSimilarity.findBestMatch('give me time', pointer.intent().keywords);
				//console.log(result.ratings.length);
				//console.log(result.ratings.bestMatch);
				
				for (var j = 0; j < result.ratings.length; j++) {
					if (result.ratings[j].rating > winner) {
						winner = result.ratings[j].rating;
						goal = Object.assign(pointer);
					}
				}
			}
			
		} else {
			console.log(' [is not function]');
		}
		
	}
	console.log('*************');
	console.log(goal.intent().module, winner);
	//console.log(intersect('search information', 'search information table'));
	//console.log( skills.getSkills()[0]);
}).catch(err => {
	console.log(err);
	throw err;
});

