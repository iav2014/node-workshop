var stringSimilarity = require('string-similarity');

var similarity = stringSimilarity.compareTwoStrings('healed baby', 'sealed boby');
console.log(similarity);

var matches = stringSimilarity.findBestMatch('healed', ['edward', 'sealed', 'theatre']);
console.log(matches);

console.log(stringSimilarity.findBestMatch('Olive-green table for sale, in extremely good condition.', [
	'For sale: green Subaru Impreza, 210,000 miles',
	'For sale: table in very good condition, olive green in colour.',
	'Wanted: mountain bike with at least 21 gears.'
]));