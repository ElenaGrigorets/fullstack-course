const obj = { num: 2 };
 
const addToThis = function(a) {
    return this.num + a;
};

addToThis.call(obj, 3);  // functionName.call(obj, functionArguments)

// if you have multiple arguments: 
const arr =[1, 3, 5];
console.log("Apply works: " + addToThis.apply(obj, arr));


const obj2 = { num: 5};
addToThis.apply(obj2, arr);

// bind gives a function back not execute it like call and apply
const bound = addToThis.bind(obj)  // you first pass object itself to function
console.log(bound(1, 2, 3));

// borrow functionality from one object to another
let add = function(c){
    console.log(this.a + this.b + c);
}
let objA = {
    a: 1,
    b: 2
}
add.call(objA, 3); // 6


// borrow array functionality for a non-array but array-like objects:

let argsToArray = function(){
   // console.log(arguments); // print arguments - array-like object
    [].slice.call(arguments); // actually gives arguments in an array [1,2,3]
}
argsToArray(1,2,3);

// (positive numbers are used as keys)
let anArrayLikeObj = { 0:"Martin", 1:78, 2:67, 3:["Letta", "Marieta", "Pauline"], length:4 };

                //  doing quick copy and save it in object:
                //  first parameter sets “this”
                let newArray = Array.prototype.slice.call(anArrayLikeObj, 0);

                console.log(newArray); // ["Martin", 78, 67, Array[3]]

                //  looking for Martin in our array-like object:
                console.log(Array.prototype.indexOf.call(anArrayLikeObj, "Martin") === -1 ? false : true); // true

                //  and now lets use indexOf without call() or apply()
//          console.log(anArrayLikeObj.indexOf("Martin") === -1 ? false : true); 
                // Error: Object has no method 'indexOf'

                //  reverse object:
                console.log(Array.prototype.reverse.call(anArrayLikeObj));
                // {0: Array[3], 1: 67, 2: 78, 3: "Martin", length: 4}

                //  awesome, we even can use pop():
                console.log(Array.prototype.pop.call(anArrayLikeObj));
                console.log(anArrayLikeObj); // {0: Array[3], 1: 67, 2: 78, length: 3}

                //  and what about push()?
                console.log(Array.prototype.push.call(anArrayLikeObj, "Jackie"));
                console.log(anArrayLikeObj); // {0: Array[3], 1: 67, 2: 78, 3: "Jackie", length: 4}





let numArray = [1, 2, 3]
// console.log(Math.min(1,2,3)); // 1
// If you need to pass an array into min function:
console.log("Minimum in numArray is: " + Math.min.apply(null, numArray)); // 1
console.log("Minimum in numArray is: " + Math.min(numArray)); // NaN



let button = function(content){
    this.content = content;
};

button.prototype.click = function(){
    console.log(`${this.content} clicked`);
}




// create an object literal: 
let myObj = {
    asyncGet (cb) { // when gets data back will parse it:
    cb();
    },
    parse() {
        console.log("parse called");
    },
    render() {
         // that = this;
        this.asyncGet(function(){
//        this.parse(); // gives an error: this.parse is not a function, one soluthion is to use "that"
//        that.parse(); // but it's not a good idea
        }.bind(this)); // basically it binds outer 'this' with inner 'this'
    }
}


// the first argument in 'bind()' is 'this')
// bind for later binding when you do not know all arguments now but later pass them:
let small = {
    a: 1,
    go: function(b,c,d){
      console.log(this.a+b+c+d);
    }
  }
let large = {
    a: 100
  }
small.go(2,3,4);  // logs 1+2+3+4 => 10

let bindTest = small.go.bind(large,2);
console.log(bindTest);  // logs => function (b,c,d){console.log(this.a+b+c+d);}
  
bindTest(3,4);
  // logs 100+2+3+4 => 109



//   The value of 'this' is usually determined by the context of the function expression.
// In the global scope, 'this' refers to the global object.
// When using 'new', 'this' binds to the newly created object.
// We can explicitly specify 'this' values using call (), bind (), and apply ().
// Arrow functions do not bind 'this' - instead, 'this' is bound lexically based on the original context.



function greet (gender, age, name) {
    // if male, use Mr., if not then use Ms..
    let salutation = gender === "male" ? "Mr. " : "Ms. ";

    if (age > 25) {
        return "Hello, " + salutation + name + ".";
    }
    else {
        return "Hey, " + name + ".";
    }
}

// as first argument in bind function is this, but we don't use it inside method so we pass first arg = null:
let greetAnAdultMale = greet.bind (null, "male", 45);

        greetAnAdultMale ("John Hartlove"); // "Hello, Mr. John Hartlove."

let greetAYoungster = greet.bind (null, "", 16);
        greetAYoungster ("Alex"); // "Hey, Alex."
        greetAYoungster ("Emma Waterloo"); // "Hey, Emma Waterloo."




//         Borrowing others methods and functions
// We can borrow not only from Array or from String, also our custom functions too:
let gameController = {
                    scores:[20, 34, 55, 46, 77],
                    avgScore: null,
                    players: [
                        {name:"Tommy", playerID:987, age:23},
                        {name:"Pau", playerID:87, age:33}
                    ]
                }

                let appController = {
                    scores: [900, 845, 809, 950],
                    avgScore: null,
                    avg: function() {

                        let sumOfScores = this.scores.reduce( function(prev, cur, index, array) {
                            return prev + cur;
                        });

                        this.avgScore = sumOfScores/this.scores.length;
                    }
                }

                //  we use apply(), so as second parameter must be array:
                appController.avg.apply(gameController);
                console.log("Average score: " + gameController.avgScore); // 46.4

                //  appController.avgScore is still null; it doesn't changed, only gameController.avgScore
                console.log (appController.avgScore); // null

// It is recommended to borrow our custom methods and functions  
// Object gameController borrow method appController named avg(). 'this' value, defined inside avg() method
// will be first parameter — that is object gameController.
// Maybe you are interested what will happened if the method that we borrow will changed. Does the borrowed(cloned/copied) method 
// stay the same copy from original? Let's see in example:
appController.maxNum = function () {
            this.avgScore = Math.max.apply (null, this.scores);
        }

        appController.maxNum.apply (gameController, gameController.scores);
        console.log (gameController.avgScore); // 77
// As expected, if we change original method, this changes will impact on all borrowed. Because,
// we never do the whole copy of the method, we just borrow it(only linked on it's original implementation).