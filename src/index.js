import phtml from 'phtml';
import { Element } from 'phtml';
import _ from 'lodash';
import genRegex from './util/generate-regex.js';
import getUtilities from './util/get-utility.js';
import { stripIndent } from 'common-tags'
import fs from 'fs-extra'
var uniqid = require('uniqid');
const postcss = require('postcss');
const postcssrc = require('postcss-load-config');


// Get rules definitions

var rules;

if (fs.existsSync(process.cwd() + '/' + 'stylup.config.js')) {

	rules = require(process.cwd() + '/' + 'stylup.config.js').classes
	// console.log(rules)

}

function putValuesIntoArray(value) {
	return Array.isArray(value) ? value : [value]
}

function genStyles(utility, acc) {
	var styles = ''
	if (utility.style({ rule: utility, args: utility.args, str: acc }) === undefined) {
		styles = ''
	} else {
		styles = utility.style({ rule: utility, args: utility.args, str: acc })
	}

	return `${styles}`
}

async function processPostCSS(src, callback) {
	const ctx = { parser: true, map: 'inline' };
	const { plugins, options } = postcssrc.sync(ctx);
	const { css } = await postcss(plugins).process(src, { from: undefined });


	callback(css)
}

function processInlineStyles(node, classNameID) {

	const inlineStyles = node.attrs.get('style');

	if (inlineStyles) {
		styles = `
.${classNameID}.${classNameID} {${inlineStyles}}`

		processPostCSS(styles, (css) => {


			// Add new array back to element
			var styleTag = new Element({
				name: 'style'
			}, null, css)

			// Add new array back to element
			var spanTag = new Element({
				name: 'span'
			}, null, styleTag)

			spanTag.attrs.add({ style: 'display: none' })
			spanTag.attrs.add({ class: 'stylup-sb' })

			node.before(spanTag)
			node.attrs.remove('style')

			var classNames = node.attrs.get('class') ? node.attrs.get('class').split(' ') : undefined || [];

			classNames.push(classNameID)
			node.attrs.add({ class: classNames.join(' ') });
		})


	}
}

export default new phtml.Plugin('phtml-utility-class', opts => {
	opts = opts || {}
	return {
		Element(node) {

			if (opts.processBlockStyles) {
				if (node.name === "style") {
					const target = node.nodes[0];
					const source = target.data;
					processPostCSS(source, (css) => {

						node.innerHTML = css
					})
				}
			}


			var classNameID = uniqid();

			if (process.env.NODE_ENV === "test") {
				classNameID = 'uniqid'
			}

			// Get styles from style attr
			processInlineStyles(node, classNameID)

			const hasClass = node.attrs.get('class');
			if (hasClass) {
				const classNames = hasClass ? node.attrs.get('class').split(' ') : null;
				var re = genRegex(opts)

				var utilities = getUtilities(hasClass, re);


				let newClassNames = [...classNames]
				let styles = [];


				let hasUtilities = false;


				for (let utility of utilities) {


					// if (utilityClass) {
					// 	console.log('utility class')
					// }
					// else {
					// 	console.log('not utilit class')
					// }
					for (let rule of rules) {
						rule.class = putValuesIntoArray(rule.class);

						for (let property of rule.class) {

							var tempRule = Object.assign({}, rule)

							tempRule.class = property



							if (utility.class === tempRule.class) {


								tempRule = Object.assign(tempRule, utility)


								hasUtilities = true

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



								styles.push(genStyles(tempRule, acc))

								newClassNames.push(utility.class);

							}
						}
					}
				}

				if (hasUtilities) {
					styles = `
.${classNameID}.${classNameID} {
${styles.join('')}
}`
					processPostCSS(styles, (css) => {
						// Add new array back to element
						var styleTag = new Element({
							name: 'style'
						}, null, css)

						// Add new array back to element
						var spanTag = new Element({
							name: 'span'
						}, null, styleTag)

						spanTag.attrs.add({ style: 'display: none' })
						spanTag.attrs.add({ class: 'stylup-sb' })

						node.before(spanTag)

						// Add classNameID
						newClassNames.push(classNameID)
						node.attrs.add({ class: newClassNames.join(' ') });
					})


				}
			}

		}
	};
});
