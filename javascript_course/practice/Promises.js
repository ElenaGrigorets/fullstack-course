// to create a Promise instance use constructor:
let p = new Promise(function (resolve, reject) {
    //...
});
// Promise can only have one of two possible resolution outcomes:
// fulfilled or rejected
// Promises can only be resolved (fulfillment or rejection) once.


// callback-reliant function:
function ajax(url, cb) {
    // make request, eventually call `cb(..)`
}
// ..
ajax("http://some.url.1", function handler(err, contents) {
    if (err) {
        // handle ajax error
    } else {
        // handle `contents` success
    }
});
// You can convert it to:
function ajax(url) {
    return new Promise(function pr(resolve, reject) {
        // make request, eventually call
        // either `resolve(..)` or `reject(..)`
    });
}
// ..
ajax("http://some.url.1")
    .then(
        function fulfilled(contents) {
            // handle `contents` success
        },
        function rejected(reason) {
            // handle ajax error reason
        }
    );
// Promises have a then(..) method which accepts one or two callback functions. The
// first function (if present) is treated as the handler to call if the promise is fulfilled suc‐
// cessfully. The second function (if present) is treated as the handler to call if the
// promise is rejected explicitly, or if any error/exception is caught during resolution.
// for then(null,handleRejection) there is shorthand: catch(handleRejection)


// Thenables
// any object (or function) with a then(..) function it is assumed 
// to be a thenable.
var th = {
    then: function thener( fulfilled ) {
        // call `fulfilled(..)` once every 100ms forever
        setInterval( fulfilled, 100 );
    }
};

// Promise API
// essentially identical behavior:
var pr1 = Promise.resolve( 42 );
var pr2 = new Promise( function pr(resolve){
resolve( 42 );
} );

// Promise.all([ .. ]) 
// accepts an array of one or more values (e.g., immediate values, promises, thenables).
// It returns a promise back which will be fulfilled if all the value fulfill, 
// or reject immediately once the first of any of them rejects.
let p1 = Promise.resolve(42);
let p2 = new Promise( function pr(resolve){
    setTimeout( function(){
        resolve(43);
    }, 100 );
});
let v3 = 44;
let p4 = new Promise( function pr(resolve, reject){
    setTimeout( function(){
        reject("Oops");
    }, 10 );
});
// let's consider how Promise.all([..]) works with combinations of those values:
Promise.all([p1, p2, v3])
.then( 
    function fulfilled(vals){
        console.log(vals);
    }
);
Promise.all([p1, p2, v3, p4])
.then(
    function fulfilled(vals){
        //never gets here
    },
    function rejected(reason){
        console.log(reason);
    }
);

// While Promise.all([ .. ]) waits for all fulfillments (or the first rejection),
// Promise.race([ .. ]) waits only for either the first fulfillment or rejection.
// Consider:
Promise.race([p1, p2, v3])
.then(
    function fulfilled(val){
        console.log(val);  // 42
    }
);
Promise.race([p1, p2, v3, p4])
.then(
    function fulfilled(val){
        // never gets here
    },
    function rejected(reason){
        console.log(reason);   // Oops
    }
);