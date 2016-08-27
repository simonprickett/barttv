//# sourceURL=application.js

/*
 application.js
 barttv
 
*/
 // TODO Credit Ray Wenderlich

var resourceLoader;

App.onLaunch = function(options) {
    var jsFiles = [
            `${options.BASEURL}resourceloader.js`,
            `${options.BASEURL}presenter.js`
        ],
        loadingDoc = createLoadingTemplate('Initializing...');

    navigationDocument.pushDocument(loadingDoc);

    evaluateScripts(jsFiles, function(success) {
        if (success) {
            resourceLoader = new ResourceLoader(options.BASEURL);
            resourceLoader.loadResource(`${options.BASEURL}templates/list.xml.js`, function(resource) {
                var stationListDoc;

                Presenter.setOptions(options);
                stationListDoc = Presenter.makeDocument(resource);

                stationListDoc.addEventListener('select', Presenter.loadStationDepartures.bind(Presenter));
                Presenter.replaceDocument(stationListDoc, loadingDoc);
            });
        } else {
            navigationDocument.presentModal(createAlert('Error!', 'Failed to load scripts for this application.'));
        }
    });
}

// Other lifecycle events that we could choose to implement
App.onWillResignActive = function() {}
App.onDidEnterBackground = function() {}
App.onWillEnterForeground = function() {}
App.onDidBecomeActive = function() {}
App.onWillTerminate = function() { }

/**
 * This convenience function returns an alert template, which can be used to present errors to the user.
 */
var createAlert = function(title, description) {
    var alertString = `<?xml version="1.0" encoding="UTF-8" ?>
        <document>
          <alertTemplate>
            <title>${title}</title>
            <description>${description}</description>
            <button>
                <text>OK</text>
            </button>
          </alertTemplate>
        </document>`

    var parser = new DOMParser();
    return parser.parseFromString(alertString, 'application/xml');
}

var createLoadingTemplate = function(title) {
    var loadingString = `<?xml version="1.0" encoding="UTF-8" ?>
        <document>
          <loadingTemplate>
            <activityIndicator>
                <title>${title}</title>
            </activityIndicator>
          </loadingTemplate>
        </document>`

    var parser = new DOMParser();
    return parser.parseFromString(loadingString, 'application/xml');
}