//# sourceURL=application.js

/*
 application.js
 barttv
 
 Copyright (c) 2016 crudworks.org. All rights reserved.
*/

/*
 * This file provides an example skeletal stub for the server-side implementation 
 * of a TVML application.
 *
 * A javascript file such as this should be provided at the tvBootURL that is 
 * configured in the AppDelegate of the TVML application. Note that  the various 
 * javascript functions here are referenced by name in the AppDelegate. This skeletal 
 * implementation shows the basic entry points that you will want to handle 
 * application lifecycle events.
 */

/**
 * @description The onLaunch callback is invoked after the application JavaScript 
 * has been parsed into a JavaScript context. The handler is passed an object 
 * that contains options passed in for launch. These options are defined in the
 * swift or objective-c client code. Options can be used to communicate to
 * your JavaScript code that data and as well as state information, like if the 
 * the app is being launched in the background.
 *
 * The location attribute is automatically added to the object and represents 
 * the URL that was used to retrieve the application JavaScript.
 */

 // TODO Credit Ray Wenderlich
 // TODO remove loading screen from back hierarchy

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

App.onWillResignActive = function() {

}

App.onDidEnterBackground = function() {

}

App.onWillEnterForeground = function() {
    
}

App.onDidBecomeActive = function() {
    
}

App.onWillTerminate = function() {
    
}


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

    var alertDoc = parser.parseFromString(alertString, 'application/xml');

    return alertDoc
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
    var loadingMask = parser.parseFromString(loadingString, 'application/xml');
    return loadingMask;
}