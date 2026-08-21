const arr = [5, 1, 3, 2, 6];

function double(x){
    return x*x;
}

const outputdouble = arr.map(double)
console.log(outputdouble);


function triple(x){
    return x*x*x;
}

const outputtriple = arr.map(triple)
console.log(outputtriple);

const outputbinary = arr.map(function binary(x){
    return x.toString(2);//this function convert in binary
})
console.log(outputbinary);

