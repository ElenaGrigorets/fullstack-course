// different behavior between a destructuring default value and a function parameter default value
function f({ x = 10 } = {}, { y } = { y: 10}) {
    console.log( x, y );
}
f();     // 10 10

f( {}, {});      // 10 undefined
// { y: 10} is an object as a function parameter default value, so it only applies if the second argument is not passed at all,
// or is passed as undefined