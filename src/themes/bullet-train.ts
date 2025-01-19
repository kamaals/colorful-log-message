import { ILogger, IncomingMessageType } from "../@types";
import {
  buildSegment,
  getSegmentsBuilder,
  getSegmentsFromInfo,
} from "../utils/segment";
import { getLines } from "../utils/helper";
import { NEW_LINE } from "../config/defaults";

export const bulletTrainHeader = (
  message: IncomingMessageType,
  logger: ILogger,
) => {
  return getSegmentsBuilder(getSegmentsFromInfo(message))
    .map((s) => buildSegment(s, logger))
    .join("");
};

export const bulletTrainFooter = (
  message: IncomingMessageType,
  logger: ILogger,
) => {
  return getSegmentsBuilder(getSegmentsFromInfo(message, "footer"))
    .map((s) => buildSegment(s, logger))
    .join("");
};

export const printBulletTrainBody = (logger: ILogger, body: string) => {
  const lines = getLines(body);
  return lines
    .map((line) => {
      return logger.reset.bgBlack(" ") + logger.reset(line) + NEW_LINE;
    })
    .join("");
};
