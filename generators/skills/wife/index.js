function hardRule(query, breakdown) {
	return query.startsWith('my wife') || query.startsWith('name of my wife') ||
		query.startsWith('whats the name of my wife') || query.startsWith('who is my wife') ||
		query.startsWith('do you know the name of my wife');
}
const intent = () => ({
	keywords: ['wife','my wife´s name'],
	module: 'wife'
})
function* name_resp(query, breakdown, user) {
	console.log('name_resp',query, breakdown, user);
	if (query.startsWith('my wifes name is') || query.startsWith('the name of my wife')) {
		const words = query.toLowerCase().split(' ')
		
		let nameIndex = words.length - 1
		 if (words.indexOf('name-.') >= 0) {
			nameIndex = words.indexOf('is') + 1
		}
		
		const names = words.splice(nameIndex, words.length - nameIndex)
		if (names.length == 0) {
			return {text: 'I\'m sorry, I did\'t quite catch your name...'}
		}
		console.log('------>',names);
		let name = ''
		// Make the first letters uppercase and make it into one string.
		for (let i = 0; i < names.length; i++) {
			name += `${names[i].charAt(0).toUpperCase() + names[i].slice(1)}`
		}
		if (name.length <= 0) {
			return {
				text: 'I\'m sorry, I did\'t quite catch her name...'
			}
		}
		yield global.db.setValue('wife', user, 'name', name)
		return {text: `Okay the name of your wife is ${name}.`, name}
	} else {
		const name = yield global.db.getValue('wife', user, 'name');
		if(!name) return {text:'I do not know hers name'};
		return {text: `Her name is ${name}.`, name}
	}
}

const examples = () => (
	['My names wife is Carmen', 'The name of my wife is Carmen']
);

module.exports = {
	get: name_resp,
	hardRule,
	intent,
	examples
}
