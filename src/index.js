import phtml from 'phtml';
import { Element } from 'phtml';
import _ from 'lodash';
import genRegex from './util/generate-regex.js';
import getUtility from './util/get-utility.js';
import rules from '../rules.js';
import { stripIndent } from 'common-tags'
const shortid = require('shortid');
var uniqid = require('uniqid');



function putValuesIntoArray(value) {
	return Array.isArray(value) ? value : [value]
}




function genStyles(utility, acc) {
	return `${utility.style({ rule: utility, args: utility.args, str: acc })}`
}

export default new phtml.Plugin('phtml-utility-class', opts => {
	return {
		Element(node) {
			const classNameID = shortid.generate();

			const hasClass = node.attrs.get('class');
			const classNames = hasClass ? node.attrs.get('class').split(' ') : null;
			let styles = [];

			if (hasClass) {
				let hasUtilities = false;
				for (let className of classNames) {
					for (let rule of rules) {
						rule.property = putValuesIntoArray(rule.property);
						var utilityClass = getUtility(className, genRegex(opts));

						for (let property of rule.property) {

							var tempUtility = Object.assign({}, rule, utilityClass)

							tempUtility.property = property

							if (utilityClass.property === tempUtility.property) {
								hasUtilities = true
								// console.log(tempUtility)
								var output = "";

								function acc(strings, ...values) {


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

								styles.push(genStyles(tempUtility, acc))

								classNames.push(utilityClass.property);

							}
						}
					}
				}

				if (hasUtilities) {
					styles = `
.${classNameID} {
${styles.join('')}
}`

					// Add new array back to element
					var styleTag = new Element({
						name: 'style'
					}, null, styles)

					// Add new array back to element
					var spanTag = new Element({
						name: 'span'
					}, null, styleTag)


					node.root.prepend(spanTag)

					// Add classNameID
					classNames.push(classNameID)
					node.attrs.add({ class: classNames.join(' ') });
				}
			}
		}
	};
});
