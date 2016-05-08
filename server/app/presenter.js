// TODO remove loading screen from back hierarchy

var Presenter = {
	setOptions: function(options) {
		Presenter.options = options;
	},

	makeDocument: function(resource) {
		if (! Presenter.parser) {
			Presenter.parser = new DOMParser();
		}

		return Presenter.parser.parseFromString(resource, 'application/xml');
	},

	modalDialog: function(xml) {
		navigationDocument.presentModal(xml);
	},

	pushDocument: function(xml) {
		navigationDocument.pushDocument(xml);
	},

	loadStationDepartures: function(event) {
		var elem = event.target,
			stationCode = elem.getAttribute('stationCode');

		Presenter.pushDocument(createLoadingTemplate('Fetching train times...'));

		resourceLoader.loadResource(`${Presenter.options.BASEURL}templates/departures.xml.js?stationCode=${stationCode}`, function(resource) {
        	var doc = Presenter.makeDocument(resource);
            Presenter.pushDocument(doc);
        });
	}
}