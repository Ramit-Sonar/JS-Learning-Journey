// map() transforms each element and gives you a new array.

const prices = [100, 200, 300];

const discountedPrices = prices.map((price) => {
    return price * 0.9;
});

console.log(prices); // [100, 200, 300]
console.log(discountedPrices); // [90, 180, 270]


//forEach() doesn't create a new array. It simply runs the function for each element.

const prices1 = [100, 200, 300];

prices1.forEach(price => {
    console.log(`Price: ₹${price}`);
});
console.log(prices)




//map()     → Transform → New Array
//forEach() → Perform   → No New Array