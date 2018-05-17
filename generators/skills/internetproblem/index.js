const intent = () => ({
	keywords: ['i cannot connect to internet', 'i cant connect to internet','internet problem','i have internet problem'],
	module: 'internetproblem'
})

function * time_resp(query) {
	
	console.log(query);
	return {text: 'what kind of problem do you have?'}
}

const examples = () => (
	['I can not connect to internet']
)

module.exports = {
	get: time_resp,
	intent,
	examples
}