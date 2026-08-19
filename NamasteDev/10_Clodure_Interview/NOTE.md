# 🔐 JavaScript — Closures: Interview Quick Notes

> 🧠 **Core Idea:** A **closure** is a function bundled with references to the variables from its **lexical environment**. It allows the function to remember and access those variables even after the outer function has finished execution.

---

# 🔹 1. Closure with Multiple Scopes

```js
function outest(b) {
    var c = 1000;

    function outer() {
        function inner() {
            console.log(a, c, b);
        }

        let a = 10;

        return inner;
    }

    return outer;
}

var close = outest("hello")()();
```

### 🔍 What happens?

```text
outest("hello")
      ↓
   b = "hello"
   c = 1000
      ↓
   outer()
      ↓
   a = 10
      ↓
   inner()
      ↓
Can access:
a → 10
c → 1000
b → "hello"
```

### 🧠 Important

`inner()` can access variables from:

```text
inner
  ↓
outer
  ↓
outest
  ↓
global
```

This happens because of the **scope chain + closure**.

---

# 🔐 2. Closure for Data Hiding

Closures can be used to create **private variables**.

```js
function counter() {
    var count = 0;

    return function countIncrement() {
        count++;
        console.log(count);
    };
}

var counter1 = counter();

counter1();
counter1();
counter1();
```

### Output

```text
1
2
3
```

`count` cannot be directly accessed:

```js
console.log(count); // ❌ ReferenceError
```

But the returned function can access it:

```text
Outside
   │
   └── ❌ count

Closure
   │
   └── ✅ count
```

### 🎯 This provides:

* 🔒 Data hiding
* 🔐 Encapsulation
* 🧠 Persistent state

---

# 🏗️ 3. Constructor Function + Closure

```js
function Counter() {
    var count = 0;

    this.incrementCounter = function () {
        count++;
        console.log(count);
    };

    this.decrementCounter = function () {
        count--;
        console.log(count);
    };
}

var counter2 = new Counter();

counter2.incrementCounter();
counter2.incrementCounter();
counter2.incrementCounter();

counter2.decrementCounter();
```

The `count` variable is private.

Only these functions can access it:

```text
Counter()
│
├── count → private 🔒
│
├── incrementCounter() → can access count
│
└── decrementCounter() → can access count
```

Outside code cannot directly do:

```js
counter2.count;
```

because `count` is not a property of the object.

---

# 🧠 4. Why Does Closure Remember Variables?

```js
function counter() {
    var count = 0;

    return function () {
        count++;
        console.log(count);
    };
}

var counter1 = counter();
```

When `counter()` finishes, normally its execution context is removed.

But the returned function still needs `count`.

Therefore, the required lexical environment remains reachable.

```text
counter()
   │
   ├── count = 0
   │
   └── returned function
           │
           └── remembers count
```

So:

```js
counter1();
counter1();
```

uses the **same remembered `count`**.

---

# 🗑️ 5. Closure & Garbage Collection

Consider:

```js
function a() {
    var x = 0;
    var z = 10;

    return function b() {
        console.log(x);
    };
}

var y = a();

y();
```

The returned function `b()` still needs `x`.

So `x` remains reachable through the closure.

But `z` is not used by `b()`.

Conceptually:

```text
a()
│
├── x → 0  🔒 retained
│
└── z → 10 🗑️ eligible for garbage collection
```

> 🧠 The garbage collector removes objects/values that are no longer reachable. A closure does **not automatically keep every variable from the outer function alive**; only values that remain reachable through the closure may need to be retained.

---

# ⚠️ 6. Disadvantages of Closures

Closures are powerful, but they can have drawbacks.

### 🧠 Memory Usage

If a closure keeps references to large objects or data that are no longer needed, those objects may remain reachable and cannot be garbage-collected.

```text
Outer Function
      ↓
Closure
      ↓
Large Object
      ↓
Still reachable 🔒
      ↓
Cannot be garbage collected yet
```

### Possible Problems

* 📈 Increased memory usage
* 🐛 Memory leaks if references are unintentionally retained
* 🔍 Can make debugging more difficult

> ⚠️ **Closure itself is not a memory leak.** A problem occurs when something unnecessarily keeps large/unneeded data reachable.

---

# 🎯 7. Closure — Interview Definition

### ⭐ Short Answer

> **A closure is created when a function remembers references to variables from its lexical environment, allowing it to access those variables even after the outer function has finished execution.**

---

# 🔥 8. Most Common Interview Questions

### ❓ Why does the counter continue increasing?

Because the returned function forms a closure over `count` and keeps accessing the **same lexical binding**.

---

### ❓ How does closure provide data hiding?

Variables inside the outer function are not directly accessible from outside, but the returned inner function can access them.

```text
Private Variable
      ↓
    Closure
      ↓
Public Function
      ↓
Controlled Access
```

---

### ❓ Does closure keep the entire outer function alive?

❌ Not necessarily.

Only the variables/data that remain reachable through the closure need to be retained.

---

### ❓ What is the relationship between closure and garbage collection?

> If a closure still references a variable, that variable remains reachable and cannot be garbage-collected. Once nothing can reach it, it becomes eligible for garbage collection.

---

### ❓ What is the disadvantage of closure?

> Closures can increase memory usage when they retain references to data that is no longer needed.

---

# 🧠 9. Final Closure Cheat Sheet

```text
              🔐 CLOSURE
                  │
        Function + Lexical Environment
                  │
                  ▼
          Remembers variables
                  │
        ┌─────────┼─────────┐
        ▼         ▼         ▼
   Data Hiding  State    Callbacks
                 │
                 ▼
              Counters
```

### ⚡ Remember

> **Closure = Function + Remembered Lexical Environment**

> **Closure → Data Hiding → Persistent State → Encapsulation**

> **Garbage Collector → Removes unreachable data**

> **Closure ≠ Memory Leak**
> A closure only causes a memory concern when it unnecessarily retains data.
