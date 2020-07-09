import _ from 'lodash';
import props from '../props.js';

var abbrs = (() => {
	let abbrs = {};
	_.each(props, function (prop, key) {
		let args = [];
		_.each(prop, function (arg) {
			if (arg._abbr) {
				args.push(prop._abbr + arg._abbr);
			}
		});

		return (abbrs[props[key]._abbr] = args);
	});
	return abbrs;
})();

var otherAbbrs = (() => {
	let abbrs = {};
	_.each(props, function (prop) {
		_.each(prop, function (arg) {
			if (arg._abbr) {
				let newName = prop._abbr + arg._abbr;
				abbrs[newName] = prop._abbr;
			}
		});
	});

	return abbrs;
})();

export default function getUtility(str, re) {
	let match = re.decl.exec(str);

	let utility = {};

	if (match !== null) {
		utility.class = match[1];
		utility.args = [];
		utility.decl = match[0];
		/* Temporary fix for multiple arguments */
		match[2].replace(new RegExp(re.arg, 'gmi'), function (arg) {
			if (arg === '*') arg = null
			utility.args.push(arg);
		});
		return utility;
	} else {
		return false;
	}
}
