/**
 * pageFactory.js
 * Created by Rob on 12/10/2015.
 * Notes:
 * ---------------------------------------------------------------------
 * Reference A
 * Problems w/ QtWebKit & extending prototype. See:
 * https://groups.google.com/forum/#!topic/phantomjs/Sc4rBPFCOcs
 * See also:
 * https://groups.google.com/forum/#!topic/phantomjs/tTGlFrZWnXg/discussion
 * ---------------------------------------------------------------------
 */
try {
    diff = require('../utils/htmldiff.js');
}
catch (err) {
    console.log(err.message)
}
logItems = function(message,eventName){
    if (logType == "verbose") {
        console.log(instanceName + eventName);
        console.log(prefix + JSON.stringify(message));
    } else if (logType == "debug") {
        console.log(eventName);
        for (var idx in message){
            console.log(idx + ": " + message[idx]);
        }
    } else if (logType == "other") {
        if (eventName == "onLoadFinished") {
            for (var idx in message) {
                console.log(idx + ": " + message[idx]);
            }
        }
    } else {
        //shhh
    }
}
function printArgs() {
    for (var i = 0; i < arguments.length; i++) {
        console.log(arguments[i]);
    }
}
var instanceName, logType;
var BlankPage = require("webpage").create();
var prefix = "     ";
BlankPage.onLoadFinished = function () {
    setTimeout(function(){
        BlankPage.render("images/" + this.page.currentTestName + ".png");
        var pass = executeNext(this.page.currentTestName + "Results");
        if (this.page.scriptArray.length && pass) {
            this.page.currentTestName = this.page.scriptArray.shift();
            executeNext(this.page.currentTestName);
        }
    }, 2000);

};
BlankPage.javaScriptAlertSent = function(message){
    logItems(arguments, "alertSent");
};
BlankPage.onInitialized = function () {
    logItems(arguments, "onLoadInitialized");
};
BlankPage.onLoadStarted = function () {
    logItems(arguments, "onLoadStarted");
};
BlankPage.onUrlChanged = function () {
    logItems(arguments, "onUrlChanged");
};
BlankPage.onNavigationRequested = function () {
    logItems(arguments, "onNavigationRequested");
};
BlankPage.onCallback = function (data) {
    logItems(data, "callback");
};
BlankPage.onConsoleMessage = function () {
    //logItems(arguments, "onConsoleMessage");
    for (var idx in arguments) {
        console.log(idx + ": " + arguments[idx]);
    }
};
//gets//
BlankPage.getInfo = function () {
    //not currently used
    console.log("getInfo");
};
BlankPage.getLogging = function () {
    return logType;
};
//sets//
BlankPage.setInstance = function (value) {
    instanceName = value;
};
BlankPage.setLogging = function (value) {
    logType = value
};
BlankPage.init = function () {
    //console.log(JSON.stringify(this));
};
//export//
module.exports = {
    getBlank: function () {
        return BlankPage;
    }
};
