
<div style="margin:2rem; display: flex; justify-content: start; gap: 2rem; align-items: center">
    <img width="200px" src="https://raw.githubusercontent.com/kamaals/colorful-log-message/refs/heads/master/assets/logo.png" alt="Logo">
    <div>
        <h1>Colorful Log Message</h1>
        <h4>NodeJS Pretty Colored Logger</h4>
    </div>
</div>

This utility allows you to render unicode-aided color, style and formatting the command line from your node.js scripts.

## Highlights
- No dependencies
- Ability to nest styles (like chalk)
- Clean and focused
- 100% TypeScript
- Highly performant

## Installation

### YARN

```bash
yarn add colorful-log-message
```

### BUN

```bash
bun add colorful-log-message
```

### NPM

```bash
npm install colorful-log-message
```

## Usage
- [Simple Usage](#bullet-train-debug)
- With winston

## <a name="bullet-train-debug">Simple Usage</a>

### Bullet train
- Level: [`deubg`](#bullet-train-debug)
- Level: [`success`](#bullet-train-success)
- Level: [`warn`](#bullet-train-warn)

### Minimal
- Level: [`error`](#minimal-error)
- Level: [`info`](#minimal-info)

### Bullet train `debug` level
```typescript
import { colored, getLogger } from 'colorful-log-message';

// instantiate
// getLogger take 2 arguments
// 1. the colored instance
// 2. the color scheme (optional) default is "bullet-train"
const colorfulLogger = getLogger(colored)

console.log(
  colorfullLogger({
    level: "debug", // level
    message: {
      title: "Hello",
    },
    subtitle: "World",
  }),
);

```
### <a name="bullet-train-debug">Result</a>
<img src="https://raw.githubusercontent.com/kamaals/colorful-log-message/refs/heads/master/assets/bullet-train.png" alt="Bullet train">

--------

### Bullet train `success` level

```typescript
console.log(
  colorfulLogger({
    level: "success", // level
    message: {
      title: "Hello",
    },
    subtitle: "World",
  }),
);

```
### <a name="bullet-train-success">Result: Level Success</a>
![Desktop View](https://raw.githubusercontent.com/kamaals/colorful-log-message/refs/heads/master/assets/bullet-train-success.png)


### Bullet train `warning` level

```typescript
console.log(
  colorfulLogger({
    level: "warn", // level
    message: {
      title: "Something went wrong",
    },
    subtitle: "HTTP Error [400]",
  }),
);

```
### <a name="bullet-train-warn">Result: Level Success</a>
![Warn](https://raw.githubusercontent.com/kamaals/colorful-log-message/refs/heads/master/assets/bullet-train-warn.png)



### Minimal train `warning` level

```typescript

// passing theme minimal
const colorfulLogger = getLogger(colored, "minimal")

console.log(
  colorfulLogger({
    level: "warn", // level
    message: {
      title: "Something went wrong",
    },
    subtitle: "HTTP Error [400]",
  }),
);

```
### <a name="minimal-error">Result: Minimal `error`</a>
![Desktop View](https://raw.githubusercontent.com/kamaals/colorful-log-message/refs/heads/master/assets/minimal-error.png)


```typescript

// passing theme minimal
const colorfulLogger = getLogger(colored, "minimal")

console.log(
  colorfulLogger({
    level: "info", // level
    message: {
      title: "Hello",
    },
    subtitle: "World",
  }),
);

```
### <a name="minimal-info">Result: Minimal `info`</a>
![Desktop View](https://raw.githubusercontent.com/kamaals/colorful-log-message/refs/heads/master/assets/minimal-info.png)

## <a name="bullet-train-debug">With Winston</a>
