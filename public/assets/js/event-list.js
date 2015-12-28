/**
 * Created by Rob on 12/23/2015.
 */
var gridJSON = [];
var lastSeq = "";
var newSeq = "index";
var pageCounter = 0;
var totalTime = 0;
var row_idx = -1;
var sort_id = 999;
var gridXML;
var treegridXML;
window.onbeforeunload = shipAtExit;
function shipAtExit() {
    sendInsert(JSON.stringify(gridJSON), "at-close");
    window.onbeforeunload = null;
};
String.prototype.toSMPTE = function () {
    var seconds = parseFloat(this, 10);
    var framerate = 30;
    //console.log("seconds: " + seconds);
    var f = Math.floor((seconds % 1) * framerate);
    var s = Math.floor(seconds);
    var m = Math.floor(s / 60);
    var h = Math.floor(m / 60);
    m = m % 60;
    s = s % 60;
    //beautify & stringify SMPTE:
    if (h < 10) {
        h = "0" + h
    }
    if (m < 10) {
        m = "0" + m
    }
    if (s < 10) {
        s = "0" + s
    }
    if (f < 10) {
        f = "0" + f
    }
    return h + ":" + m + ":" + s + ":" + f;
};
/*
 var trace_obj = {
 timeOnPage: 0,
 videoEvents:[],
 pageEvents:[]
 };
 */
var media_events = {
    "abort": 0,
    //"canplay": 0,
    //"canplaythrough": 0,
    "durationchange": 0,
    "emptied": 0,
    "ended": 0,
    "error": 0,
    "loadeddata": 0,
    "loadedmetadata": 0,
    "loadstart": 0,
    "pause": 0,
    "play": 0,
    "playing": 0,
    //"progress": 0,
    "seeked": 0,
    //"seeking": 0,
    "stalled": 0,
    //"suspend": 0,
    //"timeupdate": 0,
    "volumechange": 0,
    "waiting": 0
};
/*
 var media_controller_events =
 {
 "emptied": 0,
 "loadedmetadata": 0,
 "loadeddata": 0,
 "canplay": 0,
 "canplaythrough": 0,
 "playing": 0,
 "ended": 0,
 "waiting": 0,
 "durationchange": 0,
 "timeupdate": 0,
 "play": 0,
 "pause": 0,
 "ratechange": 0,
 "volumechange": 0
 };
 */
var media_properties = ["error", "src", "currentSrc", "crossOrigin", "networkState", "preload", "buffered", "readyState", "seeking", "currentTime", "duration",
    "paused", "defaultPlaybackRate", "playbackRate", "played", "seekable", "ended", "autoplay", "loop", "mediaGroup", "controller", "controls", "volume",
    "muted", "defaultMuted", "audioTracks", "videoTracks", "textTracks", "width", "height", "videoWidth", "videoHeight", "poster"];
/*var media_controller_properties = ["readyState", "buffered", "seekable", "duration", "currentTime","paused", "playbackState", "played", "defaultPlaybackRate", "playbackRate", "volume", "muted"];*/
/*var media_props, media_controller_props;*/
TimeMe.setIdleDurationInSeconds(30);
TimeMe.setCurrentPageName("index");
TimeMe.initialize();
init = function () {
    TimeMe.startTimer();
    //setInterval(function(){
    var timeOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
    console.log(timeOnPage.toFixed(4));
    //}, 25);
    document._video = document.getElementById("bombbomb-1");
    //(null, 0, "", false, {}, [])
    document._hasController = (document._video.controller) || false;
    document._controller = document._video.controller;
    media_props = [media_properties.length];
    init_treegrid();
    init_gridView();
    init_events("events", media_events, false);
    $("#gridbox").height($("#mCSB_1").height());
    $("#gridInsert").height($("#mCSB_2").height());
};
eventLogger = function (evt) {
    pageCounter++;
    lastSeq = newSeq;
    newSeq = evt.type;
    var sequenceLength = TimeMe.getTimeOnCurrentPageInSeconds();
    TimeMe.setCurrentPageName(newSeq + "_" + pageCounter);
    TimeMe.startTimer();
    totalTime += parseFloat((sequenceLength).toFixed(3));
    //because of because:
    var playheadSec = evt.target.currentTime.toFixed(3);
    row_idx++;
    gridJSON.push({
        idx: row_idx,
        lastSeq: lastSeq,
        name: newSeq,
        sequenceLength: sequenceLength,
        pageTime: totalTime.toFixed(3),
        playheadSeconds: playheadSec,
        playheadSMPTE: evt.target.currentTime.toString().toSMPTE()
    });
    var gridItem = [row_idx, lastSeq, newSeq, sequenceLength, totalTime.toFixed(3), playheadSec, evt.target.currentTime.toString().toSMPTE()];
    historyGrid.addRow(row_idx, gridItem);
};
init_events = function (id, targetEvents, isController) {
    for (var idx in targetEvents) {
        if (isController) {
            document._controller.addEventListener(idx, eventLogger, false);
        } else {
            document._video.addEventListener(idx, eventLogger, false);
        }
    }
};
collect_userInfo = function () {
    UserInfo.getInfo(function (data) {
        console.dir(JSON.stringify(data));
    }, function (err) {
        //do nothing right now...
    });
    //setInterval(update_properties, 250);
};
sendInsert = function (data, url) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status != 200) {
                console.log("error")
            } else {
                console.log("success");
            }
        }
    };
    //because setting up xml-stream is a hassle for this demo:
    console.dir(data);
    xmlhttp.send(data);
};
document.addEventListener("DOMContentLoaded", init, false);

