const parser = require('./parser0818')
const json = parser.parse("((a)',z)'")

console.dir(JSON.stringify(json))