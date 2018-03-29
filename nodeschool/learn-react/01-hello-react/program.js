var express = require('express');
var app = express();

app.set('port', (process.argv[2] || 3000));
app.set('view engine', 'jsx');
app.set('views', __dirname + '/views');
app.engine('jsx', require('express-react-views').createEngine({ transfromViews: false }));

require('babel/register')({
    ignore: false
});

app.use('/', function(reg, res) {
    res.render('index', '');
});

app.listen(app.get('port'), function() {

});
