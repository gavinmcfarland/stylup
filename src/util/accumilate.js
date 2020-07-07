import { stripIndent } from 'common-tags'

var output = "";

export default function acc(strings, ...values) {


	if (!strings) {
		if (typeof output !== "undefined") {

			return output = output.replace(/\n$/, '');;
		} else {

			return str;
		}

	}
	else {


		let str = '';

		strings.forEach((string, a) => {
			str += string + (values[a] || '');
		});

		str = stripIndent(str);


		if (typeof output !== "undefined") {
			output += `${str}\n`;
		}



		return str;
	}


}
