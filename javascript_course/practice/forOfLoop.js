// Let’s compare for..of to for..in to illustrate the difference:

var a = ["a","b","c","d","e"];
for (var idx in a) {
console.log( idx );
}
// 0 1 2 3 4
for (var val of a) {
console.log( val );
}
// "a" "b" "c" "d" "e"

//     Standard built-in values in JavaScript that are by default iterables (or provide them) include:
//       • arrays
//       • strings
//       • generators 
//       • collections / TypedArrays 
//     Plain objects are not by default suitable for for..of looping. That’s
// because they don’t have a default iterator