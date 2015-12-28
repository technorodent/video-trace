/**
 * Created by Rob on 12/10/2015.
 * inject_deleteMovies
 */
var elem;
var removalArray = [];
var sPre = "     -- ";
var sPreFail = "     xx ";
var status1 = "  " + sPreFail + "status==0 for a failed XmlHttpRequest ";
var status2 = "            1. Illegal cross origin request (see CORS)\n";
status2 += "            2. Firewall block or filtering\n";
status2 += "            3. The request itself was cancelled in code\n";
status2 += "            4. An installed browser extension is mucking things up\n";
sendDelete = function (restUrl, itemTitle) {
    var http = new XMLHttpRequest();
    var params = "_method=DELETE";
    http.open("POST", restUrl, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.deleteAddress = restUrl;
    http.itemTitle = itemTitle;
    http.onreadystatechange = function () {
        if (http.readyState == 4) {
            if (http.status != 200) {
                if (http.status == 0) {
                    console.log(status1 + "  " + http.deleteAddress + "  " + http.itemTitle);
                    console.log(status2);
                } else {
                    console.log("  " + sPre + "error status: " + http.status + "  " + http.responseText);
                }
            } else {
                //console.assert(http.status != 200, "http.status: " + http.status);
                console.log("  " + sPre + "completed delete: " + http.deleteAddress + "  " + http.itemTitle);
                var idx = removalArray.indexOf(http.deleteAddress);
                if (idx > -1) {
                    removalArray.splice(idx, 1);
                }
            }
            if (!removalArray.length) {
                console.log("Task Complete: Reloading!");
                location.reload();
            }
        }
    };
    http.send(params);
};
var oContainer = document.getElementById("container");
var divList = oContainer.children[1];
if (!divList.children.length) {
    console.log("Reload: Nothing to delete!");
} else if (divList.children[0].nodeName == "LI") {
    elem = divList.getElementsByTagName('LI');
    console.log(sPre + divList.children.length + " Items to delete.");
    for (var i = 0; i < elem.length; i++) {
        var text = ('innerText' in elem[i]) ? 'innerText' : 'textContent';
        var content = elem[i][text];
        var tmpTitle = content.substring(0, 25) + "...";
        removalArray.push(elem[i].children[1].action);
        sendDelete(elem[i].children[1].action, tmpTitle);
        console.log("  " + sPre + "send xmlHTTP delete for " + elem[i].children[1].action + " ... " + tmpTitle);
    }
}
if (!removalArray.length) {
    console.log("Reload: Delete Page Empty");
    location.reload();
}