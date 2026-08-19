# 🔐 JavaScript — Closures

> 🧠 **Core Idea:** A **closure** is created when a function remembers and can access variables from its **lexical scope**, even after the outer function has finished executing.

---

# 🔹 1. Basic Example

```js
function x() {
    let a = 10;

    function y() {
        console.log(a);
    }

    return y;
}

let b = x();

b();
```

### Output

```text
10
```

### 🤔 Why?

When `x()` executes:

```text
x()
│
├── a → 10
│
└── y() → remembers `a`
```

Even after `x()` finishes, `y` still has access to `a`.

```text
y() + lexical environment
        ↓
      closure
```

> 🔑 **A closure = function + its remembered lexical environment.**

---

# 🔗 2. How Closure Works

```js
let b = x();
```

`x()` returns `y`.

But `y` doesn't return **alone**.

Conceptually:

```text
┌────────────────────────────┐
│ y function                 │
│                            │
│ +                          │
│                            │
│ Lexical Environment        │
│ a → 10                     │
└────────────────────────────┘
             ↓
          Closure
```

So when:

```js
b();
```

runs, `y()` remembers:

> **"I was created inside `x()`, where `a = 10`."**

---

# 🔥 3. Counter Example

Closures are extremely useful for maintaining **private state**.

```js
function createCounter() {
    let count = 0;

    return function () {
        count++;
        console.log(count);
    };
}

const counter = createCounter();

counter();
counter();
counter();
counter();
counter();
```

### Output

```text
1
2
3
4
5
```

---

# 🧠 4. Why Doesn't `count` Reset?

You might think:

```text
counter() → count = 0 → +1 → 1
counter() → count = 0 → +1 → 1
counter() → count = 0 → +1 → 1
```

❌ But that's not what happens.

`createCounter()` is called **only once**:

```js
const counter = createCounter();
```

It creates:

```text
count → 0
   ↓
closure remembers count
```

Every time `counter()` runs, it accesses the **same remembered `count`**.

```text
counter()
   ↓
count = 1

counter()
   ↓
count = 2

counter()
   ↓
count = 3
```

---

# 🔐 5. Closure Creates Private State

```js
function createCounter() {
    let count = 0;

    return function () {
        count++;
        console.log(count);
    };
}
```

You cannot directly access `count`:

```js
console.log(count); // ❌ ReferenceError
```

But the returned function can access it.

```text
Outside
   │
   └── ❌ count

Closure
   │
   └── ✅ count
```

This is why closures are commonly used to create **private data/state**.

---

# 🌐 6. Real-World Example — API Service

```js
function createApiService(baseURL) {

    return function (endpoint) {
        return fetch(baseURL + endpoint);
    };
}

const api = createApiService("https://example.com/api");

api("/users");
api("/jobs");
api("/profile");
```

When:

```js
const api = createApiService("https://example.com/api");
```

the returned function remembers:

```text
baseURL
   ↓
"https://example.com/api"
```

So:

```js
api("/users");
```

becomes conceptually:

```js
fetch("https://example.com/api/users");
```

And:

```js
api("/jobs");
```

becomes:

```js
fetch("https://example.com/api/jobs");
```

---

# 📦 7. Closure Visualization

```text
createApiService(baseURL)
          │
          │
          ▼
┌──────────────────────────────┐
│ baseURL                      │
│ "https://example.com/api"    │
│                              │
│ Returned function            │
│ (endpoint) => fetch(...)     │
└──────────────────────────────┘
              │
              ▼
             api
              │
       ┌──────┼──────┐
       ▼      ▼      ▼
    /users   /jobs  /profile
       │      │       │
       ▼      ▼       ▼
     API     API     API
```

---

# 🎯 8. When Do Closures Happen?

A closure commonly occurs when:

```text
Outer Function
      ↓
Creates Inner Function
      ↓
Inner Function accesses Outer variables
      ↓
Inner Function survives after Outer finishes
      ↓
          🔐 Closure
```

---

# 🧠 9. Quick Revision

### 🔑 Closure

> **Function + remembered lexical environment = Closure**

### 🔑 Why?

Because the inner function can access variables from its outer scope even after the outer function has finished.

### 🔑 Common Uses

* 🔐 Private variables/state
* 🔢 Counters
* 🌐 API/service configuration
* ⏱️ Callbacks
* 🎯 Event handlers
* 🏭 Function factories
* ⚛️ React hooks and callbacks often rely on closure behavior

---

# ⚡ One-Line Memory Trick

```text
Outer Function
      ↓
Inner Function remembers outer variables
      ↓
Outer finishes
      ↓
Inner still remembers
      ↓
🔐 CLOSURE
```

> **"Closure means a function remembers where it was created."**
