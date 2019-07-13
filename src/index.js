import phtml from 'phtml'
import _ from 'lodash'

import re from './generate-regex.js'

export default new phtml.Plugin('phtml-phthml-shorthand-utility', opts => {
	console.log({ opts });

	return {
		Element (node) {
			let classNames = node.attrs.get('class').split(' ')
			let newClassNames = []

			_.each(classNames, function (className) {

				if (className.match(re.decl)) {
					className.replace(re.decl, function(decl, name, args) {

						if (name === 'm' || 'p') {
							// Currently only anticipates things like margin, padding, etc

							let values = []
							let sides = ['t', 'r', 'b', 'l']

							args.replace(re.arg, function(arg) {
								values.push(arg);
							})

							if (values.length === 1) {
								values.push(values[0]);
							}
							if (values.length === 2) {
								values.push(values[0]);
							}
							if (values.length === 3) {
								values.push(values[1]);
							}

							_.each(sides, function(side, index) {
								newClassNames.push(`${name}${side}-${values[index]}`)
							})
						}


					})
				}
				else {
					newClassNames.push(className)
				}

			})

			node.attrs.add({'class': newClassNames.join(" ")})
		}
	};
});
