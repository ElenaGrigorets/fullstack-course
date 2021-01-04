// tagged string literals may just surprise you in their usefulness:
function foo(strings, ...values){
        console.log(strings);
        console.log(values);
    }

var desc = 'awesome';
foo`Everything is ${desc}!`;  
    //         [ 'Everything is ', '!' ]
    //          [ 'awesome' ]

// The most jarring thing that jumps out is foo\`Everything...\;`. That doesn’t look like
// anything we’ve seen before. What is it? 
//It’s essentially a special kind of function call that doesn’t need the ( .. ). The tag —
// the foo part before the \..\`` string literal — is a function value that should be called.
// Actually, it can be any expression that results in a function, even a function call that
// returns another function, like:

function bar() {
    return function foo(strings, ...values){
        console.log(strings);
        console.log(values);
    }
}
var desc = 'awesome';
bar()`Everything is ${desc}!`;  
    //         [ 'Everything is ', '!' ]
    //          [ 'awesome' ]
bar()`Some strings words and ${desc} value at the end`;
    //         [ 'Some strings words and ', ' value at the end' ]
    //          [ 'awesome' ]