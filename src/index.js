import phtml from 'phtml';
import _ from 'lodash';

import flattenClasses from './flatten-classes.js';

export default new phtml.Plugin('phtml-phthml-shorthand-utility', opts => {
	return {
		Element(node) {
			flattenClasses(node);
		}
	};
});
