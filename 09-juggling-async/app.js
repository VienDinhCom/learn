var http = require('http');
var bl = require('bl');

var results = [];
var count = 0;

function displayResult() {
    for (var i = 0; i < 3; i++) {
        console.log(results[i]);
    }
}

function getUrls(index) {
    http.get(process.argv[2 + index], function(response) {
        response.pipe(bl(function(err, data) {
            if (err) callback(err);
            results[index] = data.toString();
            count++;
            if (count == 3) displayResult();
        }));
    });
};

for (var i = 0; i < 3; i++) {
    getUrls(i);
}
