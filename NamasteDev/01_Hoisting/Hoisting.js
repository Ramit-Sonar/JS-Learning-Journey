/*
getName();
console.log(x); //this show undifine because only memory is allocate for he variable x not executed at because x is below this code and js is synchronous in nature
console.log(getName)

var x = 7;

function getName() {
    console.log("Namaste Javascript");
}

*/

//for arrow function, arrow function act as the variable here 

// getName();
console.log(x); 
console.log(a); //it shows refrence error because It stays inside the Temporal Dead Zone (TDZ) until the declaration is executed.
console.log(b); 
console.log(getName)
console.log(getName1)

var x = 7;
let a = 8;
const b = 9;

var getName = () => {
    console.log("Namaste Javascript");  //it behave as a varible here
}

var getName1 = function () {
    console.log("this is also act as a variable and store in memroy as undefine before execution")
}

getName1()