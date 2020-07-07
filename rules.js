export default [
	{
		name: 'spacing',
		property: ['p', 'm' ],
		children: [
			't',
			'r',
			'b',
			'l'
		],
		style: ({ rule, str }) => {
			let values = rule.args;

			switch (values.length) {
				case 1:
					values.push(values[0]);
				case 2:
					values.push(values[0]);
				case 3:
					values.push(values[1]);
			}

			for (let [index, side] of rule.children.entries()) {
				str`--${rule.property}${side}: ${values[index]};\n`
			}

			return str()
		}
	}
]
