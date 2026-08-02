var x = 10;

function a() {
    var y =100;
}

console.log(x); // by default try to access global space
console.log(window.x);
console.log(this.x);
console.log(y); // this show error because y is not on the global space


