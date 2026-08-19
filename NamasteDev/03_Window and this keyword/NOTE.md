# 🌐 JavaScript — `window` Object & `this` Keyword

> ⚡ **Quick Note:** In a browser, the global JavaScript environment is closely connected with the **`window` object**.

---

## 🌍 1. Global Space

```js
var x = 10;

function a() {
    var y = 100;
}

console.log(x);
console.log(window.x);
console.log(this.x);
console.log(y);
```

### Output

```text
10
10
10
ReferenceError
```

### Why? 🤔

`x` is declared in the **global space**:

```text
🌍 Global
x → 10
```

So in a browser:

```js
console.log(x);
console.log(window.x);
console.log(this.x);
```

can access the global `x`.

But `y` belongs to the function `a()`:

```text
a() → y = 100
```

Therefore:

```js
console.log(y);
```

❌ `ReferenceError`

---

# 🪟 2. `window` Object

In the browser, `window` represents the **global object**.

```text
             🌐 Browser
                 │
                 ▼
          ┌─────────────┐
          │   window    │
          ├─────────────┤
          │ alert()     │
          │ setTimeout()│
          │ fetch()     │
          │ document    │
          │ localStorage│
          │ location    │
          └─────────────┘
```

These browser APIs are provided through the browser environment, not by the core JavaScript language itself.

---

# 🔗 3. `var` and `window`

In a traditional browser script:

```js
var x = 10;

console.log(window.x);
```

Output:

```text
10
```

Because the global `var` binding is exposed as a property of the global object.

---

# 🎯 4. `this` in Global Space

In a browser's **global scope**:

```js
var x = 10;

console.log(this.x);
```

Output:

```text
10
```

At the top level of a traditional browser script:

```text
this → window
```

Therefore:

```js
this.x
```

is effectively accessing:

```js
window.x
```

---

# ⚠️ 5. Important Scope Difference

```js
var x = 10;

function a() {
    var y = 100;
}
```

Think:

```text
🌍 Global Space
└── x = 10

📦 a() Function Space
└── y = 100
```

So:

```js
console.log(x); // ✅
console.log(window.x); // ✅
console.log(this.x); // ✅ in traditional browser script

console.log(y); // ❌
```

---

# 🧠 Quick Revision

| Expression | Meaning                                             |
| ---------- | --------------------------------------------------- |
| `x`        | Access variable in current/outer scope              |
| `window.x` | Access `x` as a property of browser's global object |
| `this.x`   | In global browser script, accesses `window.x`       |
| `y`        | Local to `a()`, so unavailable globally             |

> 🔑 **Remember:** `window` is the browser's global object. `this` at the top level of a traditional browser script refers to `window`. Browser APIs such as `document`, timers, and `fetch()` are supplied by the host environment.
