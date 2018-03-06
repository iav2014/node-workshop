var request = require('request');
var server = require('../../httpserver');
var should = require('should');
var config = require('../../config/config');

var url = 'http://localhost:' + config.http;
var timeout = 10000;

describe('#E2E  httpserver start  ', function () {
  before(function (done) {
    this.timeout(timeout);
    if(!server.active()) server.single();
    setTimeout(function () {
      done();
    }, 5000);
  });
  it('#passport authenticate - Authorized', function (done) {
    this.timeout(timeout);
    var options = {
      uri:url+'/api/restricted',
      headers:{
        'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ'
      }
    };
    request.post(options, function (err, result) {
      should.not.exists(err);
      if (err) {
        done(err);
      }
      else {
        console.log('Authorized',result.body);
        should.exists(result.body);
        done();
      }
    });
  });

  it('#passport authenticate Unauthorized', function (done) {
		this.timeout(timeout);
		var options = {
			uri:url+'/api/restricted',
			headers:{}
		};
		request.post(options, function (err, result) {
			should.not.exists(err);
			if (err) {
				done(err);
			}
			else {
				console.log(result.body);
				should.exists(result.body);
				done();
			}
		});
  });
  
});

