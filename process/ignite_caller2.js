const async = require('async');
const fs = require('fs');
const request = require('request');
const directory = 'ignite/';
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
];


let startTime = Date.now();
async.map(urls, function (url, callback) {
	console.log(url);
	let tookTime = Date.now();
	request(url.uri, function (error, response, body) {
		console.log('DONE! - ', url);
		let _file = directory + '_x_' + url.file;
		fs.writeFile(_file, body, 'utf8', function (err) {
			if (err) {
				return console.log(err);
			} else {
				console.log("The file " + _file + " was saved! it took " + ((Date.now() - tookTime) / 1000) + ' seg.');
			}
		});
		callback(error, body);
	});
}, function (err, result) {
	if (err) console.error(err);
	else {
		console.log('duration:' + (Date.now() - startTime) / 1000);
	}
});
