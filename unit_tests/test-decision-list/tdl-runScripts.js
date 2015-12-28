/**
 * Created by Rob on 12/23/2015.
 * tdl: Test Decision List
 */
//insert your unit testing address here:
var unitTestAddress = "http://10.0.0.6:3000/"
var localStorage = require('localStorage');
localStorage.clear();
var sys = require("system");
var pageFactory = require('./pageFactory-a.js'),
    sPre = "   --  ",
    completedScripts = [],
    lastScript = "launch";
var page = Object.create(pageFactory.getBlank(), {
    scriptArray: {writable: true, configurable: true, value: ["login"]},
    url: {writable: true, configurable: true, value: unitTestAddress},
    currentTestName: {writable: true, configurable: true, value: 'notAssigned'},
    user: {writable: true, configurable: true, value: 'rw@wheatbridge.com'},
    password: {writable: true, configurable: true, value: '5FZ2Z8QIkA7UTZ4BYkoC+GsReLf569mSKD'}
});
page.setInstance("page");
page.setLogging("other");
page.scriptArray = ["login", "end"];
/*
 page.onLoadFinished = function () {
 var nextScript = page.scriptArray.shift();
 if (nextScript) {
 console.log("Completed " + lastScript);
 completedScripts.push(lastScript);
 console.log(sPre + "injecting " + nextScript);
 page.render("images/before-" + nextScript + ".png");
 page.injectJs(nextScript);
 lastScript = nextScript;
 } else {
 console.log("Delete-Insert Tests Complete");
 page.render("images/complete.png");
 }
 };
 */
//page.getInfo();
//page.scriptArray = ["inject-login.js"]
//page.open(unitTestAddress);
//phantom.exit();

page.viewportSize = {width: 800, height: 600};
page.currentTestName = "init";
page.open(unitTestAddress, function (status) {
    if (status !== 'success') {
        console.log('Unable to load the address!');
        phantom.exit();
    }
});
executeNext = function (script) {
    console.log("execute: " + script);
    return eval(script + "()");
};
initResults = function () {
    console.log("init results");
    localStorage.setItem(page.currentTestName, JSON.stringify(true));
    return true;
};
login = function () {
    page.evaluate(function () {
        document.getElementById('password').value = "5FZ2Z8QIkA7UTZ4BYkoC+GsReLf569mSKD";
        document.getElementById('email').value = "rw@wheatbridge.com";
        var submitMe = document.querySelector('[type="submit"]');
        submitMe.click();
    });
};
loginResults = function () {
    var result = page.evaluate(function () {
        var el = document.documentElement.innerHTML;
        bResult = el.indexOf("Bad credentials") > -1;
        return !bResult;
    });
    localStorage.setItem(page.currentTestName, JSON.stringify(result));
    console.log(page.currentTestName + ": " + result);
    return result;
};
endResults = function () {

};
end = function () {
    console.log("poll local storage");
    var sPre = "      ";
    for (var idx in localStorage){
        console.log(sPre + idx + ": " + localStorage[idx]);
    }
    console.log("tests complete");
    phantom.exit();
};