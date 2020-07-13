import _ from 'lodash';
import { unlink } from 'fs-extra';

export default function getUtility(str, re) {

	var declRe = /([^-\s]+)(?:-([^\s]+))?/

	let match = re.decl.exec(str);

	// console.log(match)



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

		// console.log(utility)

		return utility;
	} else {
		return false;
	}
}
