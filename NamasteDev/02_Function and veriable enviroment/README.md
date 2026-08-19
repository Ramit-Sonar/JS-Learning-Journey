# 🌍 JavaScript — Function & Variable Environment

> 🧠 **Core Idea:** Every time a function is called, JavaScript creates a **new Function Execution Context** with its own **Variable Environment**.

---

## 🚀 1. Example

```js
var x = 1;

a();

b();

console.log(x);

function a() {
    var x = 10;
    console.log(10);
}

function b() {
    var x = 100;
    console.log(x);
}
```

### 🖥️ Output

```text
10
100
1
```

---

# 🧠 2. Why does this happen?

At the global level:

```js
var x = 1;
```

So the **Global Execution Context** has:

```text
Global Variable Environment

x → 1
a → function
b → function
```

When JavaScript executes:

```js
a();
```

it creates a **new execution context for `a()`**.

---

# 📦 3. Function `a()` Environment

```js
function a() {
    var x = 10;
    console.log(10);
}
```

When `a()` is called:

```text
a() Execution Context

Local Variable Environment
        ↓
       x → 10
```

This `x` is **different from the global `x`**.

```text
Global x → 1

       ↓ a()

Local x → 10
```

So:

```js
console.log(10);
```

prints:

```text
10
```

After `a()` finishes, its execution context is removed from the call stack.

---

# 📦 4. Function `b()` Gets Its Own Environment

Then:

```js
b();
```

creates another execution context.

```text
b() Execution Context

Local Variable Environment
        ↓
       x → 100
```

So:

```js
console.log(x);
```

prints:

```text
100
```

This `x` is also completely separate from:

```js
var x = 1;
```

---

# 🌍 5. Back to Global Environment

After `b()` finishes:

```js
console.log(x);
```

JavaScript is back in the **Global Execution Context**.

The global `x` is still:

```text
x → 1
```

Therefore:

```text
1
```

is printed.

---

# 🔥 6. Important Concept: Each Function Has Its Own Variable Environment

Think of it like separate boxes 📦:

```text
🌍 Global Environment
┌─────────────────┐
│ x → 1           │
│ a → function    │
│ b → function    │
└─────────────────┘
         │
         │ a()
         ▼
📦 a() Environment
┌─────────────────┐
│ x → 10          │
└─────────────────┘

         │
         │ b()
         ▼
📦 b() Environment
┌─────────────────┐
│ x → 100         │
└─────────────────┘
```

### 🎯 Key Point

> **The same variable name can exist in different function environments without conflict.**

---

# 🧩 7. Variable Scope

```js
var x = 1;

function a() {
    var x = 10;
}
```

There are two different `x` variables:

```text
Global x → 1
Local x  → 10
```

The local `x` inside `a()` does **not change** the global `x`.

So:

```js
var x = 1;

function a() {
    var x = 10;
}

a();

console.log(x);
```

Output:

```text
1
```

---

# 🔍 8. How JavaScript Finds a Variable

Suppose:

```js
var x = 1;

function a() {
    var y = 10;
    console.log(x);
}
```

Inside `a()` JavaScript first looks in the **local environment**:

```text
Does a() have x?
        ↓
       ❌ No
        ↓
Check outer/global environment
        ↓
       ✅ x = 1
```

This connection between an execution context and its outer environment is the foundation of the **Scope Chain**.

---

# ⚡ 9. Execution Context Flow

For this code:

```js
var x = 1;

a();

b();

console.log(x);
```

The call stack roughly behaves like:

```text
┌──────────────────────┐
│ Global Execution     │
│ Context              │
└──────────┬───────────┘
           │
           │ a()
           ▼
┌──────────────────────┐
│ a() Execution        │
│ Context              │
│ x → 10               │
└──────────┬───────────┘
           │
           │ return
           ▼
┌──────────────────────┐
│ Global Execution     │
│ Context              │
└──────────┬───────────┘
           │
           │ b()
           ▼
┌──────────────────────┐
│ b() Execution        │
│ Context              │
│ x → 100              │
└──────────┬───────────┘
           │
           │ return
           ▼
┌──────────────────────┐
│ Global Execution     │
│ Context              │
│ x → 1                │
└──────────────────────┘
```

---

# 🧠 10. Quick Revision

```text
🌍 Global Execution Context
        ↓
   Global Variables
        ↓
      x = 1

        ↓ a()

📦 New Function Execution Context
        ↓
   Local Variable Environment
        ↓
      x = 10

        ↓ return

        ↓ b()

📦 New Function Execution Context
        ↓
   Local Variable Environment
        ↓
      x = 100

        ↓ return

🌍 Back to Global
        ↓
      x = 1
```

---

# 🎯 Remember This

### 🔑 Rule 1

**Every function call creates a new execution context.**

### 🔑 Rule 2

**Each execution context has its own variable environment.**

### 🔑 Rule 3

**Local variables are separate from global variables.**

### 🔑 Rule 4

**The same variable name can exist in multiple environments.**

### 🔑 Rule 5

**When a function finishes, its execution context is removed from the call stack.**

### 🔑 Rule 6

**If JavaScript cannot find a variable in the current environment, it looks in the outer environment through the scope chain.**

---

## 📝 One-Line Memory Trick

> **New function call → New execution context → New variable environment → Local variables live there.**
