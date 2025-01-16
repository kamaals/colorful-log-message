import { logCreator } from "./utils/builder";
import { getFormatters, getMessageBuilder } from "./utils/message-builder";
export * from "./@types";

const logger = logCreator({ level: 1 });

const { error, debug, warning, success, info } = getFormatters(logger);
export const errorMessage = getMessageBuilder(
  error.titleBuilder,
  error.messageBuilder,
);
export const debugMessage = getMessageBuilder(
  debug.titleBuilder,
  debug.messageBuilder,
);
export const warningMessage = getMessageBuilder(
  warning.titleBuilder,
  warning.messageBuilder,
);
export const successMessage = getMessageBuilder(
  success.titleBuilder,
  success.messageBuilder,
);
export const infoMessage = getMessageBuilder(
  info.titleBuilder,
  info.messageBuilder,
);
