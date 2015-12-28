/**
 * Created by Rob on 12/24/2015.
 */
var historyGrid, treegrid;
init_treegrid = function () {
    var im0 = "doc.gif";
    var im1 = "folderOpen.gif";
    var im2 = "folderClosed.gif";
    treeGrid = new dhtmlXGridObject('gridbox');
    treeGrid.enableTreeGridLines(true);
    treeGrid.setImagePath("./assets/css/imgs/");
    treeGrid.loadXML("assets/other/treegrid.xml");
    treeGrid.init();
    treeGrid.setSkin("dhx_skyblue");
    UserInfo.getInfo(function (data) {
        function populateTree(obj, nLevels, sName, parentName) {
            for (idx in obj) {
                if (typeof (obj[idx]) == 'object') {
                    populateTree(obj[idx], nLevels, idx, idx + '-');
                } else {
                    key = parentName + idx;
                    treeGrid.cellById(key, 1).setValue(obj[idx]);
                }
            }
        }
        populateTree(data, 0, 'root', '');
        sendInsert(JSON.stringify(data), "user-data/");
        var queryParams = $.getQueryParameters();
        populateTree(queryParams[0], 0, 'root', '');
        sendInsert(JSON.stringify(queryParams), "query-params/");
        populateClientInfo(treeGrid);
        /*
        if (history.pushState) {

            history.replaceState(null, null, 'welcome-to-test');
        }
        else {
            location.hash = '#welcome-to-test';
        }
        */
        //see: http://stackoverflow.com/quvar treeGridData = treeGrid.serializeToCSV();

    }, function (err) {
        //spontaneously combust &
        // get a job @ Walgreens
        // selling candy to children
        // with bad teeth
    });
};
populateClientInfo = function(treeGrid){
    var client = new ClientJS();
    var record = [];
    for (var idx in client){
        var tmp = client[idx]();
        try {
            key = idx.toString();
            treeGrid.cellById(key, 1).setValue(tmp);
            var tmpInsert = {};
            tmpInsert[idx] = tmp;
            record.push(tmpInsert);
        }catch(err){
            // ignore for this test
            // not all data being handled.
            // more stuff if production
        }
    }
     sendInsert(JSON.stringify(record), "client-info/");
};
init_gridView = function(){
    historyGrid = new dhtmlXGridObject('gridInsert');
    historyGrid.setImagePath("./assets/css/imgs/");
    historyGrid.setHeader("id, lastSeq,curSeq,seqLen,pgTime,playPos,playSMPTE");
    historyGrid.setInitWidths("25,*,70,70,70,70,70,70");
    historyGrid.enableAutoWidth(true);
    historyGrid.setColAlign("left,left,left,left,left,left,left");
    historyGrid.setColTypes("ron,txt,txt,txt,txt,txt,txt");
    historyGrid.setNumberFormat("0,000.00",".");
    historyGrid.enableMultiselect(true);
    historyGrid.init();
};
getQueryVariable = function (varID) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == varID) {
            return pair[1];
        }
    }
    return (false);
};

