/**
 * Created by Rob on 12/10/2015.
 * tdl: Test Decision List
 */

var sys = require("system");
//var pleaseHold = require('../utils/waitFor.js');
var pageFactory = require('./pageFactory.js'),
    sPre = "   --  ",
    completedScripts = [],
    lastScript = "launch";
var initialLogin = Object.create(pageFactory.getBlank(), {
    scriptArray: {writable: true, configurable: true, value: []},
    url: {writable: true, configurable: true, value: 'http://mymoviedb.works/'},
    user: {writable: true, configurable: true, value: 'rw@wheatbridge.com'},
    password: {writable: true, configurable: true, value: '5FZ2Z8QIkA7UTZ4BYkoC+GsReLf569mSKD'}
    // data properties (assigned using getters and setters)
});

initialLogin.setInstance("initialLogin");
initialLogin.setLogging("production");
console.log(initialLogin.getLogging());

initialLogin.onLoadFinished = function () {
    var nextScript = initialLogin.scriptArray.shift();
    if (nextScript) {
        console.log("Completed " + lastScript);
        completedScripts.push(lastScript);
        console.log(sPre + "injecting " + nextScript);
        initialLogin.render("images/before-" + nextScript + ".png");
        initialLogin.injectJs(nextScript);
        lastScript = nextScript;
    } else {
        console.log("Tests Complete");
        initialLogin.render("images/complete.png")
    }
};
initialLogin.scriptArray = [
    "inject-login.js",
    "inject-deleteMovies.js",
    "inject-compareMovies.js"
];
initialLogin.open('http://mymoviedb.works/');


