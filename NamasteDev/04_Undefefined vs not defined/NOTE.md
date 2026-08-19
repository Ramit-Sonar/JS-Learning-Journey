# 🟡 JavaScript — `undefined` vs `not defined`

> ⚡ **Quick Idea:** `undefined` and `not defined` are **completely different**.

---

## 1. `undefined`

```js
var a;

console.log(a);
```

### Output

```text
undefined
```

Why? 🤔

`var a` is declared, so JavaScript allocates memory for `a`, but no value has been assigned yet.

```text
Memory:
a → undefined
```

> 🧠 `undefined` means **the variable exists, but currently has no assigned value.**

---

## 2. `not defined`

```js
console.log(x);
```

### Output

```text
ReferenceError: x is not defined
```

Why?

`x` was **never declared**, so JavaScript has no memory allocation/binding for it.

```text
Memory:
x → ❌ Does not exist
```

> 🧠 `not defined` means **the variable itself does not exist in the accessible scope.**

---

# ⚔️ `undefined` vs `not defined`

| `undefined` 🟡       | `not defined` 🔴         |
| -------------------- | ------------------------ |
| Variable is declared | Variable is not declared |
| Memory is allocated  | No binding exists        |
| Value is `undefined` | Variable doesn't exist   |
| `var a;`             | `console.log(x)`         |
| Usually no error     | `ReferenceError`         |

---

# 🔄 3. JavaScript Can Change Types

```js
var a = 10;

console.log(a);

var a = "hello ramit";

console.log(a);
```

Output:

```text
10
hello ramit
```

The same variable can hold different types of values:

```text
a → 10
 ↓
a → "hello ramit"
```

This is related to JavaScript being **dynamically typed**: the type is associated with the value, not permanently fixed to the variable.

---

# ⚠️ 4. Don't Manually Assign `undefined`

You can technically do:

```js
a = undefined;
```

But generally, **don't use `undefined` to intentionally represent missing data**.

Prefer:

```js
let a = null;
```

when you intentionally want to say:

> "There is currently no value."

### Difference

```text
undefined → value has not been assigned / missing

null      → intentionally empty value
```

---

# 🧠 5. Easy Memory Trick

```text
🟡 undefined
Variable EXISTS
       ↓
No value assigned
       ↓
undefined

🔴 not defined
Variable DOES NOT EXIST
       ↓
No declaration
       ↓
ReferenceError
```

---

# 🎯 One-Line Revision

> **`undefined` = declared but no value.**
> **`not defined` = never declared / not available in scope.**

### 💡 Extra Point

Don't say simply **"JavaScript is weakly typed because the same variable can store different types."**

For your notes, the more accurate term is:

> **JavaScript is dynamically typed** — a variable can hold values of different types at different times.
