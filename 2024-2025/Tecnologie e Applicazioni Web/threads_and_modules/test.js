
const mymod = require('./mymod.js')

// Shows the non-blocking nature of many node functions (like setImmediate)

console.log("Hello");

setImmediate( function(){
    console.log("World")
} );


console.log("Bye!")


// Shows that node is single threaded:
// A slow cpu-bound operation will block the event queue
//

let start_time = new Date();

console.log("Invoking first function after 1 sec");
setTimeout( function() {
    console.log( "First function started after " + (new Date() - start_time)/1000 + " secs." );

    mymod.slowfunction();
    //mymod.fastfunction();

    console.log("First function completed");
}, 1000);


console.log("Invoking second function after 1 sec");
setTimeout( function() {
    console.log( "Second function started after " + (new Date() - start_time)/1000 + " secs." );
    console.log("Second function completed");
}, 1000);

console.log("test.js script completed");