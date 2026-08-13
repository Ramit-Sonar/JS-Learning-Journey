/*
function x()
{
    var i = 10;

    setTimeout(() => {
        console.log(i);
        
    }, 1000);

    console.log('hii ramit');//js doesnot wait for anything 
    
}

x();  */


//JavaScript does not block the current synchronous execution while waiting for the timer. The timer is handled by the browser's Web API, and the callback runs later when the event loop allows it.

/*
function x() {
    for (var i = 1; i <= 5; i++) {
        setTimeout(function () {
            console.log(i); // this only print 6, 5 times because With var, all callbacks close over the same i binding

        }, 1000 * i);
    }

    console.log('hii ramit');//js doesnot wait for anything 

}

x();  */


/*
//we can solve that problem using let 
function x() {
    for (let i = 1; i <= 5; i++) {
        setTimeout(function () {
            console.log(i);// this print 1,2,3,4,5 because With let, each loop iteration gets a new i binding that its callback closes over.

        }, 1000 * i);
    }

    console.log('hii ramit');//js doesnot wait for anything 

}

x();   */


//we can solve that problem using var inside function
function x() {
    for (let i = 1; i <= 5; i++) {
        function close(x) {
            setTimeout(function () {
                console.log(x);
            }, 1000 * i);
        }
        close(i)
    }

    console.log('hii ramit');//js doesnot wait for anything 

}

x();