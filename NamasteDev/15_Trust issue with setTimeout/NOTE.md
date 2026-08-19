# 🧠 JavaScript Concurrency Model & `setTimeout()`

> 📅 **Learning Notes — 19 August 2026**
> 🎯 **Topic:** JavaScript Concurrency Model, Main Thread Blocking & the Trust Issue with `setTimeout()`

---

## 📌 What is the JavaScript Concurrency Model?

JavaScript is **single-threaded**, which means it has only **one Call Stack** where JavaScript code executes.

However, JavaScript applications can still handle asynchronous operations such as:

* ⏱️ `setTimeout()`
* 🌐 API / Network requests
* 🖱️ DOM Events
* 🤝 Promises
* 📦 Other asynchronous operations

This is possible because the **JavaScript Runtime** works with JavaScript using:

```text
                JavaScript Runtime
                       │
          ┌────────────┼────────────┐
          ↓            ↓            ↓
      Call Stack    Web APIs      Queues
          │                         │
          └────────── Event Loop ───┘
```

### 🔑 Main Components

| Component                   | Responsibility                                             |
| --------------------------- | ---------------------------------------------------------- |
| 🥞 **Call Stack**           | Executes JavaScript code                                   |
| 🌐 **Web APIs / Host APIs** | Handle asynchronous operations                             |
| 📥 **Callback Queue**       | Stores callbacks waiting to execute                        |
| ⚡ **Microtask Queue**       | Stores Promise callbacks and other microtasks              |
| 🔄 **Event Loop**           | Coordinates when queued callbacks can enter the Call Stack |

---

# 🚨 Blocking the Main Thread

Because JavaScript is **single-threaded**, if we execute a long-running synchronous operation, the **Call Stack remains busy**.

While the Call Stack is busy:

> ❌ JavaScript cannot execute another callback.

We can simulate blocking the main thread using a `while` loop.

---

## 🧪 Simulation: Blocking the Main Thread

```javascript
console.log("start");

setTimeout(() => {
    console.log("Timer");
}, 5000);

console.log("End");

// Simulation of blocking the main thread for 10 seconds

let startDate = new Date().getTime();
let endDate = startDate;

while (endDate <= startDate + 10000) {
    endDate = new Date().getTime();
}

console.log("While end");
```

### 🖥️ Output

```text
start
End
While end
Timer
```

### 🤔 What happened?

We specified:

```javascript
setTimeout(() => {
    console.log("Timer");
}, 5000);
```

So the timer becomes eligible after approximately **5 seconds**.

But our `while` loop blocks the **main thread for 10 seconds**.

```text
0 sec
│
├── setTimeout(5000)
│
├── Call Stack becomes busy
│
│   while loop
│   ↓
│   ↓
│   ↓
│
5 sec ── Timer is ready
│
│      ❌ But Call Stack is still busy
│
10 sec ── while loop finishes
│
├── "While end"
│
└── Timer callback gets executed
```

Therefore, the timer executes **after approximately 10 seconds**, even though we specified **5 seconds**.

---

# ⚠️ The Trust Issue with `setTimeout()`

This demonstrates an important rule:

> ### `setTimeout()` does NOT guarantee that the callback will execute exactly after the specified delay.

Instead:

> **The delay is the minimum time before the callback becomes eligible to run.**

For example:

```javascript
setTimeout(callback, 5000);
```

does **NOT** mean:

```text
Execute callback exactly after 5 seconds ❌
```

It means approximately:

```text
Wait at least 5 seconds
        ↓
Callback becomes eligible
        ↓
Wait for Call Stack to become free
        ↓
Execute callback
```

### 🧠 Remember

```text
setTimeout(5000)
       ↓
Minimum delay ≠ Exact execution time
```

The callback can execute **later than 5 seconds** if the Call Stack is busy.

---

# ⏱️ `setTimeout()` with `0` Milliseconds

Now let's see what happens when we provide `0` as the delay.

```javascript
console.log("start");

setTimeout(() => {
    console.log("Timer");
}, 0);

console.log("End");
```

### 🖥️ Output

```text
start
End
Timer
```

---

## 🤔 Why doesn't `Timer` print immediately?

Because:

```javascript
setTimeout(..., 0);
```

does **not** mean:

> "Execute this callback immediately."

Instead, the callback is scheduled to run asynchronously.

The flow is approximately:

```text
console.log("start")
        ↓
setTimeout(..., 0)
        ↓
Timer callback is registered
        ↓
console.log("End")
        ↓
Call Stack becomes empty
        ↓
Event Loop
        ↓
Callback Queue
        ↓
Call Stack
        ↓
console.log("Timer")
```

Therefore:

```text
start
End
Timer
```

---

# 🔥 Important Rule

### `setTimeout(fn, 0)` does NOT mean "run now".

It means:

> **Schedule the callback to run as soon as possible after the timer is eligible and the Call Stack is available.**

So even:

```javascript
setTimeout(callback, 0);
```

has to wait for the current synchronous code to finish.

---

# 🧠 Quick Revision

### JavaScript Concurrency Model

> JavaScript is single-threaded, but the JavaScript Runtime provides mechanisms such as APIs, queues, and the Event Loop to coordinate asynchronous operations.

### Main Thread

> JavaScript executes synchronous code on the Call Stack. A long-running synchronous task can block the main thread.

### `setTimeout()`

> `setTimeout()` specifies a **minimum delay**, not an exact execution time.

### `setTimeout(fn, 0)`

> `0ms` does not mean immediate execution. The callback still waits until the current synchronous execution finishes and it can be processed.

---

# 🎯 Most Important Takeaway

```text
             setTimeout()
                  │
                  ↓
          Minimum delay expires
                  │
                  ↓
          Callback becomes ready
                  │
                  ↓
        Is Call Stack empty?
             ↙         ↘
           NO           YES
           ↓             ↓
        WAIT          Execute
```

### ⭐ Golden Rule

> **The Event Loop does not interrupt running JavaScript code.**

If the Call Stack is busy, asynchronous callbacks **must wait**.

---

## 📝 One-Line Memory Trick

> **`setTimeout()` guarantees a minimum delay, NOT an exact execution time.**

And:

> **Blocking the Call Stack blocks JavaScript callbacks from executing.**

---

## 🔗 Concepts Connected Today

```text
JavaScript
    │
    ├── Single Thread
    │
    ├── Call Stack
    │
    ├── Main Thread
    │
    ├── JavaScript Runtime
    │
    ├── Web APIs / Host APIs
    │
    ├── Callback Queue
    │
    ├── Microtask Queue
    │
    ├── Event Loop
    │
    └── setTimeout()
            │
            └── Minimum Delay ≠ Exact Execution Time
```

> 🚀 **Today's core lesson:** JavaScript is single-threaded, and asynchronous behavior doesn't mean JavaScript suddenly gets another Call Stack. The runtime and Event Loop coordinate asynchronous callbacks, but those callbacks still have to wait for the main Call Stack to become available.
