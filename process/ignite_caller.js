const async = require('async');
const fs = require('fs');
const request = require('request');
const directory = 'ignite/';
/*
async.map(myUrls, function(url, callback) {
  request(url, function(error, response, html) {
    // Some processing is happening here before the callback is invoked
    callback(error, html);
  });
}, function(err, results) {
  ...
});
 */
/**
 * caller
 * @goal call url using get method
 * @param url
 * @return callback array response
 * (c) Nacho Ariza july 2018
 * @private
 */
caller = (url, callback) => {
	var _gtUrl = url;
	console.log('call to:', url);
	
	request(_gtUrl
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
worker = (url, callback) => {
	caller(url.uri, (err, result) => {
		if (!err) {
			// generate json file
			const content = JSON.stringify(result);
			
			fs.writeFile(directory + url.file, content, 'utf8', function (err) {
				if (err) {
					return console.log(err);
				} else {
					console.log("The file " + directory + url.file + " was saved!");
				}
				
			});
		}
		callback(err, result);
	});
}


let urls = [
	{
		uri: "http://10.200.3.18:8080/ignite?cmd=qryfldexe&cacheName=SQL_PUBLIC_TITLES&qry=SELECT+URI%2C+NUMBER+FROM+TITLES&pageSize=350000",
		file: 'title.json'
	},
	{
		uri: "http://10.200.3.18:8080/ignite?cmd=qryfldexe&cacheName=SQL_PUBLIC_NEDB&qry=SELECT+DISTINCT+TYPE+FROM+NEDB&pageSize=350000",
		file: 'nedb.json'
	},
	{
		uri: "http://10.200.3.18:8080/ignite?cmd=qryfldexe&cacheName=SQL_PUBLIC_NEDB_INVERSE&qry=SELECT+NAME+FROM+NEDB_INVERSE+WHERE+TYPE+%3D+%27skill%27&pageSize=350000",
		file: 'skill.json'
	},
	{
		uri: "http://10.200.3.18:8080/ignite?cmd=qryfldexe&cacheName=SQL_PUBLIC_NEDB_INVERSE&qry=SELECT+NAME+FROM+NEDB_INVERSE+WHERE+TYPE+%3D+%27language_level%27&pageSize=350000",
		file: 'language_level'
	},
	{
		uri: "http://10.200.3.18:8080/ignite?cmd=qryfldexe&cacheName=SQL_PUBLIC_NEDB_INVERSE&qry=SELECT+NAME+FROM+NEDB_INVERSE+WHERE+TYPE+%3D+%27unit%27&pageSize=350000",
		file: 'unit.json'
	},
	{
		uri: "http://10.200.3.18:8080/ignite?cmd=qryfldexe&cacheName=SQL_PUBLIC_NEDB_INVERSE&qry=SELECT+NAME+FROM+NEDB_INVERSE+WHERE+TYPE+%3D+%27party%27&pageSize=350000",
		file: 'party.json'
	},
	{
		uri: "http://10.200.3.18:8080/ignite?cmd=qryfldexe&cacheName=SQL_PUBLIC_NEDB_INVERSE&qry=SELECT+NAME+FROM+NEDB_INVERSE+WHERE+TYPE+%3D+%27site%27&pageSize=350000",
		file: 'site.json'
	},
	{
		uri: "http://10.200.3.18:8080/ignite?cmd=qryfldexe&cacheName=SQL_PUBLIC_NEDB_INVERSE&qry=SELECT+NAME+FROM+NEDB_INVERSE+WHERE+TYPE+%3D+%27insurance_branch%27&pageSize=350000",
		file: 'insurance_branch.json'
	},
	{
		uri: "http://10.200.3.18:8080/ignite?cmd=qryfldexe&cacheName=SQL_PUBLIC_NEDB_INVERSE&qry=SELECT+NAME+FROM+NEDB_INVERSE+WHERE+TYPE+%3D+%27sector%27&pageSize=350000",
		file: 'sector.json'
	},
	{
		uri: "http://10.200.3.18:8080/ignite?cmd=qryfldexe&cacheName=SQL_PUBLIC_NEDB_INVERSE&qry=SELECT+NAME+FROM+NEDB_INVERSE+WHERE+TYPE+%3D+%27project%27&pageSize=350000",
		file: 'project.json'
	},
	{
		uri: "http://10.200.3.18:8080/ignite?cmd=qryfldexe&cacheName=SQL_PUBLIC_NEDB_INVERSE&qry=SELECT+NAME+FROM+NEDB_INVERSE+WHERE+TYPE+%3D+%27bigdeals_authority%27&pageSize=350000",
		file: 'bigdeals_authority.json'
	},
	{
		uri: "http://10.200.3.18:8080/ignite?cmd=qryfldexe&cacheName=SQL_PUBLIC_NEDB_INVERSE&qry=SELECT+NAME+FROM+NEDB_INVERSE+WHERE+TYPE+%3D+%27bigdeals_organization%27&pageSize=350000",
		file: 'bigdeals_organization.json'
	},
	{
		uri: "http://10.200.3.18:8080/ignite?cmd=qryfldexe&cacheName=SQL_PUBLIC_NEDB_INVERSE&qry=SELECT+NAME+FROM+NEDB_INVERSE+WHERE+TYPE+%3D+%27insurance_subbranch%27&pageSize=350000",
		file: 'insurance_subbranch.json'
	},
	{
		uri: "http://10.200.3.18:8080/ignite?cmd=qryfldexe&cacheName=SQL_PUBLIC_NEDB_INVERSE&qry=SELECT+NAME+FROM+NEDB_INVERSE+WHERE+TYPE+%3D+%27technical_question%27&pageSize=350000",
		file: 'technical_question.json'
	},
	{
		uri: "http://10.200.3.18:8080/ignite?cmd=qryfldexe&cacheName=SQL_PUBLIC_NEDB_INVERSE&qry=SELECT+NAME+FROM+NEDB_INVERSE+WHERE+TYPE+%3D+%27employee%27&pageSize=350000",
		file: 'employee.json'
	},
	{
		uri: "http://10.200.3.18:8080/ignite?cmd=qryfldexe&cacheName=SQL_PUBLIC_NEDB_INVERSE&qry=SELECT+NAME+FROM+NEDB_INVERSE+WHERE+TYPE+%3D+%27country%27&pageSize=350000",
		file: 'country.json'
	},
]


var process_array = [];
for (var i = 0; i < urls.length; i++) {
	process_array.push(async.apply(worker, urls[i]));
}
// launch for each word, one request to translate
async.parallelLimit(process_array, 100, (err, result) => {
	if (err) {
		console.error(err);
	}
	else {
		console.log(JSON.stringify(result));
		console.log('end of all request!');
	}
});


