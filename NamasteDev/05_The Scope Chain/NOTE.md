# 🔗 JavaScript — Scope Chain & Lexical Environment

> 🧠 **Core Idea:** JavaScript finds variables using the **Scope Chain**, which is determined by **where the code is written (lexically)**.

---

## 🌳 1. Example

```js
var a = 10;

function outer() {
    b = 100;

    function inner() {
        c = 1000;

        console.log(a);
        console.log(b);
        console.log(c);
    }

    inner();
}

outer();
```

### Output

```text
10
100
1000
```

---

# 📍 2. What is Lexical?

**Lexical = where the code is written**, not where the function is called.

```text
Global
  │
  └── outer()
       │
       └── inner()
```

`inner()` is written inside `outer()`, so `inner()` has access to the environment of `outer()` and the global environment.

---

# 🌍 3. Lexical Environment

Every execution context has a **Lexical Environment**.

It contains:

```text
📦 Lexical Environment
├── Variables
├── Functions
└── Reference to outer Lexical Environment
```

Example:

```text
🌍 Global Lexical Environment
        │
        │ outer reference
        ▼
📦 outer() Lexical Environment
        │
        │ outer reference
        ▼
📦 inner() Lexical Environment
```

---

# 🔗 4. Scope Chain

When JavaScript encounters:

```js
console.log(a);
```

inside `inner()`, it searches:

```text
1️⃣ inner() environment
       ↓ not found

2️⃣ outer() environment
       ↓ not found

3️⃣ Global environment
       ↓ found ✅

a = 10
```

This chain of environments is called the **Scope Chain**.

---

# 🧠 5. Variable Lookup Rule

JavaScript searches:

```text
Current Scope
      ↓
Parent Scope
      ↓
Grandparent Scope
      ↓
Global Scope
```

If found → ✅ use the value.

If not found anywhere → ❌ `ReferenceError`.

---

# 👶 6. Child Can Access Parent

```js id="j5lq0x"
var a = 10;

function outer() {
    var b = 20;

    function inner() {
        console.log(a); // ✅
        console.log(b); // ✅
    }

    inner();
}
```

`inner()` can access:

```text
inner → outer → global
```

So it can access both `b` and `a`.

---

# 🚫 7. Parent Cannot Access Child

```js id="zq8e4p"
function outer() {

    function inner() {
        var c = 30;
    }

    console.log(c); // ❌
}
```

`c` belongs to `inner()`.

The parent cannot search **downward** into the child.

```text
outer
  ↓
inner

✅ inner → outer
❌ outer → inner
```

---

# 🎯 8. Your Example's Scope Chain

```text
🌍 Global
│
│ a = 10
│
└── outer()
    │
    │ b = 100
    │
    └── inner()
        │
        │ c = 1000
        │
        ├── find c → current scope ✅
        ├── find b → outer scope ✅
        └── find a → global scope ✅
```

Therefore:

```text
console.log(a) → 10
console.log(b) → 100
console.log(c) → 1000
```

---

# ⚡ 9. Quick Revision

### 📌 Lexical

> **Where the function/code is written determines its scope.**

### 📌 Lexical Environment

> Stores **variables, functions, and a reference to the outer lexical environment**.

### 📌 Scope Chain

> JavaScript searches from **current scope → parent scope → global scope** to find a variable.

### 📌 Direction

```text
Child → Parent → Global ✅

Parent → Child ❌
```

### 🔑 One-Line Memory Trick

> **"Look where I am → then go outward until I find it."**
