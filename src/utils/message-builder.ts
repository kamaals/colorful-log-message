import { ILogger, IncomingMessageType, Theme } from "../@types";
import {
  bulletTrainFooter,
  bulletTrainHeader,
  printBulletTrainBody,
} from "../themes/bullet-train";
import { prettyPrintMessage } from "./pretti-print";

function buildMessage(logger: ILogger) {
  return (message: IncomingMessageType) =>
    bulletTrainHeader(message, logger) +
    printBulletTrainBody(logger, prettyPrintMessage(message)) +
    bulletTrainFooter(message, logger);
}

export const getFormatters = (
  mainLogger: ILogger,
  _: Theme = "minimal",
): ((message: IncomingMessageType) => string) => {
  return buildMessage(mainLogger);
};

export const getLogger = (logger: ILogger, theme: Theme = "minimal") => {
  return getFormatters(logger, theme);
};
