/**
 * Created by ariza on 7/10/16.
 */


var options = {
	uri: 'https://keystone.usersad.everis.int:3000/examplepost',
	port: 3000,
	json: {}
	/*
	json:
		{
			client_id: 'pruebaskmo',
			redirect_uri: 'https://keystone.usersad.everis.int:3000/login/callback',
			client_secret: 'skmo',
			code: 'cYo7cu8IFEu7BUffrVsIFA.um1AQQ6e1QjoAL2IiHCHeCaN3JA.PQLVlf3ka6vls9waC7RcJlj6ZTOw860vM86iuXiWpp9M7F_R-5wOWjq4CzPIQ-GwxE9Do7vpGnKssiIojw53wnKWs-N5IEIQ7R-ocOH91KXi367VzY6ttmcUlLwI-oOeWtqMd133cV3z2p5i4DVL5RuFGNPhXWj9zPQZNb581_vEf6Dns8JtqVoGcrMTb2X0rm4xUFE1VSSmxFnz7JsncXSkqWaaFjGKLpPckPJmP4F8OW6_G40nK81XitFNBlIldeIH1bMWUWsvLO8KvzjmUDMlZOX8K7tWEuA0xcnBI1X0k3z3YCcAA9n8TCNGSSRnXZk98YuKgsP91pY3vVqCBg',
			grant_type: 'authorization_code'
		}
		*/
}


var request = require('request');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // for auto-generate certificates
/*
var json = {method: 'json_eventos2', aplicacion: 22, device: 'ios', uid: 1};

var options = {
	uri: 'https://localhost:3443/listen',
	port: 3443,
	json: json
};
*/
request.post(options, function (err, result) {
	if (err) {
		console.log('error:' + err);
	}
	else {
		console.log(result.body);
	}
});

