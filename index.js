var requireDirectory = require("./require-directory");
var path = require("path");

var deepAssign = require("deep-assign");

var env = process.env.NODE_ENV || "development";

function config(options) {
    var {basePath = path.join(process.cwd(), 'config'), environment = env, common = 'common'} = options || {};
    var base = {};
    if (common) {
        base = requireDirectory(path.join(basePath, common)) || {};
    }
    var envDependent = requireDirectory(path.join(basePath, environment)) || {};
    return deepAssign(base, envDependent);
}

module.exports = config;