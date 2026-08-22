const numbers = [1, 2, 3, 4, 5, 6];

const evenNumbers1 = numbers.filter((num) => {
    return num % 2 === 0;
});

console.log(evenNumbers1);


//comparision between filter and the map 


// ==================== FILTER ====================

// Goal: Keep only even numbers

const evenNumbers = numbers.filter((num) => {
    return num % 2 === 0; // true → keep, false → remove
});

console.log(evenNumbers);

// Output:
// [2, 4, 6]

// filter() can REMOVE elements.
// Original: [1, 2, 3, 4, 5, 6]
// Result:   [   2,   4,   6]


// ==================== MAP ====================

// Goal: Double every number

const doubledNumbers = numbers.map((num) => {
    return num * 2; // Transform each element
});

console.log(doubledNumbers);

// Output:
// [2, 4, 6, 8, 10, 12]

// map() does NOT remove elements.
// Every element gets a new value.


// ==================== SAME CONDITION ====================

// Let's try to use map() to get only even numbers

const result = numbers.map((num) => {
    if (num % 2 === 0) {
        return num;
    }
});

console.log(result);

// Output:
// [undefined, 2, undefined, 4, undefined, 6]

// Why?
// map() must return something for EVERY element.
//
// 1 → odd  → undefined
// 2 → even → 2
// 3 → odd  → undefined
// 4 → even → 4
// 5 → odd  → undefined
// 6 → even → 6
//
// map() keeps the same number of positions.


// ==================== EASY COMPARISON ====================

// FILTER
// "Which elements should I KEEP?"

numbers.filter(num => num > 3);
// [4, 5, 6]


// MAP
// "What should I DO/CHANGE with each element?"

numbers.map(num => num > 3);
// [false, false, false, true, true, true]