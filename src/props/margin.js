import _ from 'lodash';
import re from '../util/generate-regex.js';

// export default function(node) {
// 	const side = {
// 		top: { _abbr: 't' },
// 		right: { _abbr: 'r' },
// 		bottom: { _abbr: 'b' },
// 		left: { _abbr: 'l' }
// 	};

// 	const props = {
// 		margin: {
// 			...(() => {
// 				return side;
// 			})(),
// 			_abbr: 'm'
// 		},
// 		padding: {
// 			...(() => {
// 				return side;
// 			})(),
// 			_abbr: 'p'
// 		}
// 	};

// 	console.log(props);

// 	const hasClass = node.attrs.get('class');

// 	const classNames = node.attrs.get('class').split(' ');
// 	const newClassNames = [];

// 	if (hasClass) {
// 		_.each(classNames, function(className) {
// 			if (className.match(re.decl)) {
// 				className.replace(re.decl, function(decl, name, args) {
// 					if (name === props.margin._abbr || name === props.padding._abbr) {
// 						console.log(name);
// 						let values = [];
// 						let sides = ['t', 'r', 'b', 'l'];

// 						args.replace(re.arg, function(arg) {
// 							values.push(arg);
// 						});

// 						if (values.length === 1) {
// 							values.push(values[0]);
// 						}
// 						if (values.length === 2) {
// 							values.push(values[0]);
// 						}
// 						if (values.length === 3) {
// 							values.push(values[1]);
// 						}

// 						_.each(sides, function(side, index) {
// 							newClassNames.push(`${name}${side}-${values[index]}`);
// 						});
// 					}
// 				});
// 			} else {
// 				newClassNames.push(className);
// 			}
// 		});

// 		node.attrs.add({ class: newClassNames.join(' ') });
// 	}
// }

export default function(node) {
	const hasClass = node.attrs.get('class');

	const classNames = node.attrs.get('class').split(' ');
	const newClassNames = [];

	if (hasClass) {
		_.each(classNames, function(className) {
			// example: word-10px
			if (className.match(re.decl)) {
				className.replace(re.decl, function(decl, name, args) {
					// for margin and padding
					if (name === 'm' || name === 'p') {
						let values = [];
						let sides = ['t', 'r', 'b', 'l'];

						// get each arg in decl and add to array
						args.replace(re.arg, function(arg) {
							values.push(arg);
						});

						// start to build full array
						if (values.length === 1) {
							values.push(values[0]);
						}
						if (values.length === 2) {
							values.push(values[0]);
						}
						if (values.length === 3) {
							values.push(values[1]);
						}

						// for each side push new class names into newClassNames array
						_.each(sides, function(side, index) {
							newClassNames.push(`${name}${side}-${values[index]}`);
						});
					}
					// if doesn't match margin or padding push into array
					else {
						newClassNames.push(className);
					}
				});
			}
			// if normal word push into array
			else {
				newClassNames.push(className);
			}
		});

		// Add new array back to element
		node.attrs.add({ class: newClassNames.join(' ') });
	}
}
