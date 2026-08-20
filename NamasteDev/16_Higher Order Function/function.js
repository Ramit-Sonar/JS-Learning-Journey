/*
function x(){
    console.log('Callback');//it is callback function because it pass as argement in another function 
    
}

function y(x) {
    x() //higher order function because it takes another function as an argument
}
*/


const radious = [3, 1, 2, 4];
/*

//To calculate Area
function calculateArea(radious) {
    const output = [];
    for (let i = 0; i < radious.length; i++) {
        output.push(Math.PI * radious[i] * radious[i]);
    }
    return output;
}
console.log("Area is :", calculateArea(radious));

//To calculate Circumference
function calculateCircumference(radious) {
    const output = []
    for (let i = 0; i < radious.length; i++) {
        output.push(2 * Math.PI * radious[i]);
    }
    return output;
}
console.log('Circumference is:', calculateCircumference(radious));

//if we again need calculate diameter

function calculateDiameter(radious) {
    const output = [];
    for (let i = 0; i < radious.length; i++) {
        output.push(2 * radious[i]);
    }
    return output;
}

console.log('Diameter is:', calculateDiameter(radious));


*/

//Do you thing this is the good way to write code for all thing repeating same code?

//first i want to try it a little bit optimize (try myself)

/*
function calculate(radious) {
    const outputArea = [];
    const outputCircumference = [];
    const outpuDiameter = [];
    for (let i = 0; i < radious.length; i++) {
        outputArea.push(Math.PI * radious[i] * radious[i]);
        outputCircumference.push(2 * Math.PI * radious[i]);
        outpuDiameter.push(2 * radious[i]);
    }
    console.log("outputArea is :", outputArea);
    console.log("outputCircumference is :",outputCircumference);
    console.log("outputDiameter is :", outpuDiameter);
}

calculate(radious)

*/


//the more optimal code using functional programming i.e higher order function 

const area = function (radious) {
    return Math.PI * radious * radious;//callback function
}

const Circumference = function (radious) {
    return 2 * Math.PI * radious;
}

const Diameter = function (radious) {
    return 2 * radious;
}

function calculate (radious, logic) {//higher ordedr function
    const output = [];
    for(let i = 0; i < radious.length; i++){
        output.push(logic(radious[i]))
    }
    return output;
}

console.log("Modular area:", calculate(radious, area));
console.log("Modular area:", calculate(radious, Circumference));
console.log("Modular area:", calculate(radious,Diameter));//this is the best practice to write code in interview


//the map do the same thing

console.log(radious.map(area)); // this is exactly same as our calculate function 



