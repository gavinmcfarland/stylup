import phtml from 'phtml'
import _ from 'lodash'

import flattenClasses from './flatten-classes.js'
import customProperties from './custom-properties.js'

export default new phtml.Plugin('phtml-phthml-shorthand-utility', opts => {
	console.log({ opts });

	return {
		Element (node) {

			flattenClasses(node);
			customProperties(node);

		}
	};
});
