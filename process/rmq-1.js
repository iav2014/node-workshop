
var amqp = require('amqplib/callback_api');
var counter=0;
var json={
	id:0,
	msg:'proceso-1'
};
amqp.connect('amqp://localhost', function(err, conn) {
	console.log('Type Control-C to exit');
	// consumer queue2
	conn.createChannel(function(err, ch1) {
		var q = 'queue1';
		ch1.assertQueue(q, {durable: true});
		ch1.consume(q, function(msg) {
			var secs = msg.content.toString().split('.').length - 1;
			
			console.log(" [x] Received %s", msg.content.toString());
			setTimeout(function() {
				console.log(" [x] Done");
				ch1.ack(msg);
			}, secs * 1000);
		}, {noAck: false});
		
	});
	
	// producer queue2
	conn.createChannel(function(err, ch2) {
		var q = 'queue2';
		ch2.assertQueue(q, {durable: true});
		function intervalFunc() {
			json.id=counter++;
			var json_str=JSON.stringify(json);
			ch2.sendToQueue(q, new Buffer(json_str.toString()), {persistent: true});
			console.log(" [x] Sent '%s'", json_str);
		}
		var timer = setInterval(intervalFunc, 1500);
	});
});
