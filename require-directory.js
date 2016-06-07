var path = require("path");
var fs = require("fs");

function requireDirectory(inputPath) {
    if (!fs.existsSync(inputPath)) {
        return {};
    }
    var obj = {};
    var stat = fs.statSync(inputPath);
    if (stat.isDirectory()) {
        fs.readdirSync(inputPath).forEach(function (file) {
            var newPath = path.join(inputPath, file);
            var extension = path.extname(newPath);
            var name = path.basename(newPath, extension);
            obj[name] = requireDirectory(path.join(inputPath, file));
        });
    } else {
        var extension = path.extname(inputPath).toLowerCase();
        if (extension == ".json" || extension == ".js") {
            obj = require(inputPath);
        }
    }
    return obj;
}

module.exports = requireDirectory;