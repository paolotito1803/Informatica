
module.exports.slowfunction = function() {
    console.log("Performing a cpu-intensive operation");
    for( var i=0; i<3000000000; ++i ) {
    }
}

module.exports.fastfunction = function() {
    console.log("Performing a very fast operation");
}
