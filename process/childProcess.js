'use strict';
var childProcess=require('child_process');
function osxWifiAccessPoint(opt, callback) {
	if (typeof opt == 'function' && typeof callback == 'undefined') {
		callback = opt;
		opt = {};
	}
	
	var cmd = '/System/Library/PrivateFrameworks/Apple80211.framework/Versions/A/Resources/airport -s';
	var f = opt.t ? function(cb) { cb(null, opt.t); } : childProcess.exec.bind(childProcess, cmd);
	f(function(err, val) {
		if (err) {
			return callback(err);
		}
		try {
			callback(err, parseAirportOutput(val).map(function(i) {
				return {
					ssid: i.SSID,
					mac_address: i.BSSID,
					signal_strength: parseInt(i.RSSI, 10)
				};
			}));
		}
		catch(err) {
			callback(err);
		}
	});
}
function parseAirportOutput(text) {
	var list = text.trim().split('\n').map(function(i) {
		var tmp = i.trim().split(/\s+/);
		if (tmp.length == 8) {
			tmp[tmp.length - 2] = tmp.slice(-2).join(' ');
			return tmp.slice(0, -1);
		}
		return tmp;
	});
	var re = /\w\w:(\w\w:){4}/;
	return list.filter(function(i) { return re.test(i[1]); }).map(function(i) {
		return [{}].concat(i).reduce(function(r, i, index) {
			r[list[0][index - 1]] = i;
			return r;
		});
	});
}

osxWifiAccessPoint(function(err,result){
	console.log(err,result);
});