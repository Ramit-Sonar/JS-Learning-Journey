var x = 10;

function a() {
    var y =100;
}

console.log(x); // by default try to access global space
console.log(window.x);
console.log(this.x);
console.log(y); // this show error because y is not on the global space

/* this all come from the window object these are not core js these ar web api come from widnow object
            Browser
               │
               ▼
        +---------------+
        |    window     |
        +---------------+
        | alert()       |
        | setTimeout()  |
        | fetch()       |
        | document      |
        | localStorage  |
        | location      |
        +---------------+
               │
               ▼
      JavaScript uses them  */
