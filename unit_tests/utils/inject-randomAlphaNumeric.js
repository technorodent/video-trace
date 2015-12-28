/**
 * Created by Rob on 12/10/2015.
 */
function stringGen(len, strType) {
    var alphaNumString = " ";
    var charset = "";
    switch (strType) {
        case "alpha":
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            break;
        case "numeric":
            charset = "0123456789";
            break;
        case "symbol":
            charset = "~!@#$%^&*()_+|}{:?><,./[]\"";
            break;
        case "alphaNumeric":
            break;
        case "alphaSymbol":
            break;
        case "numericSymbol":
            break;
        case "symbol":
            break;
    }
    var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < len; i++)
        alphaNumString += charset.charAt(Math.floor(Math.random() * charset.length));
    return alphaNumString;
}
