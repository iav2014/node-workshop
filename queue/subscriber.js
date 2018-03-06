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

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
	conn.createChannel(function(err, ch) {
		var q = 'queue3';
		ch.assertQueue(q, {durable: false});
		ch.prefetch(1);
		console.log(' [x] Awaiting RPC requests');
		ch.consume(q, function reply(msg) {
			var json = msg.content.toString();
			console.log(" [.] Get[.] - json:", json);
			
			console.log('id:',msg.properties.correlationId);
			console.log('response to:',msg.properties.replyTo);
			ch.sendToQueue(msg.properties.replyTo,
				new Buffer(json.toString()),
				{correlationId: msg.properties.correlationId});
			ch.ack(msg);
		});
	});
});