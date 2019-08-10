const parser = require('./parser')
const parseString = require('xml2js').parseString;
const xml = parser.parse("(a,_s)")

parseString(xml, function (err, result) {
    console.log(result);
});