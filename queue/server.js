/**
 * Created by ariza on 12/5/17.
 */
var argv = require('optimist')
	.usage('Usage: $0 --ip [public a.b.c.d] --port [port]')
	.demand(['ip', 'port'])
	.argv;
var amqp = require('amqplib/callback_api');
var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cluster = require('cluster');
var os = require('os'),
	cpuCount = os.cpus().length;

var server_port = argv.port;
var server_ip_address = argv.ip;

if (cluster.isMaster) {
	var corr_id = []; // general array shared from all workers
	console.log('isMaster');
	for (var i = 0; i < cpuCount; i++) {
		cluster.fork();
	}
	cluster.on('message', (worker, msg, handle) => {
		if (msg.topic && msg.topic === 'ADD') {
			// here we increment the array of id
			corr_id.push(msg.id);
		}
		if (msg.topic && msg.topic === 'FIND') {
			// here we increment the counter
			var pos = corr_id.indexOf(msg.id);
			if (pos >= 0) {
				console.log('Confirmed');
				corr_id.splice(pos, 1); // deleted id from array
			}
		}
	});
	
} else {
	// start rabbitmq client process
	var channel = null;
	var queue = null;
	// amqp queue link...
	amqp.connect('amqp://localhost', function (err, conn) {
		conn.createChannel(function (err, ch) {
			ch.assertQueue('task_queue', {durable: true}, function (err, q) {
				console.log(' [x] Requesting process(%d)', process.pid);
				ch.consume(q.queue, function (msg) {
					console.log('GOT confirm ', process.pid, msg.properties.correlationId);
					process.send({topic: 'FIND', id: msg.properties.correlationId});
				}, {noAck: true});
				channel = ch;
				queue = q;
			});
		});
	});
	
	// put routes ...
	app.use(bodyParser.json());       // to support JSON-encoded bodies
	app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
		extended: true
	}));
	
	app.post('/rest', function (req, res, next) {
		taskPost(req, res, function (err, result) {
			console.log(err || '[no error]', result);
			if (err) res.send(404);
			else {
				console.log('result', result);
				res.send(result);
			}
			
		});
		
	});
	app.use(function (req, res) {
		res.status(404);
		res.send("route not exist");
	});
	// start the http server ...
	var server = app.listen(server_port, server_ip_address, function () {
		var host = server.address().address;
		var port = server.address().port;
		console.log('[%d]- rest server listening at http://%s:%d', process.pid, host, port);
	});
	
	// aux functions ...
	function generateUuid() {
		return Math.random().toString() +
			Math.random().toString() +
			Math.random().toString();
	}
	
	function taskPost(req, res, callback) {
		var json = {};
		req.query = req.body;
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		console.log('[%s] - (post/rest)', ip);
		json.uid = 1;
		json.event = req.query.event;
		var corr = generateUuid();
		process.send({topic: 'ADD', id: corr});
		console.log(process.pid, json);
		console.log(process.pid, corr);
		channel.sendToQueue('queue3',
			new Buffer(JSON.stringify(json).toString()),
			{correlationId: corr, replyTo: queue.queue});
		callback(null, 'put object in queue!');
	}
	
}



