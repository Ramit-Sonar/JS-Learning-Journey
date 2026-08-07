
var a = 100; //this value of a is shadowed by a, it means value of a=100 is replace by value of a=10 becaue they both share same memory location in the memory on function scop
let b = 200;//it is not shadowed because b inside the block and outside the block use defferent memory location and same case for the const
const c = 300;//this is not shadowed
{
    var a =10;
    let b = 20;
    const c = 30;
    console.log(a);//10 because 100 is shadowed by 10
    console.log(b);
    console.log(c);
    
}

console.log(a);//it can access becasue it is global scop => 10  insted of 100
console.log(b);// it cannot access outside the block {} because it is blocked scop => 200
console.log(c);//it is same as let => 300

function show(){
    var a = 1000; // this a is limited to the functional block
    console.log(a);
}
show();
console.log(a);

//var ignores normal {} blocks but respects function boundaries.
//let and const respect both normal blocks and function boundaries.




// ===============================================
// JAVASCRIPT VARIABLE SHADOWING
// ===============================================

// Shadowing means:
// A variable declared in an inner scope has the
// same name as a variable in an outer scope.
// The inner variable "hides" (shadows) the outer one.

// ------------------------------------------------
// 1. BLOCK SHADOWING WITH let
// ------------------------------------------------

let a = 10; // Global variable

{
    let a = 100; // New variable inside this block
    console.log("Inside block:", a); // 100
}

console.log("Outside block:", a); // 10

// Explanation:
// let is BLOCK SCOPED.
// The block creates a new scope.
// So there are two different variables named 'a'.


// ------------------------------------------------
// 2. FUNCTION SHADOWING WITH var
// ------------------------------------------------

var b = 20; // Global variable

function demo() {
    var b = 200; // New variable inside the function
    console.log("Inside function:", b); // 200
}

demo();

console.log("Outside function:", b); // 20

// Explanation:
// var is FUNCTION SCOPED.
// The function creates a new scope.
// So the inner 'b' shadows the outer 'b'.


// ------------------------------------------------
// 3. var DOES NOT CREATE BLOCK SCOPE
// ------------------------------------------------

var c = 30; // Global variable

{
    var c = 300; // Same variable (NOT a new one)
}

console.log("After block:", c); // 300

// Explanation:
// var ignores normal { } blocks.
// Both declarations refer to the SAME variable.
// Therefore, the value becomes 300.


// ===============================================
// MEMORY VISUALIZATION
// ===============================================

/*

CASE 1 (let)

Global Scope
-------------
a = 10

Block Scope
-------------
a = 100

Two different variables
=> Shadowing


CASE 2 (var inside function)

Global Scope
-------------
b = 20

Function Scope
--------------
b = 200

Two different variables
=> Shadowing


CASE 3 (var inside block)

Global Scope
-------------
c = 30
↓

c = 300

Only ONE variable
=> NO shadowing
=> Value is replaced


FINAL RULE

let + block      -> Shadowing ✅
const + block    -> Shadowing ✅
var + function   -> Shadowing ✅
var + block      -> NO shadowing ❌

Reason:
var is function-scoped.
let and const are block-scoped.

*/