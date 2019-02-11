const natural = require('natural');
const classifier = new natural.BayesClassifier();

// semantic parser (best approach) & dependencyParser (worst approach)
let dependencyParser=(conversation) =>{
	console.log(conversation);
	let _intents=[];
	let concepts=conversation.split('and');
	for(let i=0;i<concepts.length;i++){
		//console.log(classifier.classify(concepts[i]));
		_intents.push(classifier.classify(concepts[i]));
	}
	return _intents;
};

classifier.addDocument('i am long qqqq', 'buy');
classifier.addDocument('buy the q\'s', 'buy');
classifier.addDocument('get q\'s', 'buy');
classifier.addDocument('get car', 'buy');
classifier.addDocument('get fruit', 'buy');
classifier.addDocument('short gold', 'sell');
classifier.addDocument('sell gold', 'sell');
classifier.addDocument('sell q\'s', 'sell');
classifier.addDocument('play the q\'s', 'play');
classifier.addDocument('drive the qqqq', 'drive');
classifier.addDocument('what day is it', 'day');
classifier.addDocument('today is', 'day');
classifier.addDocument('what hour is it', 'time');
classifier.addDocument('what time is it', 'time');

classifier.addDocument('tell invoice of q\'s', 'invoice');
classifier.addDocument('total amount of invoice of q\'s', 'invoice');

classifier.addDocument('buy tv program', 'buy');
classifier.addDocument('buy sport tv program', 'buy');
classifier.addDocument('buy qqqq game', 'buy');
classifier.addDocument('buy qqqq program', 'buy');

classifier.train();

//console.log(classifier.classify('i am short silver'));
//console.log(classifier.classify('i am long copper'));
console.log(classifier.classify('get the car'));
console.log(classifier.classify('get the fruit'));
console.log(classifier.classify('play any instruments'));
console.log(classifier.classify('play guitar'));
console.log(classifier.classify('get red car'));
console.log(classifier.classify('get a white horse'));



console.log(classifier.getClassifications('get a black box'));

console.log('intents:',dependencyParser('get a car and play piano'));
console.log('intents:',dependencyParser('whats today and time'));

console.log('intents:',dependencyParser('tell me april invoce and buy real madrid game'));
console.log('intents:',dependencyParser('tell me april invoce and buy real madrid game'));

console.log('intents:',dependencyParser('sell my shares and tell me the amount of my invoice for the month of April'));
//classifier.addDocument(['sell', 'gold'], 'sell');