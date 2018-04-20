var app = require('./module.js');

app(process.argv, function(err, result) {
    if (err) throw err;
    result.forEach(function(file) {
        console.log(file);
    });
});
