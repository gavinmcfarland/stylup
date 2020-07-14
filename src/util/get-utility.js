import _ from 'lodash';

export default function getUtilities(str, re) {

	function findMatches(regex, str, matches = []) {
		const res = regex.exec(str)
		res && matches.push(res) && findMatches(regex, str, matches)
		return matches
	}

	// var declRe = new RegExp(/\b([^-\s]+)(?:-((?:(0*([0-9]*\.?[0-9]+|\*)(px|cm|mm|in|pt|pc|em|ex|ch|rem|vw|vh|vmin|vmax)?|(\w+)),?)+))?\b/, 'gi')

	// let match = str.match(/\b([^-\s]+)(?:-((?:(0*([0-9]*\.?[0-9]+|\*)(px|cm|mm|in|pt|pc|em|ex|ch|rem|vw|vh|vmin|vmax)?|(\w+)),?)+))?\b/g);

	const matches = findMatches(re.decl, str)
	// console.log(match)

	let utilities = []


	for (let i = 0; i < matches.length; i++) {
		let match = matches[i]


		let utility = {};

		if (match !== null) {
			utility.class = match[1];

			// console.log(re.decl)
			utility.args = [];
			utility.decl = match[0];

			if (match[2]) {
				/* Temporary fix for multiple arguments */
				match[2].replace(new RegExp(re.arg, 'gmi'), function (arg) {

					if (arg === '*') arg = null
					utility.args.push(arg);
				});
			}

			if (utility.args.length === 0) {
				utility.args = null;
			}

			utilities.push(utility);
		}
	}

	return utilities

}
