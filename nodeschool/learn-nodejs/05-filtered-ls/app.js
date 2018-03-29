var fs = require('fs');

fs.readdir(process.argv[2], function(err, files) {
    files.forEach(function(file) {
        var ext = file.split('.')[1];
        if (ext === process.argv[3]) console.log(file);
    });
});
