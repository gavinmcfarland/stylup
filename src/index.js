import phtml from 'phtml';
import _ from 'lodash';
import genRegex from './util/generate-regex.js';
import getUtility from './util/get-utility.js';

export default new phtml.Plugin('phtml-utility-class', opts => {
	return {
		Element(node) {
			const re = genRegex(opts);

			const hasClass = node.attrs.get('class');

			const classNames = hasClass ? node.attrs.get('class').split(' ') : null;
			const flattenedClassNames = [];
			const newClassNames = [];

			if (hasClass) {
				_.each(classNames, function(className) {
					// For each class name flatten (currently only supports m and p)
					const utility = getUtility(className, re);

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
								flattenedClassNames.push(className);
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
							flattenedClassNames.push(className);
						}
					}
					// if normal word push into array
					else {
						newClassNames.push(className);
						flattenedClassNames.push(className);
					}
				});

				let styles = [];

				// Get styles values from utilities
				_.each(flattenedClassNames, function (newClassName) {

					var utility = getUtility(newClassName, re)

					if (newClassName.match(re.decl)) {
						let propName = newClassName.match(re.decl)[1];
						let propValue = newClassName.match(re.decl)[2];

						if (isNaN(propValue)) {
							// Get styles
							styles.push(`--${propName}: ${propValue}`);
						} else {
							var name = propName
							if (utility.parent) name = utility.parent

							styles.push(`--${propName}: var(--${name}-${propValue})`);
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
