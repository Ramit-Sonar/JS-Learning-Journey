CALLBACK FUNCTION IN JAVASCRIPT
================================

1. WHAT IS A CALLBACK?
----------------------
A callback is a normal function that is passed as an argument
to another function and is called by that function.

Example:

function x(callback) {
    console.log("X");
    callback();
}

x(function () {
    console.log("Y");
});

Here:
- x() = Higher-order function
- callback function = function passed to x()
- callback() = calling/executing the callback


2. WHY IS IT CALLED CALLBACK?
-----------------------------
Because we pass a function to another function and say:

"Call this function back when you need it."

CALL + BACK = CALLBACK


3. FUNCTION IS A FIRST-CLASS CITIZEN
------------------------------------
In JavaScript, functions can be treated like values.

A function can be:
- Stored in a variable
- Passed as an argument
- Returned from another function

Example:

const a = function () {
    console.log("Hello");
};

function x(callback) {
    callback();
}

x(a);


4. CALLBACK IS NOT A SPECIAL TYPE OF FUNCTION
----------------------------------------------
There is no special "callback" keyword.

A callback is simply a normal function being used
as an argument to another function.

Example:

function hello() {
    console.log("Hello");
}

function execute(fn) {
    fn();
}

execute(hello);

Here hello() becomes a callback because it is passed to execute().


5. WHERE IS THE FUNCTION STORED?
---------------------------------
The function object is stored in JavaScript's memory
(typically visualized as the Heap).

Example:

function y() {
    console.log("Y");
}

Conceptually:

Heap
-------------------------
Function y
console.log("Y")
-------------------------

The variable/reference y points to that function object.


6. FUNCTION OBJECT vs FUNCTION EXECUTION
-----------------------------------------
These are different things.

Function exists in memory:

function y() {
    console.log("Y");
}

Function executes when:

y();

When y() executes, its execution context is placed
on the Call Stack.


7. CALLBACK EXECUTION
---------------------

function x(callback) {
    console.log("X");
    callback();
}

x(function () {
    console.log("Y");
});

Flow:

Global
  ↓
x() pushed to Call Stack
  ↓
"X" printed
  ↓
callback() called
  ↓
callback execution context pushed to Call Stack
  ↓
"Y" printed
  ↓
callback finishes → removed
  ↓
x() finishes → removed


8. IMPORTANT: CALLBACK DOES NOT ALWAYS MEAN ASYNCHRONOUS
----------------------------------------------------------
Callbacks can be:

1. Synchronous
2. Asynchronous


Synchronous callback:

function x(callback) {
    callback();
}

x(function () {
    console.log("Hello");
});

The callback executes immediately.

Call Stack does NOT need to be empty.

Example:

Call Stack
----------------
callback()
x()
Global
----------------


Asynchronous callback:

setTimeout(function () {
    console.log("Timer");
}, 5000);

The callback is executed later.

It goes through the runtime/timer mechanism,
then becomes ready and waits in a queue.


9. setTimeout CALLBACK FLOW
---------------------------

setTimeout(function () {
    console.log("Timer");
}, 5000);

Flow:

Callback function created
        ↓
Function exists in memory
        ↓
Passed to setTimeout()
        ↓
Timer is registered with runtime
        ↓
JavaScript continues executing
        ↓
Approximately 5 seconds pass
        ↓
Callback becomes ready
        ↓
Callback Queue
        ↓
Event Loop
        ↓
Checks Call Stack
        ↓
If Call Stack is empty
        ↓
Callback moved to Call Stack
        ↓
Callback executes


10. CALL STACK AND ASYNCHRONOUS CALLBACK
----------------------------------------
IMPORTANT:

An asynchronous callback waiting in a queue
cannot execute while the Call Stack is busy.

Example:

Call Stack busy
----------------
someFunction()
Global
----------------

Callback Queue
----------------
timer callback
----------------

The callback must wait.

When Call Stack becomes empty:

Call Stack
----------------
(empty)
----------------

        ↓ Event Loop

Callback Queue
----------------
timer callback
----------------

        ↓

Call Stack
----------------
timer callback
----------------


11. IMPORTANT RULE
------------------
Do NOT remember:

"Every callback needs an empty Call Stack."

This is WRONG.

Remember:

"An asynchronous callback waiting in a queue needs
the Call Stack to be empty before the Event Loop
can move it to the Call Stack."


12. SYNCHRONOUS CALLBACK
------------------------

function x(callback) {
    console.log("X");
    callback();
}

x(function () {
    console.log("Y");
});

Call Stack:

Global
  ↓
x()
  ↓
callback()

The callback can execute while x() is still on the stack.

