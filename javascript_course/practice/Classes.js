// new ES6 class mechanism with 'class' keyword, which identifies a
// block where the contents define the members of a function’s prototype.
// !!! you must declare a class before you can instantiate it.
console.log('class super section:');
class Foo {
    constructor(a, b) {
        this.x = a;
        this.y = b;
    }
    gimmeXY() {
        return this.x * this.y;
    }
}

class Bar extends Foo {
    constructor(a, b, c) {
        super(a, b); // in constructor 'super' automatically refers to the “parent constructor”
        this.z = c;
    }
    gimmeXYZ() {
        return super.gimmeXY() * this.z; // in method 'super' refers to the “parent object”
    }
}
var b = new Bar(5, 15, 25);
console.log(b.x); // 5
console.log(b.y); // 15
console.log(b.z); // 25
console.log(b.gimmeXYZ()); // 1875


function FooF() {
    this.a = 1;
}

function BarF() {
    this.b = 2;
    FooF.call(this);
}
// `BarF` "extends" `FooF`
BarF.prototype = Object.create(FooF.prototype);

//  But this ES6 equivalent is not allowed:
class Foo2 {
    constructor() {
        this.a = 1;
    }
}
// class Bar2 extends Foo2 {
//     constructor() {
//         this.b = 2; // not allowed before `super()`
//         super(); // to fix, swap these two statements
//     }
// }

console.log('extend section:');
// One of the most heralded benefits to the 'new class' and 'extend' design is the ability
// to (finally!) subclass the built-in natives, like Array . Consider:
class MyCoolArray extends Array {
    first() {
        return this[0];
    }
    last() {
        return this[this.length - 1];
    }
}
var a = new MyCoolArray(1, 2, 3);
console.log(a.length); // 3
console.log(a); // [1,2,3]
console.log(a.first()); // 1
console.log(a.last()); // 3


class Oops extends Error {
    constructor(reason) {
        super();
        this.oops = reason;
    }
}
// later:
var ouch = new Oops("I messed up!");
// throw ouch;
// The ouch custom error object in this previous snippet will behave like any other genuine
// error object, including capturing stack . That’s a big improvement!

console.log('new.target section:');

class Foo3 {
    constructor() {
        console.log("Foo3: ", new.target.name);
    }
}
class Bar3 extends Foo3 {
    constructor() {
        super();
        console.log("Bar3: ", new.target.name);
    }
    // baz() {
    //     console.log("baz3: ", new.target);
    // }
}
var a = new Foo3(); // Foo3: Foo3
var b = new Bar3(); // Bar3: Bar3
// b.baz3(); // baz3: undefined
// If new.target is undefined , you know the function was not called with 'new'

console.log('static section:');
class Foo {
    static answer = 42;
    static cool() {
        console.log("cool");
    }
    // ..
}
class Bar extends Foo {
    constructor() {
        console.log(new.target.answer);
    }
}
Foo.answer; // 42
Bar.answer; // 42
var b = new Bar(); // 42
b.cool(); // "cool"
b.answer; // undefined -- `answer` is static on `Foo`

// Be careful not to get confused that static members are on the class’s prototype
// chain. They’re actually on the dual/parallel chain between the function constructors.
console.log('Symbol.species section:');
class MyCoolArray extends Array {
    // force `species` to be parent constructor
    static get[Symbol.species]() {
        return Array;
    }
}
var a = new MyCoolArray(1, 2, 3),
    b = a.map(function (v) {
        return v * 2;
    });
b instanceof MyCoolArray; // false
b instanceof Array; // true
// To illustrate how a parent class method can use a child’s species declaration somewhat
// like Array#map(..) is doing, consider:
class Foo {
    // defer `species` to derived constructor
    static get[Symbol.species]() {
        return this;
    }
    spawn() {
        return new this.constructor[Symbol.species]();
    }
}
class Bar extends Foo {
    // force `species` to be parent constructor
    static get[Symbol.species]() {
        return Foo;
    }
}

var a = new Foo();
var b = a.spawn();
b instanceof Foo; // true

var x = new Bar();
var y = x.spawn();
y instanceof Bar; // false
y instanceof Foo; // true

// The parent class Symbol.species does return this to defer to any derived class, as
// you’d normally expect. Bar then overrides to manually declare Foo to be used for such
// instance creation. Of course, a derived class can still vend instances of itself using new
// this.constructor(..) .