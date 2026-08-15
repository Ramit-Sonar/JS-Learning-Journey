a();//this is valid this give output 

console.log(b);//undefined

// b();  this is not valid this doesnot give output it give typeerror because function expression act as a variable


//1.Function statement (function declaration)

function a(){
    console.log('a called');   
}

//2.Function Expression

var b = function (){
    console.log('b called');  
}

//the main difference between function statement and function expression is hoisting, function statement call before function defination but function expression cannot call it show typeerror

//3.Anonymous Function

// function () {
//  anonymous function is used as a value and assign to the another variable
// }

//4.Named Function Expression

var c = function xyz (){
    console.log('c called');
    console.log(xyz);//we can call this here 
    
}//the function expression with name called named function expression

c();
// xyz() this show refrence error we can not call this function like this 

//5.difference between parameter and argument
function a(param1){
    console.log('a called',param1);   
}
a(1)// this 1 is argument and param1 is parameter

//6.First class function==>the abality to use function as value and can be pass this as argument in another function and can be return from the function

function a(param1){
    console.log('a called',param1); 
    return function (){
        // we can return function from another function
    }    
}
a(function xyz(){
//we can pass function as an argument
})

//first class citizen=== first class function


//