Therefore:

Call Stack DOES NOT need to be empty.


13. ASYNCHRONOUS CALLBACK
-------------------------

setTimeout(callback, 5000);

Flow:

Timer
  ↓
Callback becomes ready
  ↓
Callback Queue
  ↓
Event Loop
  ↓
Call Stack must be empty
  ↓
Callback enters Call Stack
  ↓
Callback executes


14. WHY DO WE USE CALLBACKS?
----------------------------
Callbacks are useful when we want to tell another
function:

"Run this function when something happens or
when your work is completed."

Examples:
- Timers
- Network requests
- File operations
- Event handling
- Database operations
- Asynchronous operations


15. REAL-LIFE EXAMPLE
---------------------

You order food.

You tell the restaurant:

"Call me when my food is ready."

You don't wait doing nothing.

You continue doing other work.

When food is ready:
Restaurant → calls you

JavaScript:

Start operation
      ↓
Continue doing other work
      ↓
Operation finishes
      ↓
Callback runs


16. CALLBACK + HIGHER-ORDER FUNCTION
------------------------------------
A function that accepts another function
as an argument is called a Higher-Order Function.

Example:

function x(callback) {
    callback();
}

x(function () {
    console.log("Hello");
});

Here:
- x = Higher-Order Function
- function passed to x = Callback


17. CALLBACK WITH DATA
----------------------

function calculate(a, b, callback) {
    const result = a + b;
    callback(result);
}

calculate(10, 20, function (result) {
    console.log(result);
});

Flow:

calculate()
    ↓
result = 30
    ↓
callback(30)
    ↓
result receives 30
    ↓
console.log(30)


18. WHY CALLBACKS ARE IMPORTANT FOR ASYNCHRONOUS JS
---------------------------------------------------
JavaScript has a single main Call Stack for executing
JavaScript code.

If JavaScript had to wait for every slow operation:

Program
  ↓
Network request
  ↓
WAIT
  ↓
Response
  ↓
Continue

The program would be blocked.

Callbacks allow:

Start operation
      ↓
Don't block JavaScript
      ↓
Continue other work
      ↓
Operation finishes
      ↓
Run callback


19. CALLBACK HELL
-----------------
Too many nested callbacks can become difficult to read.

Example:

getUser(function(user) {
    getPosts(user, function(posts) {
        getComments(posts, function(comments) {
            console.log(comments);
        });
    });
});

This is called:

CALLBACK HELL
or
PYRAMID OF DOOM


20. CALLBACK → PROMISE → ASYNC/AWAIT
-------------------------------------
JavaScript evolved toward cleaner asynchronous code:

Callbacks
    ↓
Promises
    ↓
async/await

Callbacks are the foundation for understanding
asynchronous JavaScript.


21. MOST IMPORTANT DIAGRAM
--------------------------

SYNCHRONOUS CALLBACK:

function x(callback) {
    callback();
}

Global
  ↓
x()
  ↓
callback()
  ↓
callback finishes
  ↓
x finishes


ASYNCHRONOUS CALLBACK:

setTimeout(callback, 5000);

Callback
   ↓
setTimeout
   ↓
Timer / Runtime
   ↓
Callback becomes ready
   ↓
Callback Queue
   ↓
Event Loop
   ↓
Is Call Stack empty?
   ↓
YES
   ↓
Call Stack
   ↓
Callback executes


22. FINAL THINGS TO REMEMBER
----------------------------

✓ Callback = function passed to another function.

✓ Callback is NOT a special type of function.

✓ A function becomes a callback because of how it is used.

✓ Functions are first-class citizens in JavaScript.

✓ Function object exists in memory (Heap).

✓ Calling the function creates its execution context
  and executes it through the Call Stack.

✓ Synchronous callback:
  Call Stack does NOT need to be empty.

✓ Asynchronous callback:
  It may wait in a queue.

✓ Event Loop moves a queued asynchronous callback
  to the Call Stack only when the Call Stack is empty.

✓ setTimeout does NOT put the callback directly
  into the Call Stack.

✓ setTimeout callback waits until the timer is ready,
  then waits for the Call Stack to become empty.

✓ setTimeout(5000) means "not before approximately
  5 seconds", NOT "exactly after 5 seconds".

✓ Callback is mainly used to control what happens
  after an operation completes.

MEMORY TRICK:

Function passed
      ↓
Another function receives it
      ↓
Another function calls it
      ↓
CALLBACK

For asynchronous callback:

Runtime
   ↓
Queue
   ↓
Event Loop
   ↓
Empty Call Stack
   ↓
Call Stack
   ↓
Execute Callback