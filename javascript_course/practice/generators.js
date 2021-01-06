// The generator function is declared with this new syntax:
// function* foo() {
//   // ..
// }

//  Though a generator is declared with * , you still execute it like a normal function:
// foo();
// //   You can still pass it arguments, as in:
// function* foo(x, y) {
//     console.log( x +y );
// }
// foo(5, 10);
// // The major difference is that executing a generator, like foo(5,10) doesn’t actually run
// // the code in the generator. Instead, it produces an iterator which will control the gen‐
// // erator to execute its code.

// // Yield
// // Generators also have a new keyword you can use inside them, to signal the pause
// // point: yield . Consider:
// function* foo() {
//   var x = 10;
//   var y = 20;
//   yield;
//   var z = x + y;
// }

// function *foo() {

//     var q = yield Math.random();
//     console.log(q);
  
// }

// foo();

function *foo(x) {
    if (x < 3) {
    x = yield *foo( x + 1 );
    }
    return x * 2;
    }

    var f = foo( 1 );
   console.log( f );
