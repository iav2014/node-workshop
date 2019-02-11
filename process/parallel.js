const async = require('async');

/**
 * translate
 * @goal translate message using google translate
 * @param msg,(from)source language,(to) target language  & callback
 * @return callback array response
 * (c) Nacho Ariza may 2018
 * @private
 */
translate = (msg, from, to, callback) => {
	var _gtUrl = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=it&tl=';
	var request = require('request');
	request(_gtUrl + to + '&sl=' + from + '&dt=t&q=' + msg
		, (error, response, body) => {
			if (!error && response.statusCode == 200) {
				var _arrayResponse = JSON.parse(body);
				try {
					var _arrayResponse = JSON.parse(body);
				} catch (err) {
					_arrayResponse = err;
					console.log(err);
				}
				callback(null, _arrayResponse);
			} else {
				callback(response.statusCode);
			}
		})
}
/**
 * worker
 * @goal this is the unit work,
 * @param word to translate
 * @return callback array response with translate results
 * (c) Nacho Ariza may 2018
 * @private
 */
worker = (word, callback) => {
	translate(word, 'en', 'es', (err, result) => {
		callback(err, result);
	});
}

// this is the map of words ... and build the array of process
let words = ['hello', 'world', 'computer', 'house', 'today', 'tomorrow'];
var process_array = [];
for (var i = 0; i < words.length; i++) {
	process_array.push(async.apply(worker, words[i]));
}
// launch for each word, one request to translate
async.parallelLimit(process_array, 10, (err, result) => {
	if (err) {
		console.error(err);
	}
	else {
		console.log(JSON.stringify(result));
		console.log('end of all request!');
	}
});


