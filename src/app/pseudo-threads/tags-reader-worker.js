import { RSA_X931_PADDING } from "constants";
const NodeID3 = require('node-id3');
var readline = require('readline');

var reader = readline.createInterfface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

reader.on('line', function(path){
    console.log(reader.NodeID3.read(path));
})