# JavaScript Execution, Event Loop & Queues — Quick Notes

## 1. JavaScript Execution
JavaScript is single-threaded → executes one task at a time.

When JS starts running:
Memory Creation Phase → Code Execution Phase

Memory Creation:
- `var` → `undefined`
- Function declaration → whole function body stored

Example:
var a = 10;
function test() {}

Memory:
a → undefined
test → whole function

Then Code Execution happens line-by-line:
a → 10

Remember:
RUN → Prepare memory → Execute line-by-line

---

## 2. Call Stack
Call Stack = where JavaScript code executes.

function a() {
    b();
}
function b() {
    console.log("Hello");
}
a();

Flow:
Global → a() → b() → console.log()
Then functions are removed from the stack after execution.

---

## 3. Synchronous vs Asynchronous
Synchronous:
- Executes immediately
- Runs line-by-line
- Example: `console.log()`

Asynchronous:
- Does not block JS execution
- Uses browser/runtime APIs
- Examples: `setTimeout()`, `fetch()`, DOM events

---

## 4. Web APIs / Browser APIs
Browser provides APIs for asynchronous operations.

Examples:
- `setTimeout()`
- `setInterval()`
- `fetch()`
- DOM events / `addEventListener()`

General flow:
JS → Browser API → operation finishes → callback gets queued

---

## 5. console.log()
`console.log()` is synchronous.

console.log("A");
console.log("B");

Flow:
Call Stack → console.log() → execute

It does NOT normally go:
Web API → Callback Queue

---

## 6. setTimeout()
setTimeout(() => {
    console.log("Timer");
}, 0);

Flow:
setTimeout()
→ Browser API
→ Timer finishes
→ Task/Callback Queue
→ Event Loop
→ Call Stack
→ Execute callback

Important:
`setTimeout(fn, 0)` does NOT mean execute immediately.

---

## 7. Event Listener
button.addEventListener("click", () => {
    console.log("Clicked");
});

Flow:
addEventListener()
→ Browser registers listener
→ waits for event
→ user clicks
→ callback becomes a Task
→ Task Queue
→ Event Loop
→ Call Stack
→ Execute

---

## 8. fetch()
`fetch()` is asynchronous and returns a Promise.

fetch(url).then(() => {
    console.log("Done");
});

Flow:
fetch()
→ Browser/Runtime
→ Network request
→ Response arrives
→ Promise fulfilled
→ `.then()` callback
→ Microtask Queue
→ Event Loop
→ Call Stack

Important:
`fetch().then()` → Microtask Queue

---

## 9. Microtask Queue
Common microtasks:
- `Promise.then()`
- `Promise.catch()`
- `Promise.finally()`
- `fetch().then()`
- `MutationObserver`

Microtask:
Promise → Microtask Queue → Event Loop → Call Stack

---

## 10. MutationObserver
MutationObserver watches DOM changes.

DOM changes
→ MutationObserver detects it
→ callback → Microtask Queue
→ Event Loop → Call Stack

Important:
MutationObserver callback → Microtask Queue

---

## 11. Task/Callback Queue
Common tasks:
- `setTimeout()`
- `setInterval()`
- DOM event callbacks such as `click`

Flow:
Browser/Event → Task Queue → Event Loop → Call Stack

---

## 12. Microtask vs Task Queue

Microtask Queue:
- Promise callbacks
- fetch `.then()`
- MutationObserver

Task Queue:
- setTimeout
- setInterval
- DOM events

Important:
Microtask Queue has priority over the next Task.

Example:

console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => console.log("C"));

console.log("D");

Output:
A
D
C
B

Why?
A → Call Stack
D → Call Stack
C → Microtask Queue
B → Task Queue

Microtasks are processed before the next Task.

---

## 13. Event Loop
Event Loop connects:
Call Stack + Microtask Queue + Task Queue

Simplified:

Call Stack
    ↑
Event Loop
 ↙       ↘
Microtask  Task
 Queue     Queue

The Event Loop waits for the Call Stack to be available and schedules queued work.

---

## 14. Microtask Starvation
If a microtask continuously creates another microtask:

Microtask
→ creates Microtask
→ creates Microtask
→ creates Microtask
→ ...

The Microtask Queue never becomes empty.

Result:
Task Queue may not get a chance to execute.

This is called:
- Microtask Starvation
- Event Loop Starvation

NOT usually "Callback Queue Starvation".

---

# ⭐ One-Minute Memory Trick

Call Stack
= Executes JS

Web APIs
= Handle async browser operations

Microtask Queue
= Promise / fetch / MutationObserver

Task Queue
= setTimeout / setInterval / DOM events

Event Loop
= Moves queued work to Call Stack

Priority:
Current Task
→ Microtask Queue
→ Next Task

Golden Flow:

JS Code
  ↓
Call Stack
  ↓
Browser APIs
  ↓
┌───────────────────┐
│ Microtask Queue   │ ← Promise / fetch / MutationObserver
└───────────────────┘
  ↓
┌───────────────────┐
│ Task Queue        │ ← Timer / Events
└───────────────────┘
  ↓
Event Loop
  ↓
Call Stack

REMEMBER:
"Stack executes → APIs handle async → Microtasks first → Tasks next."