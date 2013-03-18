var UglifyJS = require("uglify-js"),
    fs = require('fs'),
    watch = require('stoptime')();
    
fs.writeFileSync('sf.min.js', fs.readFileSync('./sf.h', 'utf8') + UglifyJS.minify('sf.js').code, 'utf8');
console.log('built switch-factory in ' + watch.elapsed() + 'ms');