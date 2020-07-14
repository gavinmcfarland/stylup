export default {
	classes: [
		{
			name: 'spacing',
			class: ['p', 'm'],
			children: [
				't',
				'r',
				'b',
				'l'
			],
			style({ rule, str }) {
				if (rule.args) {
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
						str`--${rule.class}${side}: ${values[index]};\n`
					}

					return str()
				}
			}
		},
		{
			name: 'colour',
			class: 'c',
			style({ rule, str }) {
				if (rule.args) {

					str`--${rule.class}: ${rule.args[0]};\n`

					return str()
				}
			}
		},
		{
			name: 'background color',
			class: 'bgc',
			style({ rule, str }) {
				if (rule.args) {

					str`--${rule.class}: ${rule.args[0]};\n`

					return str()
				}
			}
		},
		{
			name: 'width',
			class: 'w',
			style({ rule, str }) {
				if (rule.args) {
					str`--${rule.class}: ${rule.args[0]};\n`

					return str()
				}
			}
		}
	],
	queries: [
		{
			name: 'h',
			style({ name, property, output, str }) {
				return str`
				&:hover {
					${output}
				}
				`
			}
		}
	]
}
