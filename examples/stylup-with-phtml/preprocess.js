const fs = require('fs');
const chokidar = require('chokidar');
const path = require('path');
const stylup = require('stylup');

let options = {
	processBlockStyles: true
}

var watching = /--watch|-w/.test(process.argv[2])

function processPHTML(event, filepath) {

	if (/.phtml$/.test(filepath)) {
		let dirname = path.dirname(filepath)
		let basename = path.basename(filepath, '.phtml')
		let output = path.join(dirname, basename + '.html');

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
	chokidar.watch('index.phtml').on('all', processPHTML)
}
else {
	chokidar.watch('index.phtml', { persistent: false }).on('all', processPHTML)
}
