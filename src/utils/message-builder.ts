import {
  ColorBuilderFunc,
  ILogger,
  IncomingMessageType,
  MessageBuilderFactory,
  MessageBuilderFunc,
  SegmentFunc,
} from "../@types";
import { fillWithPad, getSymbol } from "./helper";
import { TZDate } from "@date-fns/tz";
import { format as dateFormat } from "date-fns";
import { prettyPrintMessage } from "./pretti-print";

export const getSegment: SegmentFunc<string, string> =
  (separator, segment) =>
  (message: string, pad = " "): string => {
    return segment(`${pad}${message}${pad}`) + separator(pad);
  };

export const getFormatters = (
  logger: ILogger,
): MessageBuilderFactory<string, string> => {
  return {
    error: {
      titleBuilder: getSegment(
        logger.bgRed.whiteBright,
        logger.bgRed.whiteBright,
      ),
      messageBuilder: getSegment(
        logger.bgRed.whiteBright,
        logger.bgGray.whiteBright,
      ),
    },
    debug: {
      titleBuilder: getSegment(
        logger.bgWhiteBright.black,
        logger.bgWhiteBright.black,
      ),
      messageBuilder: getSegment(
        logger.bgWhiteBright.black,
        logger.bgGray.whiteBright,
      ),
    },
    success: {
      titleBuilder: getSegment(
        logger.bgGreenBright.whiteBright,
        logger.bgGreenBright.whiteBright,
      ),
      messageBuilder: getSegment(
        logger.bgGreenBright.whiteBright,
        logger.bgGray.whiteBright,
      ),
    },
    warning: {
      titleBuilder: getSegment(
        logger.bgYellowBright.whiteBright,
        logger.bgYellowBright.whiteBright,
      ),
      messageBuilder: getSegment(
        logger.bgYellowBright.whiteBright,
        logger.bgGray.whiteBright,
      ),
    },
    info: {
      titleBuilder: getSegment(
        logger.bgBlueBright.whiteBright,
        logger.bgBlueBright.whiteBright,
      ),
      messageBuilder: getSegment(
        logger.bgBlueBright.whiteBright,
        logger.bgGray.whiteBright,
      ),
    },
  };
};

export const prettyPrintHeader = (
  titleSegment: MessageBuilderFunc<string, string>,
  fillSegment: MessageBuilderFunc<string, string>,
  title: string,
  header: string,
) => {
  return (
    titleSegment(fillWithPad(title.toUpperCase())) +
    fillSegment(header) +
    fillSegment(`DETAILS ${getSymbol("⟱", "=>")}`)
  );
};

export const prettyPrintFooter = (
  titleSegment: MessageBuilderFunc<string, string>,
  fillSegment: MessageBuilderFunc<string, string>,
  title: string,
  headerLength: number,
) => {
  return (
    titleSegment(fillWithPad(title.toUpperCase())) +
    fillSegment(fillWithPad("", headerLength - 4)) +
    fillSegment(`DETAILS END ${getSymbol("⟰")}`)
  );
};

export const getMessageBuilder: ColorBuilderFunc<
  string,
  string,
  IncomingMessageType
> =
  (segment, titleSegment) =>
  ({ title, timestamp, message, subtitle }: IncomingMessageType) => {
    const header = `${dateFormat(
      new TZDate(timestamp ?? new Date().valueOf(), "Asia/Colombo"),
      "MMM Do iii hh:mm::ss SSS aa  OOO",
    )} [${subtitle}]`;
    return (
      prettyPrintHeader(titleSegment, segment, title, header) +
      prettyPrintMessage(message) +
      prettyPrintFooter(titleSegment, segment, title, header.length)
    );
  };
