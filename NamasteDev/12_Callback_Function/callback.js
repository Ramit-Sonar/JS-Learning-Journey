
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


// Closure with Event Listener
function attachEventListener() {
    let count = 0;

    document.getElementById("clickMe").addEventListener("click", function xyz() {
        console.log("button clicked", ++count);

        // CALLBACK: xyz is a callback function passed to addEventListener().
        // It is not executed immediately. The browser executes it later
        // whenever the "click" event occurs.

        // CLOSURE: xyz forms a closure with its outer function's lexical
        // environment, so it remembers and can access 'count' even after
        // attachEventListener() has finished executing.
    });
}

attachEventListener();//event listener is too heavey so we remove this when we dont need it, if there is many evenetlistener then the page bacome very slow