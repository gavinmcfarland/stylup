const fs = require('fs');
const chokidar = require('chokidar');
const path = require('path');
const stylup = require('stylup');

let options = {
	processBlockStyles: true
}

// A script to manually preprocess HTML

function process(dir) {
	// var dir = path.dirname(input);

	chokidar.watch(dir).on('all', (event, filepath) => {

		if (/.phtml$/.test(filepath)) {
			let dirname = path.dirname(filepath)
			let basename = path.basename(filepath, '.phtml')
			let output = path.join(dirname, basename + '.html');

			fs.readFile(filepath, 'utf8', (err, html) => {
				stylup.process(html, null, options).then((result) => {
					// console.log(result.html)
					fs.writeFile(output, result.html, () => true);
					// if (result.map) {
					// 	fs.writeFile(output + '.map', result.map, () => true);
					// }
				});
			});
		}

	});
}

process('examples/')
