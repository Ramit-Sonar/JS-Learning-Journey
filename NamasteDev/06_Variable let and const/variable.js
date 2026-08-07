/*
// var
var a = 10;
a = 20; // ✅ can change value
var a = 30; // ✅ can declare again
console.log("var =", a);

// let
let b = 10;
b = 20; // ✅ can change value
// let b = 30; // ❌ Error: cannot declare again
console.log("let =", b);

// const
const c = 10;
// c = 20; // ❌ Error: cannot change value
// const c = 30; // ❌ Error: cannot declare again
console.log("const =", c);

*/

console.log(b); // it can be access before it initialize
console.log(a); //let also hoisted like var but it cannot access before some value are assigned to it because of temperal dead zone, to access the value of a we need to first initialize the value to a.

let a = 10;
var b = 100;

