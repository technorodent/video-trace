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
function printArgs() {
    for (var i = 0; i < arguments.length; i++) {
        console.log(arguments[i]);
    }
}
var instanceName, logType;
var BlankPage = require("webpage").create();
var prefix = "     ";
//the following is cludgy, see Reference A above.
BlankPage.onInitialized = function () {
    if (logType == "verbose") {
        console.log(instanceName + ".onInitialized");
        console.log(prefix + JSON.stringify(arguments));
    } else if (logType == "debug") {
        //shhh
    } else if (logType == "production") {
        //shhh
    }
};
BlankPage.onLoadStarted = function () {
    if (logType == "verbose") {
        console.log(instanceName + ".onLoadStarted");
        console.log(prefix + JSON.stringify(arguments));
    } else if (logType == "debug") {
        //shhh
    } else if (logType == "production") {
        //shhh
    }
};
BlankPage.onLoadFinished = function () {
    if (logType == "verbose") {
        console.log(instanceName + ".onLoadFinished");
        console.log(prefix + JSON.stringify(arguments));
    } else if (logType == "debug") {
        console.log(instanceName + ".onLoadFinished");
    } else if (logType == "production") {
        //shhh
    }
};
BlankPage.onUrlChanged = function () {
    if (logType == "verbose") {
        console.log(instanceName + ".onUrlChanged");
        console.log(prefix + JSON.stringify(arguments));
        //printArgs.apply(this, arguments);
    } else if (logType == "debug") {
        console.log(instanceName + ".onUrlChanged");
    } else if (logType == "production") {
        //shhh
    }
};
BlankPage.onNavigationRequested = function () {
    if (logType == "verbose") {
        console.log(instanceName + ".onNavigationRequested");
        console.log(prefix + JSON.stringify(arguments));
    } else if (logType == "debug") {
        //shhh
    } else if (logType == "production") {
        //shhh
    }
};
BlankPage.onCallback = function (data) {
    //console.log('CALLBACK: ' + data.compare1);
    if (data.snapshot) {
        BlankPage.render('images/' + data.snapshot + '.png');
    }
    if (data.newDOM) {
        //console.log("trying");
        //console.log("typeof: " + typeof(diff));
        //console.log (data.rootDOM);
console.log(diff( data.rootDOM, data.newDOM));
    }
};
BlankPage.onConsoleMessage = function () {
    if (logType == "verbose") {
        console.log(arguments[0]);
    } else if (logType == "debug") {
        console.log(arguments[0]);
    } else if (logType == "production") {
        console.log(arguments[0]);
    }
};
//gets//
BlankPage.getInfo = function () {
    //not currently used
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
