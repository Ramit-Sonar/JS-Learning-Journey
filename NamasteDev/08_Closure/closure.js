/*
function x() {
    let a = 10;

    function y() {
        console.log(a);
    }
    return y;//it doesnot return only function it return function with bundle of lexical scope called closure
}
let b = x()
console.log(b);

b();//it print 10 because while returning y also return closure(fuction along with lexical enviroment) so y remembers where i came from, this all possible due to the closure 

*/

//real example --> counter

function createCounter() {
    
    let count = 0;
    
    return function () {
        count++;
        console.log(count)
    };
    
}

const counter = createCounter();//here create counte is called only once then it collapsed

counter();//here we think every time we call this function counter = 0 the when doing count++ become 1 in every call but that doent happened 
counter();
counter();
counter();
counter();


//even real example that actually use in real life project
function createApiService(baseURL) {

    return function (endpoint) {
        return fetch(baseURL + endpoint);
    };
}

const api = createApiService("https://example.com/api");

console.log(await api("/users"));
api("/jobs");
api("/profile");