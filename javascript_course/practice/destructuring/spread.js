// ...a spreding out since it appears in array value position :
var a = [ 2, 3, 4 ];
var b = [ 1, ...a, 5 ];
console.log( b );        // [1, 2, 3, 4, 5]
 
// if ...a appears in array destructuring position :
var a = [ 2, 3, 4 ];
var [ b, ...c ] = a;
console.log( b, c );     // 2, [3, 4]   
// the var [ .. ] = a destructuring assignment spreads a out to be assigned to the pattern described inside the [ .. ] : 
// the first part names b for the first value in a, but then ...c gathers the rest of values into an array and call it c
