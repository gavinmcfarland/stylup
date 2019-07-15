import _ from 'lodash';
import re from './util/generate-regex.js';

let cssUnits = [
	'px',
	'cm',
	'mm',
	'in',
	'pt',
	'pc',
	'em',
	`ex`,
	`ch`,
	`rem`,
	`vw`,
	`vh`,
	`vmin`,
	`vmax`
];

let REGEX = new RegExp(
	'(^\\D+)\\-0*([0-9]*\\.?[0-9]+(' + cssUnits.join('|') + ')?$)',
	'mi'
);

export default function(node) {
	// Look through each element that has class names
	_.each(node.attrs, function(attr) {
		if (attr.name === 'class') {
			let classNames = attr.value.split(' ');
			let newClassNames = [];
			let styleValues = [];
			let newProps = [];

			// Extract values required for style attr
			_.each(classNames, function(className) {
				if (className.match(re.decl)) {
					let propName = className.match(re.decl)[1];
					let newClassName = propName;

					propValue = className.match(re.decl)[2];

					styleValues.push({ [propName]: propValue });

					// TODO: check for duplicate props as well because only needs one in output

					if (newClassNames.includes(newClassName) === false) {
						// console.log(className + '   --- a utility');
						newClassNames.push(newClassName);
					}
				} else {
					// console.log(className + '   --- not a utility');
					newClassNames.push(className);
				}
			});

			// Add new class names to element
			// node.attrs.add({ class: newClassNames.join(' ') });

			// Add new styles to element
			_.each(styleValues, function(item) {
				_.each(item, function(value, key) {
					newProps.push(`--${key}: ${value}`);
				});
			});

			newerClassNames = [];

			_.each(newClassNames, function(item) {
				let exact = new RegExp(
					'^(' + re.property.source + ')' + '(t|l|b|r)' + '$',
					'gmi'
				);

				// TODO: Look for a more robust way to check for exact match ^

				if (item.match(exact)) {
					if (newerClassNames.includes(item.match(re.property)[0]) === false)
						console.log(item.match(re.property)[0]);
					newerClassNames.push(item.match(re.property)[0]);
				} else {
					newerClassNames.push(item);
				}
			});

			// Apply new style attr
			node.attrs.add({ style: newProps.join('; ') }); // TODO: add to existing style attr values

			// Reduce class names down to simplest form
			node.attrs.add({ class: newerClassNames.join(' ') });
		}
	});
}
