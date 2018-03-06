/*
* jxcore: https://github.com/jxcore/jxcore/issues/61
 */
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
