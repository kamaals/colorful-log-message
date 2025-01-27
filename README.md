
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

#### YARN

```bash
yarn add colorful-log-message
```

#### BUN

```bash
bun add colorful-log-message
```

#### NPM

```bash
npm install colorful-log-message
```

## Usage
- [Simple Usage](#bullet-train-debug)
- [With winston](#with-winston)

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

## <a name="with-winston">With Winston</a>


```typescript
import type http from "node:http";
import morgan from "morgan";
import type { TransformableInfo } from "logform";
import { LEVEL, MESSAGE, SPLAT } from "triple-beam";
import winston, { type LeveledLogMethod } from "winston";
import { colored, getLogger, type LogLevelKeys } from "colorful-log-message";

import express from "express";

const levels = {
      error: 0,
      warn: 1,
      info: 2,
      http: 3,
      success: 4,
      debug: 5,
    };

type MorganMessage = {
  body?: Record<string, any>;
  query?: Record<string, any>;
  params?: Record<string, any>;
  validation?: Record<string, any>;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "OPTION" | "DELETE";
  url?: string;
  status: string;
  responseTime?: string;
  remote?: string;
  contentLength?: string;
  agent?: string;
  level: "error" | "info" | "http" | "debug" | "success" | "warn";
  stack?: string;
  name?: string;
  message: string;
  timestamp: string;
  subtitle: string;
};
const logFormat = `{
    "method": ":method",
    "url": ":url",
    "status": ":status",
    "responseTime": ":response-time ms",
    "body": :body,
    "query": :query,
    "params": :params,
    "remote": "::remote-addr",
    "agent":":user-agent",
    "validation": :validation_errors
}` as string;

const parseMorganString = (message: string): MorganMessage => {
     try {
       return JSON.parse(message.trim()) as MorganMessage;
     } catch (error) {
       if (error instanceof Error) {
         return {
           message: "Error parsing morgan message to JSON",
           level: "error",
           stack: error.stack,
           name: error.name,
         } as MorganMessage;
       }
       return {
         message: "Error parsing morgan message to JSON",
         level: "error",
       } as MorganMessage;
     }
   };

   const extractRequestBody = (
     request: http.IncomingMessage & { body: Record<string, unknown> },
   ) =>
     request.method === "POST" || request.method === "PUT"
       ? JSON.stringify(request.body)
       : "null";

   const extractRequestQuery = (
     request: http.IncomingMessage & { query: Record<string, unknown> },
   ) => JSON.stringify(request.query);

   const extractRequestParams = (
     request: http.IncomingMessage & { params: Record<string, unknown> },
   ) => JSON.stringify(request.params);

   const extractValidationErrors = (
     request: http.IncomingMessage & {
       header: Record<"validation_errors", string>;
     },
   ) =>
     request.header.validation_errors ? request.header.validation_errors : "{}";

   const streamFunc = (): StreamOptions => {
     return {
       write: (message: string) => {
         const jsonMessage = parseMorganString(message);
         if (
           jsonMessage.level === "error" ||
           Number.parseInt(jsonMessage.status) > 399
         ) {
           return mainLogger.error(logNames.http.error, jsonMessage);
         }
         return mainLogger.http(logNames.http.success, {
           ...jsonMessage,
           subtitle: "HTTP",
           level: "success",
         });
       },
     };
   };

   morgan.token("body", extractRequestBody);
   morgan.token("query", extractRequestQuery);
   morgan.token("params", extractRequestParams);
   morgan.token("validation_errors", extractValidationErrors);



type WLogger = winston.Logger;

export const colorfulLogger = getLogger(colored, "bullet-train");

const prettyPrintWithColor = () =>
  winston.format.printf((message: TransformableInfo) => {
    const stripped = Object.assign({}, message) as MorganMessage & {
      [LEVEL]: unknown;
      [MESSAGE]: unknown;
      [SPLAT]: unknown;
    };

    delete stripped[LEVEL];
    delete stripped[MESSAGE];
    delete stripped[SPLAT];

    if (stripped.method === "GET" || stripped.method === "DELETE") {
      // biome-ignore lint/performance/noDelete: <explanation>
      delete stripped.body;
    }
    return colorfulLogger({
      level: message.level as LogLevelKeys,
      message: stripped,
      subtitle: stripped.subtitle ?? "APP",
    });
  });

const format = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  prettyPrintWithColor(),
);

/*
 Create winston transporter
 ex: create winston transporter for better stack
 */
const transports = [new winston.transports.Console({ level: "debug" })];

export const mainLogger = winston.createLogger({
  levels,
  transports,
  format,
}) as WLogger & Record<keyof typeof levels, LeveledLogMethod>;   



// morgan mw
const morganMiddleware = morgan<
  http.IncomingMessage & {
  body: Record<string, unknown>;
  query: Record<string, unknown>;
  params: Record<string, unknown>;
  header: Record<"validation_errors", string>;
},
  http.ServerResponse
  // @ts-ignore
>(logFormat, {
  stream: streamFunc(),
  skip: () => process.env.NODE_ENV === "test" || process.env.NODE_ENV === "production",
});

// finally in express
const app = express();

// after all your middlewares...
app.use(morganMiddleware);

```
