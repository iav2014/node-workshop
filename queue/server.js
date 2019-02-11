/**
 * Created by ariza on 03/08/18.
 */
const argv = require('optimist')
	.usage('Usage: $0 --ip [public a.b.c.d] --port [port]')
	.demand(['ip', 'port'])
	.argv;
const amqp = require('amqplib/callback_api');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cluster = require('cluster');
const os = require('os'),
	cpuCount = os.cpus().length;
const server_port = argv.port;
const server_ip_address = argv.ip;

if (cluster.isMaster) {
	let corr_id = []; // general array shared from all workers
	console.log('isMaster');
	for (let i = 0; i < cpuCount; i++) {
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
	let channel = null;
	let queue = null;
	// amqp queue link...
	amqp.connect('amqp://localhost', (err, conn) => {
		conn.createChannel((err, ch) => {
			ch.assertQueue('task_queue', {durable: true}, (err, q) => {
				console.log(' [x] Requesting process(%d)', process.pid);
				ch.consume(q.queue, (msg) => {
					console.log('GOT confirm ', process.pid, msg.properties.correlationId);
					console.log('GOT processed:', process.pid, msg.content.toString());
					process.send({topic: 'FIND', id: msg.properties.correlationId});
				}, {noAck: true});
				channel = ch;
				queue = q;
			});
		});
	});
	// aux functions  ...
	let generateUuid = () => {
		return Math.random().toString() +
			Math.random().toString() +
			Math.random().toString();
	}
	let taskPost = (req, res, callback) => {
		let json = {};
		req.query = req.body;
		let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		console.log('[%s] - (post/rest)', ip);
		json.uid = 1;
		json.event = req.query;
		let corr = generateUuid();
		process.send({topic: 'ADD', id: corr});
		console.log(process.pid, json);
		console.log(process.pid, corr);
		channel.sendToQueue('queue3',
			new Buffer(JSON.stringify(json).toString()),
			{correlationId: corr, replyTo: queue.queue});
		callback(null, 'put object in queue!');
	};
	// end aux functions
	// put routes ...
	app.use(bodyParser.json());        // to support JSON-encoded bodies
	app.use(bodyParser.urlencoded({    // to support URL-encoded bodies
		extended: true
	}));
	app.post('/rest', (req, res, next) => {
		taskPost(req, res, (err, result) => {
			console.log(err || '[no error]', result);
			if (err) res.send(404);
			else {
				console.log('result', result);
				res.send(result);
			}
		});
	});
	// end routes
	app.use((req, res) => {
		res.status(404);
		res.send("route not exist");
	});
	// start the http server ...
	var server = app.listen(server_port, server_ip_address, () => {
		var host = server.address().address;
		var port = server.address().port;
		console.log('[%d]- rest server listening at http://%s:%d', process.pid, host, port);
	});
}



