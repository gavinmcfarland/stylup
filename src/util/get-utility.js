import _ from 'lodash';
import re from './generate-regex.js';
import props from '../props.js';

var abbrs = (() => {
	let abbrs = {};
	_.each(props, function(prop, key) {
		let args = [];
		_.each(prop, function(arg) {
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
	_.each(props, function(prop, key) {
		let args = [];
		_.each(prop, function(arg) {
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
		utility.name = match[1];
		utility.args = [];
		utility.decl = match[0];
		match[2].replace(re.arg, function(arg) {
			utility.args.push(arg);
		});

		_.each(abbrs, function(value, key) {
			if (key === utility.name) {
				utility.params = value;
			}
		});

		_.each(otherAbbrs, function(value, key) {
			if (key === utility.name) {
				utility.parent = value;
			}
		});

		return utility;
	} else {
		return false;
	}
}
