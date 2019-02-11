const co = require('co');
const skills = require('./skills.js');
const stringSimilarity = require('string-similarity');
let match=[];

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
				var result = stringSimilarity.findBestMatch('what time is it and day?', pointer.intent().keywords);
				//console.log(result.ratings.length);
				//console.log(result.ratings.bestMatch);
				
				for (var j = 0; j < result.ratings.length; j++) {
					if (result.ratings[j].rating > winner) {
						winner = result.ratings[j].rating;
						goal = Object.assign(pointer);
						match.push({goal:goal,winner:winner});
					}
				}
			}
			
		} else {
			console.log(' [is not function]');
		}
		
	}
	console.log('** winner **');
	console.log(goal.intent().module, winner);
	console.log('** approach **');
	for(let i=0;i<match.length;i++){
		console.log(match[i].goal.intent().module, match[i].winner);
	}
	//console.log(intersect('search information', 'search information table'));
	//console.log( skills.getSkills()[0]);
}).catch(err => {
	console.log(err);
	throw err;
});

