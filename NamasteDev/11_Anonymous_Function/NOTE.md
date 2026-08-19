# 🧩 JavaScript — Functions: Anonymous, Expression & First-Class Functions

> 🧠 **Core Idea:** In JavaScript, functions are **first-class citizens**, meaning functions can be treated like values.

---

# 1️⃣ Function Statement / Declaration

```js
a();

function a() {
    console.log("a called");
}
```

Output:

```text
a called
```

✅ Function declarations are **fully hoisted**, so they can be called before their definition.

---

# 2️⃣ Function Expression

```js
console.log(b); // undefined

// b(); ❌ TypeError

var b = function () {
    console.log("b called");
};
```

Here, the function is assigned to the variable `b`.

During hoisting:

```text
b → undefined
```

So:

```js
b();
```

before assignment results in:

```text
TypeError: b is not a function
```

### 🔑 Difference

```text
Function Declaration
→ Function itself is hoisted
→ Can call before definition ✅

Function Expression
→ Variable is hoisted
→ Function assigned during execution
→ Cannot call before assignment ❌
```

---

# 3️⃣ Anonymous Function

A function **without a name** is called an **Anonymous Function**.

```js
var b = function () {
    console.log("b called");
};
```

The function itself has no name:

```text
function () { ... }
     ↑
   no name
```

It is commonly used when a function is being treated as a value.

### ❌ Invalid standalone anonymous function

```js
function () {
    console.log("hello");
}
```

This is invalid as a standalone function declaration because a function declaration needs a name.

### ✅ Common uses

```js
setTimeout(function () {
    console.log("Hello");
}, 1000);
```

Here the anonymous function is passed as a value.

---

# 4️⃣ Named Function Expression

```js
var c = function xyz() {
    console.log("c called");
    console.log(xyz);
};

c();
```

Here:

```text
Variable name → c
Function name → xyz
```

`xyz` is available **inside the function body**:

```js
console.log(xyz); // ✅
```

But:

```js
xyz(); // ❌ ReferenceError
```

because `xyz` is not available as a variable in the surrounding scope.

### 🧠 Remember

> **Named Function Expression = Function Expression + Function Name**

---

# 5️⃣ Parameter vs Argument

```js
function a(param1) {
    console.log(param1);
}

a(1);
```

```text
param1 → Parameter
1      → Argument
```

### Easy Trick

> **Parameter = placeholder**
> **Argument = actual value**

---

# 6️⃣ First-Class Functions ⭐

JavaScript treats functions like values.

This means a function can be:

### 📦 Stored in a variable

```js
var fn = function () {
    console.log("Hello");
};
```

### 📤 Passed as an argument

```js
function execute(callback) {
    callback();
}

execute(function () {
    console.log("Hello");
});
```

### 📥 Returned from another function

```js
function outer() {
    return function () {
        console.log("Hello");
    };
}
```

### 🔑 Definition

> **First-class functions mean functions can be assigned to variables, passed as arguments, and returned from other functions.**

---

# 🎯 Quick Revision

```text
Function Declaration
→ Fully hoisted
→ Can call before definition ✅

Function Expression
→ Stored in variable
→ Function assigned during execution

Anonymous Function
→ Function without a name

Named Function Expression
→ Function expression with a name
→ Name accessible inside function

Parameter
→ Placeholder in function definition

Argument
→ Actual value passed to function

First-Class Function
→ Function can be:
   📦 Stored
   📤 Passed
   📥 Returned
```

### ⚡ One-Line Memory Trick

> **JavaScript treats functions as values — store them, pass them, and return them.**
