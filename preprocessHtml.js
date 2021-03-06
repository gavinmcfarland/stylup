const fs = require('fs');
const chokidar = require('chokidar');
const path = require('path');
const stylup = require('./index.js');

let options = {
	processBlockStyles: true
}

var watching = /--watch|-w/.test(process.argv[2])

function processPHTML(event, filepath) {

	if (/.phtml|.html$/.test(filepath)) {
		let dirname = path.dirname(filepath)
		let basename = path.basename(filepath, '.html')
		let output = path.join(dirname, basename + '.manual-result.html');

		fs.readFile(filepath, 'utf8', (err, html) => {
			stylup.process(html, null, options).then((result) => {
				// console.log(result.html)
				fs.writeFile(output, result.html, () => true);
				console.log("HTML file rebuilt")
				// if (result.map) {
				// 	fs.writeFile(output + '.map', result.map, () => true);
				// }
			});
		});
	}

}



if (watching) {
	console.log("Watching for changes to phtml files...")
	chokidar.watch('test/example.html').on('all', processPHTML)
}
else {
	chokidar.watch('test/example.html', { persistent: false }).on('all', processPHTML)
}
