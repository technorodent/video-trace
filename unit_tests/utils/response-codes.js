/**
 * Created by Rob on 12/10/2015.
 */
/*

 1xx: Informational - Request received, continuing process
 2xx: Success - The action was successfully received, understood, and accepted
 3xx: Redirection - Further action must be taken in order to complete the request
 4xx: Client Error - The request contains bad syntax or cannot be fulfilled
 5xx: Server Error - The server failed to fulfill an apparently valid request
 */


var responseCodes = {
    "100": {
        "Description":"Continue",
        "Reference":"[RFC7231, Section 6.2.1]"
    },
    "101": {
        "Description":"Switching Protocols",
        "Reference":"[RFC7231, Section 6.2.2]"
    },
    "102": {
        "Description":"Processing",
        "Reference":"[RFC2518]"
    },
    "200": {
        "Description":"OK",
        "Reference":"[RFC7231, Section 6.3.1]"
    },
    "201": {
        "Description":"Created",
        "Reference":"[RFC7231, Section 6.3.2]"
    },
    "202": {
        "Description":"Accepted",
        "Reference":"[RFC7231, Section 6.3.3]"
    },
    "203": {
        "Description":"Non-Authoritative Information",
        "Reference":"[RFC7231, Section 6.3.4]"
    },
    "204": {
        "Description":"No Content",
        "Reference":"[RFC7231, Section 6.3.5]"
    },
    "205": {
        "Description":"Reset Content",
        "Reference":"[RFC7231, Section 6.3.6]"
    },
    "206": {
        "Description":"Partial Content",
        "Reference":"[RFC7233, Section 4.1]"
    },
    "207": {
        "Description":"Multi-Status",
        "Reference":"[RFC4918]"
    },
    "208": {
        "Description":"Already Reported",
        "Reference":"[RFC5842]"
    },
    "209-225": {
        "Description":"Unassigned",
        "Reference":""
    },
    "226": {
        "Description":"IM Used",
        "Reference":"[RFC3229]"
    },
    "300": {
        "Description":"Multiple Choices",
        "Reference":"[RFC7231, Section 6.4.1]"
    },
    "301": {
        "Description":"Moved Permanently",
        "Reference":"[RFC7231, Section 6.4.2]"
    },
    "302": {
        "Description":"Found",
        "Reference":"[RFC7231, Section 6.4.3]"
    },
    "303": {
        "Description":"See Other",
        "Reference":"[RFC7231, Section 6.4.4]"
    },
    "304": {
        "Description":"Not Modified",
        "Reference":"[RFC7232, Section 4.1]"
    },
    "305": {
        "Description":"Use Proxy",
        "Reference":"[RFC7231, Section 6.4.5]"
    },
    "306": {
        "Description":"(Unused)",
        "Reference":"[RFC7231, Section 6.4.6]"
    },
    "307": {
        "Description":"Temporary Redirect",
        "Reference":"[RFC7231, Section 6.4.7]"
    },
    "308": {
        "Description":"Permanent Redirect",
        "Reference":"[RFC7538]"
    },
    "309-399": {
        "Description":"Unassigned",
        "Reference":""
    },
    "400": {
        "Description":"Bad Request",
        "Reference":"[RFC7231, Section 6.5.1]"
    },
    "401": {
        "Description":"Unauthorized",
        "Reference":"[RFC7235, Section 3.1]"
    },
    "402": {
        "Description":"Payment Required",
        "Reference":"[RFC7231, Section 6.5.2]"
    },
    "403": {
        "Description":"Forbidden",
        "Reference":"[RFC7231, Section 6.5.3]"
    },
    "404": {
        "Description":"Not Found",
        "Reference":"[RFC7231, Section 6.5.4]"
    },
    "405": {
        "Description":"Method Not Allowed",
        "Reference":"[RFC7231, Section 6.5.5]"
    },
    "406": {
        "Description":"Not Acceptable",
        "Reference":"[RFC7231, Section 6.5.6]"
    },
    "407": {
        "Description":"Proxy Authentication Required",
        "Reference":"[RFC7235, Section 3.2]"
    },
    "408": {
        "Description":"Request Timeout",
        "Reference":"[RFC7231, Section 6.5.7]"
    },
    "409": {
        "Description":"Conflict",
        "Reference":"[RFC7231, Section 6.5.8]"
    },
    "410": {
        "Description":"Gone",
        "Reference":"[RFC7231, Section 6.5.9]"
    },
    "411": {
        "Description":"Length Required",
        "Reference":"[RFC7231, Section 6.5.10]"
    },
    "412": {
        "Description":"Precondition Failed",
        "Reference":"[RFC7232, Section 4.2]"
    },
    "413": {
        "Description":"Payload Too Large",
        "Reference":"[RFC7231, Section 6.5.11]"
    },
    "414": {
        "Description":"URI Too Long",
        "Reference":"[RFC7231, Section 6.5.12]"
    },
    "415": {
        "Description":"Unsupported Media Type",
        "Reference":"[RFC7231, Section 6.5.13][RFC7694, Section 3]"
    },
    "416": {
        "Description":"Range Not Satisfiable",
        "Reference":"[RFC7233, Section 4.4]"
    },
    "417": {
        "Description":"Expectation Failed",
        "Reference":"[RFC7231, Section 6.5.14]"
    },
    "418-420": {
        "Description":"Unassigned",
        "Reference":""
    },
    "421": {
        "Description":"Misdirected Request",
        "Reference":"[RFC7540, Section 9.1.2]"
    },
    "422": {
        "Description":"Unprocessable Entity",
        "Reference":"[RFC4918]"
    },
    "423": {
        "Description":"Locked",
        "Reference":"[RFC4918]"
    },
    "424": {
        "Description":"Failed Dependency",
        "Reference":"[RFC4918]"
    },
    "425": {
        "Description":"Unassigned",
        "Reference":""
    },
    "426": {
        "Description":"Upgrade Required",
        "Reference":"[RFC7231, Section 6.5.15]"
    },
    "427": {
        "Description":"Unassigned",
        "Reference":""
    },
    "428": {
        "Description":"Precondition Required",
        "Reference":"[RFC6585]"
    },
    "429": {
        "Description":"Too Many Requests",
        "Reference":"[RFC6585]"
    },
    "430": {
        "Description":"Unassigned",
        "Reference":""
    },
    "431": {
        "Description":"Request Header Fields Too Large",
        "Reference":"[RFC6585]"
    },
    "432-499": {
        "Description":"Unassigned",
        "Reference":""
    },
    "500": {
        "Description":"Internal Server Error",
        "Reference":"[RFC7231, Section 6.6.1]"
    },
    "501": {
        "Description":"Not Implemented",
        "Reference":"[RFC7231, Section 6.6.2]"
    },
    "502": {
        "Description":"Bad Gateway",
        "Reference":"[RFC7231, Section 6.6.3]"
    },
    "503": {
        "Description":"Service Unavailable",
        "Reference":"[RFC7231, Section 6.6.4]"
    },
    "504": {
        "Description":"Gateway Timeout",
        "Reference":"[RFC7231, Section 6.6.5]"
    },
    "505": {
        "Description":"HTTP Version Not Supported",
        "Reference":"[RFC7231, Section 6.6.6]"
    },
    "506": {
        "Description":"Variant Also Negotiates",
        "Reference":"[RFC2295]"
    },
    "507": {
        "Description":"Insufficient Storage",
        "Reference":"[RFC4918]"
    },
    "508": {
        "Description":"Loop Detected",
        "Reference":"[RFC5842]"
    },
    "509": {
        "Description":"Unassigned",
        "Reference":""
    },
    "510": {
        "Description":"Not Extended",
        "Reference":"[RFC2774]"
    },
    "511": {
        "Description":"Network Authentication Required",
        "Reference":"[RFC6585]"
    },
    "exceptions": {
        "512-599": {
            "Description":"Unassigned",
            "Reference":""
        },
        "103-199": {
            "Description":"Unassigned",
            "Reference":""
        },
        "227-299": {
            "Description":"Unassigned",
            "Reference":""
        }
    }
};