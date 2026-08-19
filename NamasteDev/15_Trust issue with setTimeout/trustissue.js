//simulation code for how can we block our main thread by program and showing the trust issue of setTimeout 

console.log("start");

setTimeout(() => {
    console.log('Timer');
},5000);

console.log('End');

//simulation of how we block our main thread for the 10 second
let startDate = new Date().getTime();//it gives the time in milisecond
let endDate = startDate;

while(endDate <= startDate + 10000){
    endDate = new Date().getTime();
}

console.log('While end');

//output

// start
// end
// while end
// Timer => it print after 10 second even time set for the 5 second thats why setTimeout() has the trust issue


//setTimeout with time 0

console.log("start");

setTimeout(() => {
    console.log('Timer');
},0);

console.log('End');

//output

// start
// end
// Timer