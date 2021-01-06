var Fib = {
  [Symbol.iterator]() {
    var n1 = 1,
      n2 = 1;
    return {
      // make the iterator an iterable
      [Symbol.iterator]() {
        return this;
      },
      next() {
        var current = n2;
        n2 = n1;
        n1 = n1 + current;
        return { value: current, done: false };
      },
      return(v) {
        console.log("Fibonacci sequence abandoned.");
        return { value: v, done: true };
      },
    };
  },
};
for (var v of Fib) {
  console.log(v);
  if (v > 100) break;
}


var a = [1,2,3,4,5];
//  The ... spread operator fully exhausts an iterator. Consider:
function foo(x,y,z,w,p) {
    console.log( x + y + z + w + p );
}
foo( ...a );    // 15

//   ... can also spread an iterator inside an array:
var b = [ 0, ...a, 6 ];
console.log(b);   // [0,1,2,3,4,5,6]

// Array destructuring can partially or completely (if paired with a ... rest/gather operator) consume an iterator:
  var it = a[Symbol.iterator]();
  var [x,y] = it;        // take just the first two elements from `it`
  var [z, ...w] = it;    // take the third, then the rest all at once

  // is `it` is fully exhausted? Yep.
  it.next();     // { value: undefined, done: true }

  console.log(x); // 1
  console.log(y); // 2
  console.log(z); // 3
  console.log(w); // [ 4, 5 ]