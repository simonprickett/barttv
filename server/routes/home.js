"use strict";

// TODO... make this a handlebars template that does something more interesting...
// TODO... what about that ok button press?

var API_BASE = 'http://bart.crudworks.org/api',
	MAPBOX_API_TOKEN = process.env.MAPBOX_API_TOKEN,
	httpRequest = require('request');

module.exports = function(app) {
	app.get('/templates/list.xml.js', function(req, res) {
		httpRequest({
			url: API_BASE + '/stationInfo',
			method: 'GET',
		}, function(error, response, body) {
			var stationData = JSON.parse(body),
				station,
				resJS = '',
				n = 0;

			resJS = 'var Template = function() { return `' 
				+ '<?xml version="1.0" encoding="UTF-8" ?>'
				+ '<document>'
				+ 	'<listTemplate>'
				+		'<banner>'
				+			'<title>Real Time BART Information</title>'
				+		'</banner>'
				+		'<list>'
				+			'<header>'
				+				'<title>Stations</title>'
				+			'</header>'
				+			'<section>'

			for (; n < stationData.length; n++) {
				station = stationData[n];

				resJS += ''
					+				'<listItemLockup stationCode="' + station.abbr + '">'
					+					'<title>' + station.name + '</title>'
					+					'<relatedContent>'
					+						'<lockup>'
					+							'<title>' + station.name + '</title>'
					+							'<img src="https://api.mapbox.com/styles/v1/mapbox/streets-v8/static/' + station.gtfs_longitude + ',' + station.gtfs_latitude + ',17,0,0/1000x600?access_token=' + MAPBOX_API_TOKEN + '" />'
					+							'<description>' + station.intro + '</description>'
					+						'</lockup>'
					+					'</relatedContent>'
					+				'</listItemLockup>';
			}

			resJS += 		'</section>'
				+ 		'</list>'
				+	'</listTemplate>'
				+ '</document>'
				+ '`}';

			res.set('Content-Type', 'text/javascript');
			res.status(200).send(resJS);
		});
	});

	app.get('/templates/departures.xml.js', function(req, res) {
		httpRequest({
			url: API_BASE + '/departures/' + req.query.stationCode,
			method: 'GET',
		}, function(error, response, body) {	
			var destinations = JSON.parse(body),
				destination,
				departure,
				resJS = '',
				n = 0,
				m = 0;

			resJS = 'var Template = function() { return `' 
				+ '<?xml version="1.0" encoding="UTF-8" ?>'
				+ 	'<document>'
				+ 		'<listTemplate>'
				+			'<background></background>'
				+			'<banner>'
				+				'<title>Departures from ' + destinations.name + '</title>'
				+			'</banner>'
				+			'<list>'
				+				'<header>'
				+					'<title>Towards</title>'
				+				'</header>'
				+				'<section>'


			destinations = destinations.etd;

			for (; n < destinations.length; n++) {
				destination = destinations[n];

				resJS += '<listItemLockup>';
				resJS += 	'<title>' + destination.destination + '</title>';
				resJS += 	'<relatedContent>';
				resJS += 		'<lockup>';
				resJS +=			'<title>Towards ' + destination.destination + '</title>'

				for (m = 0; m < destination.estimate.length; m++) {
					departure = destination.estimate[m];

					resJS += 	'<title>' + departure.minutes + ' minutes, ' + departure.length + ' cars</title>';
				}

				resJS += 		'</lockup>';
				resJS += 	'</relatedContent>';
				resJS += '</listItemLockup>';
			}

			resJS += ''
				+ 				'</section>'
				+			'</list>'
				+		'</listTemplate>'
				+	'</document>'
				+ '`}';

			res.set('Content-Type', 'text/javascript');
			res.status(200).send(resJS);	
		});
	});
}
