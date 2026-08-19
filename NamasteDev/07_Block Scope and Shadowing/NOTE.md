# 🧱 JavaScript — Block Scope & Shadowing

> 🧠 **Core Idea:** `let` and `const` are **block scoped**, while `var` is **function scoped**. This difference is important when understanding **shadowing**.

---

# 🧱 1. What is Block Scope?

A block is code inside `{ }`.

```js
{
    let a = 10;
    const b = 20;
}
```

`let` and `const` are limited to that block.

```js
{
    let a = 10;
    const b = 20;

    console.log(a); // ✅
    console.log(b); // ✅
}

console.log(a); // ❌ ReferenceError
console.log(b); // ❌ ReferenceError
```

### 🔑 Rule

> `let` and `const` respect `{ }` block boundaries.

---

# 🟡 2. `var` and Block Scope

`var` does **not** create a scope for a normal `{ }` block.

```js
var a = 100;

{
    var a = 10;
}

console.log(a);
```

Output:

```text
10
```

Both `var a` declarations refer to the **same variable** in this context.

```text
Global Scope
┌─────────────┐
│ a → 10      │
└─────────────┘
       ↑
   same variable
       ↑
Block { }
var a = 10
```

### 🔑 Rule

> `var` ignores normal `{ }` blocks but respects **function boundaries**.

---

# 👤 3. What is Shadowing?

**Shadowing** occurs when a variable in an inner scope has the **same name** as a variable in an outer scope.

```js
let a = 10;

{
    let a = 100;

    console.log(a); // 100
}

console.log(a); // 10
```

There are **two different variables**:

```text
🌍 Outer Scope
a → 10

   ↓

📦 Block Scope
a → 100
```

The inner `a` **shadows** the outer `a`.

---

# 🟢 4. `let` Shadowing

```js
let a = 10;

{
    let a = 100;

    console.log(a); // 100
}

console.log(a); // 10
```

✅ Allowed because the two `a`s belong to different scopes.

---

# 🔵 5. `const` Shadowing

Same behavior as `let`:

```js
const a = 10;

{
    const a = 100;

    console.log(a); // 100
}

console.log(a); // 10
```

✅ Allowed.

The two variables have different bindings.

---

# 🟡 6. `var` Function Shadowing

`var` is function scoped.

```js
var a = 100;

function show() {
    var a = 1000;

    console.log(a); // 1000
}

show();

console.log(a); // 100
```

There are two different variables:

```text
🌍 Global Scope
a → 100

      ↓

📦 Function Scope
a → 1000
```

The function's `a` shadows the global `a`.

---

# ⚠️ 7. `var` Inside a Normal Block

```js
var a = 100;

{
    var a = 10;

    console.log(a); // 10
}

console.log(a); // 10
```

This is **NOT shadowing**.

Why?

Because `var` does not create a new scope for the normal block.

```text
🌍 Global / Function Scope

a → 100
 ↓
var a = 10
 ↓
a → 10
```

There is only **one variable**.

---

# 🧩 8. Your Example

```js
var a = 100;
let b = 200;
const c = 300;

{
    var a = 10;
    let b = 20;
    const c = 30;

    console.log(a); // 10
    console.log(b); // 20
    console.log(c); // 30
}

console.log(a); // 10
console.log(b); // 200
console.log(c); // 300
```

### Why?

```text
🌍 Outer Scope
├── a → 10        ← same var
├── b → 200
└── c → 300

📦 Block Scope
├── b → 20        ← new variable
└── c → 30        ← new variable
```

`var a` is the **same variable**, while `let b` and `const c` create new block-scoped variables.

---

# 📊 9. Quick Comparison

| Situation                        | `var`         | `let`        | `const`      |
| -------------------------------- | ------------- | ------------ | ------------ |
| Normal `{ }` block creates scope | ❌             | ✅            | ✅            |
| Function creates scope           | ✅             | ✅            | ✅            |
| Same name inside block           | Same variable | New variable | New variable |
| Block shadowing                  | ❌             | ✅            | ✅            |
| Function shadowing               | ✅             | ✅            | ✅            |

---

# 🎯 10. Easy Memory Trick

```text
        SCOPE
          │
    ┌─────┴─────┐
    │           │
  var         let/const
    │           │
Function      Block
 Scope        Scope
    │           │
    ↓           ↓
 ignores {}   respects {}
```

### 🔑 Final Rule

> 🟡 **`var` → Function Scoped**
> 🟢 **`let` → Block Scoped**
> 🔵 **`const` → Block Scoped**

And:

> **Shadowing = Inner scope has another variable with the same name as an outer-scope variable.**

```text
let/const + block    → Shadowing ✅
var + function       → Shadowing ✅
var + normal block   → No shadowing ❌
```
