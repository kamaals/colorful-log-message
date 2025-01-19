import { logCreator } from "./utils/builder";
import { getLogger } from "./utils/message-builder";
export * from "./@types";
export const colorfulLogger = logCreator({ level: 1 });

const messageColorful = getLogger(colorfulLogger, "agnostic");

console.log(
  messageColorful({
    level: "debug",
    message: {
      title: "Hello",
    },
    subtitle: "World",
  }),
);
