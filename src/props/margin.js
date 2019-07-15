import _ from 'lodash';
import re from '../util/generate-regex.js';

const side = {
	top: { _abbr: 't' },
	right: { _abbr: 'r' },
	bottom: { _abbr: 'b' },
	left: { _abbr: 'l' }
};

const props = {
	margin: {
		...(() => {
			return side;
		})(),
		_abbr: 'm'
	},
	padding: {
		...(() => {
			return side;
		})(),
		_abbr: 'p'
	}
};

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

function getUtility(str) {
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

export default function(node) {
	const hasClass = node.attrs.get('class');

	const classNames = node.attrs.get('class').split(' ');
	const flattened = [];
	const newClassNames = [];

	if (hasClass) {
		_.each(classNames, function(className) {
			// For each class name flatten (currently only supports m and p)
			utility = getUtility(className);

			if (utility) {
				// console.log(className);

				if (utility.name === 'm' || utility.name === 'p') {
					let values = utility.args;

					switch (values.length) {
						case 1:
							values.push(values[0]);
						case 2:
							values.push(values[0]);
						case 3:
							values.push(values[1]);
					}

					newClassNames.push(utility.name);

					// for each side push new class names into array
					_.each(utility.params, function(side, index) {
						className = `${side}-${values[index]}`;
						flattened.push(className);
					});
				} else {
					if (utility.parent) {
						// Avoid pushing a duplicate
						if (newClassNames.includes(utility.parent) === false) {
							newClassNames.push(utility.parent);
						}
					} else {
						// Avoid pushing a duplicate
						if (newClassNames.includes(utility.name) === false) {
							newClassNames.push(utility.name);
						}
					}
					flattened.push(className);
				}
			}
			// if normal word push into array
			else {
				newClassNames.push(className);
				flattened.push(className);
			}
		});

		let styles = [];

		// Get styles values from utilities
		_.each(flattened, function(newClassName) {
			if (newClassName.match(re.decl)) {
				let propName = newClassName.match(re.decl)[1];
				let propValue = newClassName.match(re.decl)[2];

				// Get styles
				styles.push(`--${propName}: ${propValue}`);
			}
		});

		// console.log(newClassNames);

		// Add new array back to element
		node.attrs.add({ class: newClassNames.join(' ') });

		// Apply new style attr
		node.attrs.add({ style: styles.join('; ') }); // TODO: add to existing style attr values
	}
}
