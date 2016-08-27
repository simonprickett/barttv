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

	replaceDocument: function(newDoc, oldDoc) {
		navigationDocument.replaceDocument(newDoc, oldDoc);
	},

	loadStationDepartures: function(event) {
		var elem = event.target,
			stationCode = elem.getAttribute('stationCode'),
			loadingTemplateDoc = createLoadingTemplate('Fetching train times...');

		Presenter.pushDocument(loadingTemplateDoc);

		resourceLoader.loadResource(`${Presenter.options.BASEURL}templates/departures.xml.js?stationCode=${stationCode}`, function(resource) {
        	var departuresDoc = Presenter.makeDocument(resource);
            Presenter.replaceDocument(departuresDoc, loadingTemplateDoc);
        });
	}
}