function ResourceLoader(baseUrl) {
	this.BASEURL = baseUrl;
}

ResourceLoader.prototype.loadResource = function(resource, callback) {
	var self = this;

	evaluateScripts([resource], function(success) {
		if (success) {
			callback.call(self, Template.call(self));
		} else {
			navigationDocument.presentModal(createAlert('Resource Load Error', 'Error loading resources :('));
		}
	});
}