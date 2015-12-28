/**
 * Created by Rob on 12/10/2015.
 * tdl: Test Decision List
 */
var sys = require("system");
var pageFactory = require('./pageFactory.js'),
    sPre = "   --  ",
    completedScripts = [],
    lastScript = "launch";
var initialLogin = Object.create(pageFactory.getBlank(), {
    scriptArray: {writable: true, configurable: true, value: []},
    url: {writable: true, configurable: true, value: 'http://mymoviedb.works/'},
    user: {writable: true, configurable: true, value: 'rw@wheatbridge.com'},
    password: {writable: true, configurable: true, value: '5FZ2Z8QIkA7UTZ4BYkoC+GsReLf569mSKD'}
});
initialLogin.setInstance("initialLogin");
initialLogin.setLogging("production");
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
        console.log("Delete-Insert Tests Complete");
        initialLogin.render("images/complete.png");

    }
};
initialLogin.scriptArray = ["inject-login.js","inject-deleteMovies.js","inject-addMovies.js"];
initialLogin.open('http://mymoviedb.works/');
