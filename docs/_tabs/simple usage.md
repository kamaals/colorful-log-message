---
# the default layout is 'page'
icon: fas fa-puzzle-piece
order: 2
---

## Bullet train
 - Level: [`deubg`](#bullet-train-debug)
 - Level: [`success`](#bullet-train-success)
 - Level: [`warn`](#bullet-train-warn)

## Minimal
- Level: [`error`](#minimal-error)
- Level: [`info`](#minimal-info)


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

### Success message

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
![Desktop View](https://raw.githubusercontent.com/kamaals/colorful-log-message/refs/heads/master/assets/bullet-train-success.png){: width="972" height="589" }
_Full screen width and center alignment_



### Warning message

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
![Desktop View](https://raw.githubusercontent.com/kamaals/colorful-log-message/refs/heads/master/assets/bullet-train-warn.png){: width="972" height="589" }
_Full screen width and center alignment_



### Minimal Warning message

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
### <a name="minimal-error">Result: Minimal style Level Error</a>
![Desktop View](https://raw.githubusercontent.com/kamaals/colorful-log-message/refs/heads/master/assets/minimal-error.png){: width="972" height="589" }
_Full screen width and center alignment_


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
### <a name="minimal-info">Result: Minimal style Level Info</a>
![Desktop View](https://raw.githubusercontent.com/kamaals/colorful-log-message/refs/heads/master/assets/minimal-info.png){: width="972" height="589" }
_Full screen width and center alignment_

