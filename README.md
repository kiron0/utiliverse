# Utiliverse 🌌

[![npm version](https://img.shields.io/npm/v/utiliverse.svg?style=flat-square)](https://www.npmjs.com/package/utiliverse)
[![npm downloads](https://img.shields.io/npm/dm/utiliverse.svg?style=flat-square)](https://www.npmjs.com/package/utiliverse)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg?style=flat-square)](https://www.typescriptlang.org/)

**A Universe of TypeScript Utilities**

*"Simplify Your Code, Expand Your Possibilities"* 🚀

---

## 🌟 Features

- **50+ Utility Functions** - A comprehensive collection of TypeScript utilities
- **Zero Dependencies** - Lightweight and pure TypeScript
- **Universal Compatibility** - Works in Node.js, Deno, and modern browsers
- **TypeScript First** - Full type inference and generics support
- **Modular Design** - Import only what you need

---

## 📦 Installation

```bash
npm install utiliverse
# or
yarn add utiliverse
# or
bun add utiliverse
```

---

## 🚀 Quick Start

```typescript
import { capitalize, debounce, deepClone, generateUUID } from 'utiliverse';

// Capitalize a string
console.log(capitalize('hello world')); // "Hello world"

// Debounce a function
const debouncedLog = debounce(console.log, 300);
debouncedLog('This will log after 300ms of inactivity');

// Deep clone an object
const original = { a: 1, b: { c: 2 } };
const cloned = deepClone(original);

// Generate a UUID
console.log(generateUUID()); // "f47ac10b-58cc-4372-a567-0e02b2c3d479"
```

---

## 📚 Core Utilities

### 🛠️ General Utilities
```typescript
import { capitalize, debounce, deepClone, memoize, throttle } from 'utiliverse';

capitalize('hello world'); // "Hello world"
debounce(() => console.log('Debounced!'), 300);
deepClone({ a: 1, b: { c: 2 } });
memoize((a: number, b: number) => a + b);
throttle(() => console.log('Throttled!'), 300);
```

### 🔢 Math Utilities
```typescript
import { clamp, factorial, fibonacci, gcd, lcm, roundToDecimal } from 'utiliverse';

clamp(10, 0, 5); // 5
factorial(5); // 120
fibonacci(10); // 55
gcd(14, 21); // 7
lcm(4, 6); // 12
roundToDecimal(3.14159, 2); // 3.14
```

### 📜 String Utilities
```typescript
import { reverseString, truncateString, toCamelCase, toKebabCase, toSnakeCase } from 'utiliverse';

reverseString('hello'); // "olleh"
truncateString('This is a long string', 10); // "This is a..."
toCamelCase('hello-world'); // "helloWorld"
toKebabCase('helloWorld'); // "hello-world"
toSnakeCase('helloWorld'); // "hello_world"
```

### 🧩 Array Utilities
```typescript
import { chunkArray, flattenArray, shuffleArray, uniqueArray } from 'utiliverse';

chunkArray([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
flattenArray([1, [2, [3, 4]]]); // [1, 2, 3, 4]
shuffleArray([1, 2, 3, 4, 5]); // [3, 1, 5, 2, 4] (randomized)
uniqueArray([1, 2, 2, 3, 4, 4]); // [1, 2, 3, 4]
```

### 🧠 Advanced Utilities
```typescript
import { compose, pipe, retry, sleep, timeout, toMorseCode } from 'utiliverse';

// Text to Morse Code
toMorseCode("kiron"); // -.- .. .-. --- -.

// Compose functions
const addThenMultiply = compose((x: number) => x * 2, (x: number) => x + 1);
addThenMultiply(5); // 12

// Pipe functions
const multiplyThenAdd = pipe((x: number) => x * 2, (x: number) => x + 1);
multiplyThenAdd(5); // 11

// Retry a function
retry(() => fetch('https://api.example.com'), { retries: 3 });

// Sleep for 1 second
await sleep(1000);

// Timeout a function
timeout(() => longRunningTask(), 5000);
```

---

## 💡 Why Utiliverse?

- **Comprehensive**: Over 100 utilities for all your development needs
- **TypeScript Optimized**: Full type inference and generics support
- **Lightweight**: Zero dependencies, minimal footprint
- **Modular**: Import only what you need, tree-shakeable
- **Universal**: Works in Node.js, Deno, and modern browsers

---

## 🛠️ Contributing

```bash
# Clone repo
git clone https://github.com/kiron0/utiliverse.git

# Install dependencies
bun install

# Build project
bun run build
```

---

## 📜 License

MIT © Toufiq Hasan Kiron

*"Simplify the complex, and the universe is yours."* - Utiliverse Proverb 🌌
