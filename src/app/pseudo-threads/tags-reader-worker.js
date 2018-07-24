const NodeID3 = require('node-id3');
var readline = require('readline');
console.log("hello, it's me")


function setSubscription() {
    process.on('message', function (path) {
        var response = NodeID3.read(path);
        process.send(response);
    })

}

setSubscription();
