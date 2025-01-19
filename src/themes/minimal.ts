import {
  ILogger,
  IncomingMessageType,
  LogLevelKeys,
  SegmentBuilderType,
} from "../@types";
import { getSegmentsBuilder, getSegmentsFromInfo } from "../utils/segment";
import { getLines, getMiddleOfTheLine } from "../utils/helper";
import { NEW_LINE, SEGMENT_SYBOL_COLOR } from "../config/defaults";

const buildMinimalSegment = (
  segment: SegmentBuilderType,
  logger: ILogger,
): string => {
  return logger.reset(segment.text);
};

export const minimalHeader = (
  message: IncomingMessageType,
  logger: ILogger,
) => {
  const leftPad = message.level.length + 3;
  return (
    " ".repeat(leftPad) +
    "┌─ " +
    getSegmentsBuilder(getSegmentsFromInfo(message))
      .map((s) => buildMinimalSegment(s, logger))
      .join(" ") +
    "\n"
  );
};

export const minimalFooter = (
  message: IncomingMessageType,
  logger: ILogger,
) => {
  const leftPad = message.level.length + 3;
  return (
    "\n" +
    (" ".repeat(leftPad) +
      "└─ " +
      getSegmentsBuilder(getSegmentsFromInfo(message, "footer"))
        .map((s) => buildMinimalSegment(s, logger))
        .join(" "))
  );
};

export const printMinimalBody = (
  segment: ILogger,
  body: string,
  level: LogLevelKeys,
) => {
  const lines = getLines(body).filter(Boolean);
  const midLine = getMiddleOfTheLine(lines);
  const colorKeys = SEGMENT_SYBOL_COLOR[level];
  const bg = segment[colorKeys.bg] as ILogger;
  const fg = segment[colorKeys.fg] as ILogger;
  return lines
    .map((line, index) => {
      return index === midLine
        ? bg(fg(" " + level.toUpperCase() + " ")) + "─┤" + line
        : " ".repeat(level.length + 3) + "│ " + line;
    })
    .join(NEW_LINE);
};
