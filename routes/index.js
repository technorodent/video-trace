var express = require('express');
var parseString = require('xml2js').parseString;
var querystring = require('querystring');
var bodyParser = require('body-parser')
var router = express.Router();
//note: for purposes of this demo:
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';
function encrypt(text){
    var cipher = crypto.createCipher(algorithm,password)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
}
function decrypt(text){
    var decipher = crypto.createDecipher(algorithm,password)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
}
//var oddshotHash = encrypt("section=31&conversation_id=1397&source=email")
// outputs 178bd784287e762d6318a20efded0a9ea15c85a0d9e8d35b7dad0827cdd02e258d5785d1908dcb4ddc8e282a
//console.log(oddshotHash);
//console.log(decrypt(oddshotHash));

//queryString for test: ?video=178bd784287e762d6318a20efded0a9ea15c85a0d9e8d35b7dad0827cdd02e258d5785d1908dcb4ddc8e282a
router.get('/', function (req, res, next) {
    res.sendfile('./public/enjoin.html');
    //for sending the query hash
    //var tmp = req.query;
    //var qString = decrypt(tmp.video);
    //console.log("session id: " + req.sessionID);
    //res.redirect(url.parse(req.url).pathname);
    //res.redirect(url.parse(req.url).pathname);
    //res.redirect('enjoin.html');
});
router.post('/at-close', function (req, res, next){
    var jsonObj = req.body;
    console.log("at-close");
    console.dir(JSON.stringify(jsonObj));
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});
router.post('/client-info', function (req, res, next){
    var jsonObj = req.body;
    //console.dir(JSON.stringify(jsonObj));
    console.log("client-info");
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});
router.post('/query-params', function (req, res, next){
    var jsonObj = req.body;
    //console.dir(JSON.stringify(jsonObj));
    console.log("query-params");
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});
router.post('/user-data', function (req, res, next){
    var jsonObj = req.body;
    console.log("user-data");
    //console.dir(JSON.stringify(jsonObj));
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});
router.post('/user-data', function (req, res, next){
    var jsonObj = req.body;
    console.dir(JSON.stringify(jsonObj));
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});
router.post('/supdate', function (req, res, next){
    //console.log(req.body.sending);
    parseString(req.body.sending, function (err, result) {
        //console.dir(JSON.stringify(result));
        console.dir(result.root.treegrid);
    });
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});
module.exports = router;
//http://10.0.0.6:3000/?section=31&conversation_id=1397&source=email
//http://10.0.0.6:3000/?video=178bd784287e762d6318a20efded0a9ea15c85a0d9e8d35b7dad0827cdd02e258d5785d1908dcb4ddc8e282a