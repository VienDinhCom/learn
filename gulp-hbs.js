const { Transform } = require('stream');
const Handlebars = require('handlebars');
var layouts = require('handlebars-layouts');
var fs = require('fs');

module.exports = function() {
  var transformStream = new Transform({ objectMode: true });

  transformStream._transform = function( file, encoding, callback ) {
    
    var contents = file.contents.toString();

    Handlebars.registerHelper(layouts(Handlebars));

    Handlebars.registerPartial('index', fs.readFileSync('src/index.hbs', 'utf8'));

    var template = Handlebars.compile(contents);

    var result = template();

    file.contents = new Buffer(result);

    callback(null, file);
    
  };

  return transformStream;
};
