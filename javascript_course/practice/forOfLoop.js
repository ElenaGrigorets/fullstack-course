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