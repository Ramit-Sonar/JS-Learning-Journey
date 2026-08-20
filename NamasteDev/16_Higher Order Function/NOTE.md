# 🚀 JavaScript — Higher-Order Functions & Functional Programming

> 📚 **Quick Revision:**
> **Callback → Higher-Order Function → Functional Programming → `map()`**

---

# 📞 1. Callback Function

A **callback function** is a function that is **passed as an argument to another function** and is called later by that function.

```js
function x() {
    console.log("Callback");
}

function y(x) {
    x();
}

y(x);
```

Here:

```text
x → Callback Function
y → Higher-Order Function
```

Because `x` is passed into `y` as an argument.

---

# 🏗️ 2. Higher-Order Function

A **Higher-Order Function (HOF)** is a function that:

* 📥 Takes another function as an argument, **OR**
* 📤 Returns another function.

Example:

```js
function x() {
    console.log("Callback");
}

function y(x) {
    x();
}
```

`y()` is a **Higher-Order Function** because it accepts a function as an argument.

### 🧠 Easy Rule

```text
Function passed as argument
        ↓
    Callback

Function accepting/returning function
        ↓
Higher-Order Function
```

> 🔑 **Callback describes the function being passed. HOF describes the function receiving or returning another function.**

---

# 🟠 3. The Problem — Repeating Code

Suppose we have:

```js
const radius = [3, 1, 2, 4];
```

We want:

* 🔵 Area
* 🟢 Circumference
* 🟡 Diameter

A repetitive approach would be:

```js
function calculateArea(radius) {
    const output = [];

    for (let i = 0; i < radius.length; i++) {
        output.push(Math.PI * radius[i] * radius[i]);
    }

    return output;
}

function calculateCircumference(radius) {
    const output = [];

    for (let i = 0; i < radius.length; i++) {
        output.push(2 * Math.PI * radius[i]);
    }

    return output;
}

function calculateDiameter(radius) {
    const output = [];

    for (let i = 0; i < radius.length; i++) {
        output.push(2 * radius[i]);
    }

    return output;
}
```

### ❌ Problem

The same loop is repeated three times:

```text
for loop → Area
for loop → Circumference
for loop → Diameter
```

This violates the idea of **DRY — Don't Repeat Yourself**.

---

# 🟡 4. Trying to Optimize

We could put everything into one loop:

```js
function calculate(radius) {
    const outputArea = [];
    const outputCircumference = [];
    const outputDiameter = [];

    for (let i = 0; i < radius.length; i++) {
        outputArea.push(Math.PI * radius[i] * radius[i]);
        outputCircumference.push(2 * Math.PI * radius[i]);
        outputDiameter.push(2 * radius[i]);
    }

    return {
        outputArea,
        outputCircumference,
        outputDiameter
    };
}
```

This reduces the repeated loop.

But there is still a problem:

> ❌ The calculation logic is tightly coupled inside `calculate()`.

If tomorrow we need another operation, we have to modify the function again.

---

# 🚀 5. Functional Programming Approach

Instead of putting the calculation logic inside the loop, we separate the **logic** from the **iteration**.

```js
const area = function (radius) {
    return Math.PI * radius * radius;
};

const circumference = function (radius) {
    return 2 * Math.PI * radius;
};

const diameter = function (radius) {
    return 2 * radius;
};
```

Now create one reusable function:

```js
const calculate = function (radius, logic) {

    const output = [];

    for (let i = 0; i < radius.length; i++) {
        output.push(logic(radius[i]));
    }

    return output;
};
```

Now:

```js
const radius = [3, 1, 2, 4];

console.log(calculate(radius, area));

console.log(calculate(radius, circumference));

console.log(calculate(radius, diameter));
```

---

# 🧠 6. Why Is `calculate()` a Higher-Order Function?

Look at:

```js
calculate(radius, area);
```

We are passing:

```text
area → function
```

into:

```text
calculate() → function
```

Inside:

```js
logic(radius[i]);
```

the function passed as `logic` is executed.

Therefore:

```text
calculate()
     ↓
receives a function
     ↓
Higher-Order Function
```

And:

```text
area()
circumference()
diameter()
     ↓
passed as arguments
     ↓
Callback Functions
```

---

# 🔥 7. Separation of Concerns

This approach separates two responsibilities.

### `calculate()` handles:

```text
🔄 Iteration
📦 Creating output
```

### `area()`, `circumference()`, `diameter()` handle:

```text
🧮 Calculation Logic
```

```text
           calculate()
                │
        ┌───────┼────────┐
        ↓       ↓        ↓
      area   circumference diameter
        │       │        │
        ↓       ↓        ↓
      Logic   Logic     Logic
```

This makes the code **modular, reusable, and easier to maintain**.

---

# 🧩 8. Functional Programming Idea

Functional programming encourages us to treat functions as **first-class values**.

