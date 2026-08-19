# 🟦 JavaScript — `var`, `let` & `const`

> 🧠 **Core Idea:** `var`, `let`, and `const` are used to declare variables, but they differ in **scope, redeclaration, reassignment, hoisting, and TDZ**.

---

## 🔹 1. `var`

```js
var a = 10;

a = 20;      // ✅ Reassignment allowed
var a = 30;  // ✅ Redeclaration allowed

console.log(a);
```

Output:

```text
30
```

### `var` allows:

* ✅ Reassignment
* ✅ Redeclaration
* ✅ Hoisting
* ⚠️ Can be accessed before declaration → `undefined`

```js
console.log(a);

var a = 10;
```

Output:

```text
undefined
```

---

# 🟢 2. `let`

```js
let b = 10;

b = 20;      // ✅ Reassignment allowed

// let b = 30; // ❌ Redeclaration not allowed
```

### `let` allows:

* ✅ Reassignment
* ❌ Redeclaration in the same scope
* ✅ Hoisted
* ❌ Cannot access before initialization
* ⚠️ Has **Temporal Dead Zone (TDZ)**

```js
console.log(a);

let a = 10;
```

Output:

```text
ReferenceError
```

### Why?

`let` is hoisted, but it remains **uninitialized** until execution reaches:

```js
let a = 10;
```

```text
Memory Creation
      ↓
a → <uninitialized>
      ↓
     TDZ
      ↓
let a = 10
      ↓
a → 10
```

---

# 🔴 3. `const`

```js
const c = 10;

// c = 20;      // ❌ Reassignment not allowed
// const c = 30; // ❌ Redeclaration not allowed
```

### `const` allows:

* ❌ Reassignment
* ❌ Redeclaration
* ✅ Hoisted
* ❌ Access before initialization
* ⚠️ Has **TDZ**
* ⚠️ Must be initialized when declared

```js
const c; // ❌ SyntaxError
```

You must write:

```js
const c = 10;
```

---

# 📊 4. Quick Comparison

| Feature                       | `var` 🟡    | `let` 🟢      | `const` 🔴    |
| ----------------------------- | ----------- | ------------- | ------------- |
| Reassignment                  | ✅           | ✅             | ❌             |
| Redeclaration                 | ✅           | ❌             | ❌             |
| Hoisted                       | ✅           | ✅             | ✅             |
| Initial value during hoisting | `undefined` | Uninitialized | Uninitialized |
| TDZ                           | ❌           | ✅             | ✅             |
| Must initialize immediately   | ❌           | ❌             | ✅             |
| Block scoped                  | ❌           | ✅             | ✅             |

---

# 🧠 5. Hoisting Difference

```js
console.log(a);
console.log(b);

let a = 10;
var b = 100;
```

Result:

```text
ReferenceError
undefined
```

### Why?

```text
var b
 ↓
undefined
```

But:

```text
let a
 ↓
uninitialized
 ↓
TDZ
```

---

# 📦 6. Block Scope

`let` and `const` are **block scoped**.

```js
{
    let a = 10;
    const b = 20;

    console.log(a); // ✅
    console.log(b); // ✅
}

console.log(a); // ❌
console.log(b); // ❌
```

But `var` is **not block scoped**:

```js
{
    var x = 10;
}

console.log(x); // ✅ 10
```

---

# 🎯 7. Easy Memory Trick

```text
var
 ↓
Can change 🔄
Can redeclare 🔁
No TDZ

let
 ↓
Can change 🔄
Cannot redeclare ❌
Has TDZ ⚠️

const
 ↓
Cannot change ❌
Cannot redeclare ❌
Has TDZ ⚠️
Must initialize immediately
```

---

# 🔑 One-Line Revision

> 🟡 **`var` → Reassign ✅ + Redeclare ✅ + TDZ ❌**
> 🟢 **`let` → Reassign ✅ + Redeclare ❌ + TDZ ✅**
> 🔴 **`const` → Reassign ❌ + Redeclare ❌ + TDZ ✅**

### ⭐ Modern JavaScript Rule

> Prefer **`const` by default**, use **`let` when the value needs to change**, and generally avoid `var` in modern JavaScript.
