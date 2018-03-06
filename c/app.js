/*
* jxcore: https://github.com/jxcore/jxcore/issues/61
 */


var clib = require('./build/Release/clib.node');
// static text
//console.log('static text:'+clib.helloWorld());

// callback function
clib.run(function (err,result) {
	if(!err) console.log(err,result);
	
});

// normal funcion
function getTimeMSFloat() {
	var hrtime = process.hrtime();
	return (hrtime[0] * 1000000 + hrtime[1] / 1000) / 1000;
}

function factorial(n) {
	if (!(n ^= 0))
		return 1;
	else
		return (n * factorial(n - 1));
}

console.log('++++++++++++ 0..50000000 - node js scope ++++++++++++');
var c = 0;
var t1 = getTimeMSFloat();
for (var i = 0; i < 1000000; i++) {
	for (var j = 0; j < 50; j++) {
		c++;
		factorial(j);
	}
}
console.log('done!:' + c);
var tn = parseFloat(getTimeMSFloat() - t1);
console.log('* time:' + tn);
console.log('------------ 0..50000000 - node js end scope --------');

console.log('++++++++++++ 0..50000000 - cpp scope ++++++++++++');
t1 = getTimeMSFloat();
console.log('done!:' + clib.loop());
var tc = parseFloat(getTimeMSFloat() - t1);
console.log('* time:' + tc);
console.log('------------ 0..50000000 - cpp end scope ------------');
console.log(tn / tc);
//console.log(factorial(50));
//console.log(clib.nfactorial(4));


