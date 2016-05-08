"use strict";

var fs = require('fs'),
	validFileTypes = [
		'js'
	],
	requireFiles = function(directory, app) {
		fs.readdirSync(directory).forEach(function(fileName) {
			if (fs.lstatSync(directory + '/' + fileName).isDirectory()) {
				requireFiles(directory + '/' + fileName, app);
			} else {
				if ((fileName === 'index.js') && (directory === __dirname)) {
					return;
				}

				console.log('%s/%s', directory, fileName);
				require(directory + '/' + fileName)(app);
			}
		});
	};

module.exports = function(app) {
	requireFiles(__dirname, app);
}