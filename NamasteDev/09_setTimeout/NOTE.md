# ⏱️ JavaScript — `setTimeout()` & Closures

> 🧠 **Core Idea:** `setTimeout()` does **not block JavaScript**. The timer is handled by the **Web API**, and its callback runs later through the **Callback Queue + Event Loop**.

---

# ⏱️ 1. Basic `setTimeout()`

```js
function x() {
    var i = 10;

    setTimeout(() => {
        console.log(i);
    }, 1000);

    console.log("hii ramit");
}

x();
```

### Output

```text
hii ramit
10
```

After approximately **1 second**, `10` is printed.

### Why?

JavaScript does **not wait** for the timer.

```text
JavaScript
   │
   ├── setTimeout()
   │       ↓
   │    Browser Web API
   │       ↓
   │    Timer starts
   │
   └── console.log()
           ↓
      "hii ramit"

After timer finishes
        ↓
 Callback Queue
        ↓
 Event Loop
        ↓
 Callback executes
        ↓
        10
```

> ⚡ **`setTimeout()` schedules a callback; it does not pause JavaScript execution.**

---

# 🔄 2. `var` + `setTimeout()` Problem

```js
function x() {
    for (var i = 1; i <= 5; i++) {
        setTimeout(function () {
            console.log(i);
        }, 1000 * i);
    }

    console.log("hii ramit");
}

x();
```

### Output

```text
hii ramit
6
6
6
6
6
```

The callbacks run after the loop has already finished.

At that time:

```text
i = 6
```

### Why all callbacks print `6`?

Because `var` is **function scoped**.

All callbacks close over the **same `i` binding**:

```text
             i
             ↓
        ┌─────────┐
        │    6    │
        └─────────┘
          ↑ ↑ ↑ ↑ ↑
          │ │ │ │ │
        callback callbacks
```

The callbacks don't store separate copies of `i`.

They remember the **same variable**.

---

# 🟢 3. Solution Using `let`

```js
function x() {
    for (let i = 1; i <= 5; i++) {
        setTimeout(function () {
            console.log(i);
        }, 1000 * i);
    }

    console.log("hii ramit");
}

x();
```

### Output

```text
hii ramit
1
2
3
4
5
```

### Why?

`let` is **block scoped**.

Each loop iteration gets a separate `i` binding that its callback closes over.

```text
Iteration 1 → i = 1 → callback remembers 1
Iteration 2 → i = 2 → callback remembers 2
Iteration 3 → i = 3 → callback remembers 3
Iteration 4 → i = 4 → callback remembers 4
Iteration 5 → i = 5 → callback remembers 5
```

---

# 🔵 4. Solution Using a Function + Closure

You can also create a new function scope for every iteration:

```js
function x() {
    for (var i = 1; i <= 5; i++) {

        function close(x) {
            setTimeout(function () {
                console.log(x);
            }, 1000 * i);
        }

        close(i);
    }

    console.log("hii ramit");
}

x();
```

### Output

```text
hii ramit
1
2
3
4
5
```

Each call to:

```js
close(i);
```

creates a new function execution context.

```text
close(1) → x = 1 → callback remembers x
close(2) → x = 2 → callback remembers x
close(3) → x = 3 → callback remembers x
close(4) → x = 4 → callback remembers x
close(5) → x = 5 → callback remembers x
```

This works because of **closures**.

---

# 🌐 5. `setTimeout()` Execution Flow

Remember this order:

```text
┌──────────────────┐
│ JavaScript Code  │
└────────┬─────────┘
         │
         │ setTimeout()
         ▼
┌──────────────────┐
│ Browser Web API  │
│                  │
│ Timer starts     │
└────────┬─────────┘
         │
         │ Timer finishes
         ▼
┌──────────────────┐
│ Callback Queue   │
└────────┬─────────┘
         │
         │ Event Loop
         ▼
┌──────────────────┐
│ Call Stack       │
│ Callback runs    │
└──────────────────┘
```

> ⚠️ The timer duration is a **minimum delay**, not a guarantee that the callback executes exactly at that time.

---

# 🧠 6. Important Points

### ⏱️ `setTimeout(callback, delay)`

* Schedules `callback` to run later.
* Does **not block** synchronous JavaScript.
* Timer is handled by the browser environment.
* After the timer finishes, the callback waits in the queue.
* The Event Loop moves it to the Call Stack when the stack is available.
* Closures determine which variables the callback can access.

---

# ⚡ Quick Revision

```text
setTimeout()
     ↓
Does NOT block JS ❌
     ↓
Web API handles timer
     ↓
Timer finishes
     ↓
Callback Queue
     ↓
Event Loop
     ↓
Call Stack
     ↓
Callback executes
```

### 🔑 Remember

> **`var` → same `i` binding → 6, 6, 6, 6, 6**

> **`let` → new binding per iteration → 1, 2, 3, 4, 5**

> **Function + closure → each call gets its own variable → 1, 2, 3, 4, 5**
