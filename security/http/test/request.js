/**
 * Created by ariza on 7/10/16.
 */

var request = require('request');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // for auto-generate certificates
var json = {method: 'json_eventos2', aplicacion: 22, device: 'ios', uid: 1};

var options = {
	uri: 'https://localhost:3443/listen',
	port: 3443,
	json: json
};

request.post(options, function (err, result) {
	if (err) {
		console.log('error:' + err);
	}
	else {
		console.log(result.body);
	}
});

