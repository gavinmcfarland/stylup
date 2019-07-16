import phtml from 'phtml';
import _ from 'lodash';
import genRegex from './util/generate-regex.js';
import getUtility from './util/get-utility.js';

export default new phtml.Plugin('phtml-utility-class', opts => {
	return {
		Element(node) {
			re = genRegex(opts);

			const hasClass = node.attrs.get('class');

			const classNames = hasClass ? node.attrs.get('class').split(' ') : null;
			const flattened = [];
			const newClassNames = [];

			if (hasClass) {
				_.each(classNames, function(className) {
					// For each class name flatten (currently only supports m and p)
					utility = getUtility(className, re);
					// console.log(utility);

					if (utility) {
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

						if (isNaN(propValue)) {
							// Get styles
							styles.push(`--${propName}: ${propValue}`);
						} else {
							styles.push(`--${propName}: var(--${propValue})`);
						}
					}
				});

				// console.log(newClassNames);

				// Add new array back to element
				node.attrs.add({ class: newClassNames.join(' ') });

				// Apply new style attr
				node.attrs.add({ style: styles.join('; ') }); // TODO: add to existing style attr values
			}
		}
	};
});
