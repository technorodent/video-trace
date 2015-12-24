/**
 * Created by Rob on 12/23/2015.
 */
String.prototype.toSMPTE = function () {
    var seconds = parseFloat(this, 10);
    var framerate = 30;
    console.log("seconds: " + seconds);
    var f = Math.floor((seconds % 1) * framerate);
    var s = Math.floor(seconds);
    var m = Math.floor(s / 60);
    var h = Math.floor(m / 60);
    m = m % 60;
    s = s % 60;
    //beautify & stringify SMPTE:
    if (h < 10) { h = "0" + h };
    if (m < 10) { m = "0" + m };
    if (s < 10) { s = "0" + s };
    if (f < 10) { f = "0" + f };
    return h + ":" + m + ":" + s + ":" + f;
};
var media_events = {
    "abort": 0,
    "canplay": 0,
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
    "seeking": 0,
    "stalled": 0,
    //"suspend": 0,
    //"timeupdate": 0,
    "volumechange": 0,
    "waiting": 0
};
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
var media_properties = ["error", "src", "currentSrc", "crossOrigin", "networkState", "preload", "buffered", "readyState", "seeking", "currentTime", "duration",
    "paused", "defaultPlaybackRate", "playbackRate", "played", "seekable", "ended", "autoplay", "loop", "mediaGroup", "controller", "controls", "volume",
    "muted", "defaultMuted", "audioTracks", "videoTracks", "textTracks", "width", "height", "videoWidth", "videoHeight", "poster"];
var media_controller_properties = ["readyState", "buffered", "seekable", "duration", "currentTime",
    "paused", "playbackState", "played", "defaultPlaybackRate", "playbackRate", "volume", "muted"];
var media_props, media_controller_props, webm;
init = function () {
    document._video = document.getElementById("bombbomb-1");
    //(null, 0, "", false, {}, [])
    document._hasController = (document._video.controller) || false;
    document._controller = document._video.controller;
    media_props = [media_properties.length];
    init_events("events", media_events, false);
    //setInterval(update_properties, 250);
};
eventLogger = function (evt) {
    var items = {
        oEvt: {name: evt.type, currentTime: evt.target.currentTime, SMPTE: evt.target.currentTime.toString().toSMPTE()}
    };
    console.table(items);
};
init_events = function (id, targetEvents, isController) {
    var useCapture = isController ? true : false;
    for (var idx in targetEvents) {
        if (isController) {
            document._controller.addEventListener(idx, eventLogger, false);
        } else {
            document._video.addEventListener(idx, eventLogger, false);
        }
    }
};
document.addEventListener("DOMContentLoaded", init, false);

