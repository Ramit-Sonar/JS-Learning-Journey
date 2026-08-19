# 🚀 JavaScript Hoisting — Quick Notes

> **Hoisting** is JavaScript's behavior of processing declarations during the **Memory Creation Phase** before executing the code.

---

## 🧠 1. How Hoisting Works

JavaScript execution happens in two major phases:

### 📦 Memory Creation Phase

JavaScript allocates memory for variables and functions.

### ▶️ Code Execution Phase

JavaScript executes the code line by line.

```js
console.log(x);

var x = 7;
```

During memory creation:

```text
x → undefined
```

During execution:

```text
console.log(x); // undefined
x = 7;
```

> 💡 **Important:** JavaScript is synchronous and executes code line by line, but declarations are processed during the memory creation phase.

---

# 🟢 2. `var` Hoisting

```js
console.log(x);

var x = 7;
```

### Output

```text
undefined
```

### Why? 🤔

`var x` is hoisted and initialized with `undefined`.

```text
Memory Creation:
x → undefined

Execution:
console.log(x); → undefined
x = 7;
```

### ⚡ Quick Rule

> `var` → **hoisted + initialized with `undefined`**

---

# 🟢 3. Function Declaration Hoisting

Function declarations are completely hoisted.

```js
getName();

function getName() {
    console.log("Namaste Javascript");
}
```

### Output

```text
Namaste Javascript
```

The function is available during the memory creation phase.

```text
Memory Creation:
getName → function body
```

So we can call it **before its declaration**.

### ⚡ Quick Rule

> Function Declaration → **fully hoisted**

---

# 🟡 4. `let` and Temporal Dead Zone (TDZ)

```js
console.log(a);

let a = 8;
```

### Output

```text
ReferenceError
```

`let` is hoisted, but it is **not initialized with `undefined`**.

It remains inside the **Temporal Dead Zone (TDZ)** until execution reaches its declaration.

```text
Memory Creation:

a → <uninitialized>

        ↓
   Temporal Dead Zone
        ↓

let a = 8;
```

### ⚡ Quick Rule

> `let` → **hoisted + uninitialized + TDZ**

---

# 🔴 5. `const` and TDZ

```js
console.log(b);

const b = 9;
```

### Output

```text
ReferenceError
```

Just like `let`, `const` remains uninitialized inside the TDZ.

### ⚡ Quick Rule

> `const` → **hoisted + uninitialized + TDZ**

---

# 🔥 6. Function Expression

A function expression behaves like the variable that stores it.

```js
console.log(getName);

var getName = function () {
    console.log("Namaste Javascript");
};
```

### Output

```text
undefined
```

Why?

Because:

```js
var getName
```

is hoisted as:

```text
getName → undefined
```

The function is assigned only when execution reaches:

```js
var getName = function () {
    console.log("Namaste Javascript");
};
```

### ⚡ Quick Rule

> Function Expression → follows the hoisting behavior of its variable.

---

# 🚀 7. Arrow Function

Arrow functions also behave like variables when assigned to a variable.

```js
console.log(getName);

var getName = () => {
    console.log("Namaste Javascript");
};
```

### Output

```text
undefined
```

Because:

```js
var getName
```

is hoisted as:

```text
getName → undefined
```

The arrow function is assigned during execution.

### ⚡ Quick Rule

> Arrow Function → follows the hoisting behavior of the variable.

---

# 🧪 8. Complete Example

```js
console.log(x);        // undefined
console.log(a);        // ReferenceError
console.log(b);        // ReferenceError

console.log(getName);  // undefined
console.log(getName1); // undefined

var x = 7;

let a = 8;

const b = 9;

var getName = () => {
    console.log("Namaste Javascript");
};

var getName1 = function () {
    console.log("This is also a variable");
};
```

---

# 📊 9. Hoisting Cheat Sheet

| Declaration                 | Hoisted?        | Initial Value     | TDZ?  |
| --------------------------- | --------------- | ----------------- | ----- |
| `var`                       | ✅ Yes           | `undefined`       | ❌ No  |
| `let`                       | ✅ Yes           | Uninitialized     | ✅ Yes |
| `const`                     | ✅ Yes           | Uninitialized     | ✅ Yes |
| Function Declaration        | ✅ Yes           | Complete function | ❌ No  |
| Function Expression + `var` | ✅ Variable only | `undefined`       | ❌ No  |
| Arrow Function + `var`      | ✅ Variable only | `undefined`       | ❌ No  |

---

# 🧠 10. Easy Way to Remember

```text
                    HOISTING
                       │
        ┌──────────────┴──────────────┐
        │                             │
      `var`                     Function Declaration
        │                             │
   undefined                    Full Function
        │
        └──────────────┐
                       │
                Function Expression
                / Arrow Function
                       │
                  undefined
```

```text
let / const
    ↓
Hoisted
    ↓
Uninitialized
    ↓
TDZ
    ↓
ReferenceError if accessed before declaration
```

---

# 🎯 One-Line Revision

> 🟢 **`var` → `undefined`**
> 🟡 **`let` → TDZ**
> 🔴 **`const` → TDZ**
> 🔵 **Function Declaration → fully hoisted**
> 🟣 **Function Expression → variable hoisting applies**
> 🟠 **Arrow Function → variable hoisting applies**

---

## 💡 Key Concept

The most important distinction is:

```text
Function Declaration
→ Function itself is stored during memory creation.

Function Expression / Arrow Function
→ Only the variable is stored during memory creation.
→ Function is assigned during execution.
```

### 🔑 Remember

**Hoisting ≠ moving code to the top.**

It is better to think of hoisting as:

> **Declarations are processed during the memory creation phase before the execution phase begins.**
