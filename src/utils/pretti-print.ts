import { isNotEmpty } from "./helper";
import { inspect } from "node:util";

export const prettyPrintMessage = (
  message: string | Record<string, unknown> | Error,
) => {
  if (typeof message === "string" || message instanceof String) {
    return "\n" + message + "\n";
  }
  if (isNotEmpty(message) || isNotEmpty(message?.stack)) {
    return (
      "\n" + inspect(message, { sorted: true, breakLength: 1, depth: 7 }) + "\n"
    );
  }
  return "";
};
