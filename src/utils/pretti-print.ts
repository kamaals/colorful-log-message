import { isNotEmpty } from "./helper";
import { inspect } from "node:util";
import { NEW_LINE } from "../config/defaults";

export const prettyPrintMessage = (
  message: string | Record<string, unknown> | Error,
) => {
  if (typeof message === "string" || message instanceof String) {
    return NEW_LINE + message + NEW_LINE;
  }
  if (isNotEmpty(message) || isNotEmpty(message?.stack)) {
    return (
      NEW_LINE + inspect(message, { sorted: true, breakLength: 1, depth: 7 })
    );
  }
  return "";
};
