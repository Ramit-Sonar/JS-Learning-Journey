//What is the callback function in js

setTimeout(function(){//this is first class function
    console.log('Timer');
},5000);//this settime asynchronous operation doesnot possible without callback function

function x(y){
    console.log('X');
    y();
}

x(function y() {
    console.log('Y');//this function is callback function => callback function give us power of asyncnity
})


//A callback is not a special type of function. It is an ordinary function that you hand to another function so that the other function can decide when to execute it.

//And the reason callbacks are so important in JavaScript is that they provide a way to say "continue this part of my program when this operation is ready" without forcing the JavaScript execution thread to sit and wait.