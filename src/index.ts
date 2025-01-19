import { logCreator } from "./utils/builder";
import { getLogger } from "./utils/message-builder";
export * from "./@types";
export const colorfulLogger = logCreator({ level: 1 });

const messageMinimal = getLogger(colorfulLogger);
const messageColorful = getLogger(colorfulLogger, "bullet-train");

console.log(
  messageColorful({
    level: "debug",
    message: {
      title: "Hello",
    },
    subtitle: "World",
  }),
);

console.log(
  messageColorful({
    level: "success",
    message: {
      title: "Hello",
    },
    subtitle: "World",
  }),
);

console.log(
  messageMinimal({
    level: "debug",
    message: {
      title: "Hello",
    },
    subtitle: "World",
  }),
);

console.log(
  messageMinimal({
    level: "error",
    message: {
      title: "Hello",
    },
    subtitle: "World",
  }),
);
