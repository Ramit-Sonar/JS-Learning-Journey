var a = 10;

function outer() {
    b = 100;

    function inner() {
        c = 1000;

        console.log(a);
        console.log(b);
        console.log(c);
        
    }
    inner()
}
outer()



/*
Lexical means where code is written, not where it is called.
Every Execution Context has its own Lexical Environment.
A Lexical Environment stores:
Variables
Functions
Reference to the parent lexical environment
Variable lookup starts from the current environment and moves upward through the Scope Chain.
Child functions can access parent variables, but parent functions cannot access child variables.
If a variable isn't found anywhere in the chain, JavaScript throws a ReferenceError. */