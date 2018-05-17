function getFrequency(string, cutOff) {
	var cleanString = string.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, ""),
		words = cleanString.split(' '),
		frequencies = {},
		word, frequency, i;
	
	for (i = 0; i < words.length; i++) {
		word = words[i];
		frequencies[word] = frequencies[word] || 0;
		frequencies[word]++;
	}
	
	words = Object.keys(frequencies);
	
	return words.sort(function (a, b) {
		return frequencies[b] - frequencies[a];
	}).slice(0, cutOff).toString();
}

function mostFrequentCount(elements) {
	var bins = {};
	for (var i = 0; i < elements.length; i++) {
		bins[elements[i]] = (bins[elements[i]] || 0) + 1;
	}
	var max = 0;
	for (var c in bins) {
		max = Math.max(max, bins[c]);
	}
	return max;
}

function splitByWords(text) {
	// split string by spaces (including spaces, tabs, and newlines)
	var wordsArray = text.split(/\s+/);
	return wordsArray;
}

function createWordMap(wordsArray) {
	
	// create map for word counts
	var wordsMap = {};
	/*
		wordsMap = {
			'Oh': 2,
			'Feelin': 1,
			...
		}
	*/
	wordsArray.forEach(function (key) {
		if (wordsMap.hasOwnProperty(key)) {
			wordsMap[key]++;
		} else {
			wordsMap[key] = 1;
		}
	});
	
	return wordsMap;
	
}

function sortByCount(wordsMap) {
	
	// sort by count in descending order
	var finalWordsArray = [];
	finalWordsArray = Object.keys(wordsMap).map(function (key) {
		return {
			name: key,
			total: wordsMap[key]
		};
	});
	
	finalWordsArray.sort(function (a, b) {
		return b.total - a.total;
	});
	
	return finalWordsArray;
	
}

function statistics(data) {
	var wordsArray = splitByWords(data);
	var wordsMap = createWordMap(wordsArray);
	var finalWordsArray = sortByCount(wordsMap);
	
	console.log(finalWordsArray);
	console.log('The word "' + finalWordsArray[0].name + '" appears the most in the file ' +
		finalWordsArray[0].total + ' times');
	
}

function similarity(s1, s2) {
	
	var longer = s1;
	var shorter = s2;
	if (s1.length < s2.length) {
		longer = s2;
		shorter = s1;
	}
	var longerLength = longer.length;
	if (longerLength == 0) {
		return 1.0;
	}
	var ret_code = (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
	console.log('-------->', s1, s2, ret_code);
	return ret_code;
}

function editDistance(s1, s2) {
	s1 = s1.toLowerCase();
	s2 = s2.toLowerCase();
	
	var costs = new Array();
	for (var i = 0; i <= s1.length; i++) {
		var lastValue = i;
		for (var j = 0; j <= s2.length; j++) {
			if (i == 0)
				costs[j] = j;
			else {
				if (j > 0) {
					var newValue = costs[j - 1];
					if (s1.charAt(i - 1) != s2.charAt(j - 1))
						newValue = Math.min(Math.min(newValue, lastValue),
							costs[j]) + 1;
					costs[j - 1] = lastValue;
					lastValue = newValue;
				}
			}
		}
		if (i > 0)
			costs[s2.length] = lastValue;
	}
	return costs[s2.length];
}

//console.log(similarity('my wife name','what is the name of my wife'));

function isFunction(functionToCheck) {
	return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
};

function intersect(a, b) {
	var aa = a.split(' ');
	var bb = b.split(' ');
	var r = [...new Set(aa)].filter(x => new Set(bb).has(x));
	var lr = r.length;
	var lb = bb.length;
	console.log('-->', a, ' - ', b, '=', (lr * 100 / lb));
	return (lr * 100 / lb);
}