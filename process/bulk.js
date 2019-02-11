const async = require('async');
let mongo = require('mongodb');
let database = {};
let bulkLimit = 10000;
let target = {
	// @ format mongodb://<dbUser>:<dbPassword>@<host1>:<port1>,<host2>:<port2>/<dbName>?replicaSet=<replicaSetName>
	uri: 'mongodb://localhost:27017,localhost:27018,localhost:27019/text?replicaSet=rs0',
	options: {
		keepAlive: 1,
		connectTimeoutMS: 30000,
		socketTimeoutMS: 0,
		autoReconnect: true,
		useNewUrlParser: true
	}
};
/**
 * mongodb functions
 * @goal connect
 * @param url
 * @return callback array response
 * (c) Nacho Ariza july 2018
 * @private
 */
let mongodbConnect = (data, callback) => {
	mongo.connect(data.uri, data.options, (err, db) => {
		if (err) {
			console.error(err);
			callback(err);
		}
		else {
			console.log('mongodb connected to:' + JSON.stringify(data));
			callback(null, db.db('test')); // using test database
		}
	});
};


/**
 * caller
 * @goal call url using get method
 * @param url
 * @return callback array response
 * (c) Nacho Ariza july 2018
 * @private
 */
caller = (data, callback) => {
	console.log('insert for _id:', data);
	database.collection('bulking', (err, coll) => {
		coll.insertOne(data, (err, result) => {
			if (err) {
				
				callback(null, err.errmsg);
			} else {
				callback(null, data);
			}
			
		});
	});
}
/**
 * worker
 * @goal this is the unit work,
 * @param word to translate
 * @return callback array response with translate results
 * (c) Nacho Ariza may 2018
 * @private
 */
worker = (data, callback) => {
	caller(data, (err, result) => {
		callback(err, result);
	});
}


let start = (db) => {
	database = db;
	// prepare bulk data...
	let bulk = [];
	for (let i = 0; i < bulkLimit; i++) {
		bulk[i] = {_id: i + 11, dni: 9999 + i};
	}
	// prepare process array...
	var process_array = [];
	for (var i = 0; i < bulkLimit; i++) {
		process_array.push(async.apply(worker, bulk[i]));
	}
	
	let startTime = Date.now();
	
	async.parallelLimit(process_array, 20000, (err, result) => {
		if (err) {
			console.log(err, result);
		}
		else {
			console.log(JSON.stringify(result));
			console.log('end of all inserts!');
			console.log('time:'+(Date.now() - startTime) / 1000);
		}
	});
	
	
};
mongodbConnect(target, (err, db) => {
	if (!err) {
		console.log('connected');
		start(db);
	}
	else {
		console.error(err);
	}
});


