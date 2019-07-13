import _ from 'lodash'

let cssUnits = [ 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'em', `ex`, `ch`, `rem`, `vw`, `vh`, `vmin`, `vmax`]

let REGEX = new RegExp("(^\\D+)\\-0*([0-9]*\\.?[0-9]+(" + cssUnits.join("|") + ")?$)", "mi")

export default function(node) {
	// Look through each element that has class names
	_.each(node.attrs, function (attr) {

		if (attr.name === 'class') {

			let classNames = attr.value.split(' ')
			let newClassNames = []
			let styleValues = []
			let newProps = []

			// Extract values required for style attr
			_.each(classNames, function (className) {

				if (className.match(REGEX)) {

					let propName = className.match(REGEX)[1]
					let newClassName = propName

					propValue = className.match(REGEX)[2]
					styleValues.push({ [propName]: propValue})

					// TODO: check for duplicate props as well because only needs one in output

					if (newClassNames.includes(newClassName) === false) newClassNames.push(newClassName);

				}
				else {
					newClassNames.push(className)
				}

			})

			// Add new class names to element
			node.attrs.add({ class: newClassNames.join(" ") })

			_.each(styleValues, function (item) {
				_.each(item, function(value, key) {
					newProps.push(`--${key}: ${value}`)
				})

			})

			// Apply new style attr
			node.attrs.add({ style: newProps.join("; ")}) // TODO: add to existing style attr values
		}
	})
}
