var fs = require('fs');
var path = require('path');

module.exports = function(argv, callback) {
    fs.readdir(argv[2], function(err, files) {
        if (err) callback(err);
        var result = files.filter(function(file) {
            return path.extname(file) === '.' + argv[3];
        });
        callback(null, result);
    });
};
