
function outest(b) {
    var c = 1000;
    function outer() {
        function inner() {
            console.log(a, c, b);
        }
        // var a = 10;
        let a = 10;
        return inner;
    }
    return outer;
}

// outer()();

// let a = 100;
var close = outest("hello")()()


//how closure provide encapsulation and data hiding 

function counter() {
    var count = 0;
    return function countincrement() {
        count++
        console.log(count);
    }
}

// counter()(); this is same as 

var counter1 = counter()
counter1()
counter1()
counter1()
counter1()
counter1()

//good way to make counter make constructor function 

function Counter()
{
    var count = 0;

    this.incrementCounter = function (){
        count++;
        console.log(count);
    }

    this.decrementCounter = function (){
        count--;
        console.log(count);
    }
}

var counter2 = new  Counter();
counter2.incrementCounter();
counter2.incrementCounter();
counter2.incrementCounter();
counter2.incrementCounter();
counter2.decrementCounter();
counter2.decrementCounter();
counter2.decrementCounter();
counter2.decrementCounter();