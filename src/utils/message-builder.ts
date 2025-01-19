import { ILogger, IncomingMessageType, Theme } from "../@types";
import {
  bulletTrainFooter,
  bulletTrainHeader,
  printBulletTrainBody,
} from "../themes/bullet-train";
import { prettyPrintMessage } from "./pretti-print";
import {
  minimalFooter,
  minimalHeader,
  printMinimalBody,
} from "../themes/minimal";

function buildMessage(logger: ILogger) {
  return (message: IncomingMessageType) =>
    bulletTrainHeader(message, logger) +
    printBulletTrainBody(logger, prettyPrintMessage(message)) +
    bulletTrainFooter(message, logger);
}

function buildMinimalMessage(logger: ILogger) {
  return (message: IncomingMessageType) =>
    minimalHeader(message, logger) +
    printMinimalBody(logger, prettyPrintMessage(message), message.level) +
    minimalFooter(message, logger);
}

export const getFormatters = (
  mainLogger: ILogger,
  theme: Theme = "minimal",
): ((message: IncomingMessageType) => string) => {
  return theme === "bullet-train"
    ? buildMessage(mainLogger)
    : buildMinimalMessage(mainLogger);
};

export const getLogger = (logger: ILogger, theme: Theme = "minimal") => {
  return getFormatters(logger, theme);
};
