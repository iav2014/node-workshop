#!/usr/bin/env node
/*
 ab -n 10000 -c 200 -p postp.json -T 'application/json' http://localhost:8100/rest
 
 postp.json
 {
 "aplicacion":"22",
 "method":"submitVote",
 "device":"1234",
 "uid":"123",
 "coach":"128",
 "aplicacion":"web1",
 "statsItem":"505"
 }
*/
/**
 * Created by ariza on 03/08/18.
 */
const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {
	conn.createChannel(function (err, ch) {
		let q = 'queue3';
		ch.assertQueue(q, {durable: false});
		ch.prefetch(1);
		console.log(' [x] Awaiting RPC requests');
		ch.consume(q, (msg) => {
			var json = msg.content.toString();
			console.log(" [.] Get[.] - json:", json);
			console.log('id:', msg.properties.correlationId);
			console.log('response to:', msg.properties.replyTo);
			//.. process.spawn python NLP
			console.log('working...');
			pythonTransaction((err, result) => {
				console.log('pythonTransaction callback', err, result);
				console.log('complete!');
				//.. process.spawn python NLP END
				console.log(json.toString());
				ch.sendToQueue(msg.properties.replyTo,
					new Buffer(json.toString()),
					{correlationId: msg.properties.correlationId});
				ch.ack(msg);
			});
			
		});
	});
});

let pythonTransaction = (callback) => {
	var spawn = require('child_process').spawn,
		py = spawn('python3', ['compute_input.py']),
		data = [1, 2, 3, 4, 5, 6, 7, 8, 9],
		dataString = '';
	py.stdin.write(JSON.stringify(data));
	py.stdin.end();
	py.stdout.on('data', (data) => {
		dataString += data.toString();
		console.log(`child stdout:\n${data}`);
	});
	
	/*Once the stream is done (on 'end') we want to simply log the received data to the console.*/
	py.stdout.on('end', function () {
		console.log('Sum of numbers=', dataString);
	});
	
	
	py.on('exit', function (code, signal) {
		console.log('child process exited with ' +
			`code ${code} and signal ${signal}`);
		callback(code, signal)
	});
	
	
	py.stderr.on('data', (data) => {
		console.error(`child stderr:${data}`);
	});
	

};