Functions can be:

```text
📦 Stored in variables
📤 Passed as arguments
📥 Returned from functions
```

Example:

```js
const area = function (radius) {
    return Math.PI * radius * radius;
};
```

The function is stored inside `area`.

Then:

```js
calculate(radius, area);
```

passes the function as a value.

---

# 🗺️ 9. `map()` Does the Same Kind of Work

JavaScript provides a built-in Higher-Order Function called:

```js
map()
```

For example:

```js
console.log(radius.map(area));
```

Conceptually, it performs the same basic transformation:

```js
const calculate = function (radius, logic) {

    const output = [];

    for (let i = 0; i < radius.length; i++) {
        output.push(logic(radius[i]));
    }

    return output;
};
```

And:

```js
radius.map(area);
```

Both:

```text
Take each element
      ↓
Apply a function
      ↓
Create a new array
```

---

# 🔍 10. Understanding `map()` Internally

Conceptually, a simplified version of `map()` looks like:

```js
Array.prototype.calculate1 = function (logic) {

    const output = [];

    for (let i = 0; i < this.length; i++) {
        output.push(logic(this[i]));
    }

    return output;
};
```

Then:

```js
const radius = [3, 1, 2, 4];

console.log(radius.calculate1(area));
```

### Why does `this` work?

Because:

```js
radius.calculate1(area);
```

means the object before the `.` becomes the `this` value inside the method.

So:

```text
this → radius
```

Therefore:

```js
this.length
```

is:

```js
radius.length
```

And:

```js
this[i]
```

is:

```js
radius[i]
```

---

# ⚠️ 11. Important: Don't Modify `Array.prototype` in Real Projects

This is useful for **learning how `map()` works internally**, but generally avoid doing:

```js
Array.prototype.calculate1 = ...
```

in production applications.

Why?

Because modifying built-in prototypes can:

* ⚠️ Cause naming conflicts
* ⚠️ Affect every array in the application
* ⚠️ Make code harder to reason about
* ⚠️ Conflict with libraries or future JavaScript features

Use it here only to understand the concept.

---

# 🔄 12. Complete Flow

```text
                 FUNCTIONS
                     │
                     ▼
            First-Class Citizens
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
       Store       Pass       Return
       Function   Function   Function
          │          │
          │          ▼
          │     Callback
          │          │
          │          ▼
          │   Higher-Order Function
          │          │
          └──────────┼──────────┐
                     ▼          ▼
                  map()      filter()
                               reduce()
```

---

# 📊 13. Callback vs Higher-Order Function

| Concept                   | Meaning                                                       |
| ------------------------- | ------------------------------------------------------------- |
| 📞 Callback               | Function passed to another function                           |
| 🏗️ HOF                   | Function that accepts or returns a function                   |
| 🧠 First-Class Function   | Functions can be treated like values                          |
| 🔄 Functional Programming | Programming style that heavily uses functions and composition |
| 🗺️ `map()`               | Built-in HOF used to transform arrays                         |

---

# 🎯 14. Interview Example

If interviewer asks:

### ❓ "What is a Higher-Order Function?"

Answer:

> **A Higher-Order Function is a function that takes another function as an argument or returns a function.**

Example:

```js
function calculate(arr, logic) {
    const output = [];

    for (let i = 0; i < arr.length; i++) {
        output.push(logic(arr[i]));
    }

    return output;
}
```

---

### ❓ "What is a callback?"

> **A callback is a function passed as an argument to another function, which can then execute it.**

```js
calculate(radius, area);
```

Here:

```text
area → callback
calculate → Higher-Order Function
```

---

### ❓ "Why use Higher-Order Functions?"

> To make code **reusable, modular, maintainable, and avoid repeating the same logic**.

---

# ⚡ 15. Quick Revision Cheat Sheet

```text
📞 CALLBACK
Function passed as argument
        ↓
    calculate(radius, area)


🏗️ HIGHER-ORDER FUNCTION
Function accepts/returns function
        ↓
       calculate()


🧠 FIRST-CLASS FUNCTION
Function can be:
→ Stored
→ Passed
→ Returned


🔄 FUNCTIONAL PROGRAMMING
Use functions as reusable building blocks
        ↓
Separate iteration from business logic


🗺️ map()
Built-in Higher-Order Function
        ↓
Transforms each array element
        ↓
Returns a NEW array
```

---

# 🚀 Final Mental Model

```text
radius = [3, 1, 2, 4]

        │
        ▼
     map(area)
        │
        ▼
┌───────────────────┐
│ 3 → area(3)       │
│ 1 → area(1)       │
│ 2 → area(2)       │
│ 4 → area(4)       │
└───────────────────┘
        │
        ▼
    New Array
```

> 🔑 **Remember:**
> **"Don't repeat the loop. Pass the logic."**

That is the key idea behind **Higher-Order Functions and functional programming**.
