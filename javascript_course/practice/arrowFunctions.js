// Syntax:
function foo(x,y) {
    return x + y;
    }
    // versus
var foo = (x,y) => x + y;
// Here’s some other arrow function variations to consider:
var f1 = () => 12;
var f2 = x => x * 2;
var f3 = (x,y) => {
    var z = x * 2 + y;
    y++;
    x *= 3;
    return (x + y + z) / 2;
};
// Arrow functions are always function expressions; there is no arrow function declaration. 
// It also should be clear that they are anonymous function expressions — they
// have no named reference for the purposes of recursion or event binding/unbinding
// — though “Function Names”