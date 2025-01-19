import {
  ColorNames,
  ILogger,
  IncomingMessageType,
  SegmentBuilderType,
  SegmentType,
} from "../@types";
import { SEGMENTSYBOLS_COLOR } from "../config/defaults";
import { smallFirst } from "./helper";

export const getSegmentsBuilder = (
  segments: Array<SegmentType>,
): Array<SegmentBuilderType> => {
  return segments.map(({ bg, text, fg }, index: number) => {
    const isLast = index === segments.length - 1;
    const arrow = {
      fg: smallFirst(bg.replace("bg", "")) as ColorNames,
      bg: isLast ? "reset" : segments[index + 1].bg,
    };
    return {
      bg,
      fg,
      text,
      next: !isLast,
      first: index === 0,
      arrow,
      pad: { leading: " ", trailing: " " },
    };
  });
};

export const buildSegment = (
  { bg, fg, arrow, text, pad: { leading, trailing } }: SegmentBuilderType,
  logger: ILogger,
): string => {
  const _bg = logger[bg] as ILogger;
  const boxCombined = _bg[fg] as ILogger;
  const _arrowBG = logger[arrow.bg] as ILogger;
  const combined = _arrowBG[arrow.fg] as ILogger;
  return boxCombined(`${leading}${text}${trailing}`) + combined(``);
};

export const getSegmentsFromInfo = (
  info: IncomingMessageType,
  infoType: "header" | "footer" = "header",
): Array<SegmentType> => {
  const type = SEGMENTSYBOLS_COLOR[info.level];
  const item: Array<SegmentType> =
    infoType === "header"
      ? [
          {
            text: info.timestamp
              ? new Date(info.timestamp).toLocaleTimeString()
              : new Date().toLocaleTimeString(),
            bg: "bgBlack",
            fg: "whiteBright",
          },
        ]
      : [];

  return [
    {
      text: type.symbol,
      bg: "bgBlack",
      fg: "whiteBright",
    },
    {
      text: info.level.toUpperCase(),
      bg: type.bg,
      fg: type.fg,
    },
    ...item,
    {
      text: infoType === "header" ? (info.subtitle ?? "") : "End",
      bg: infoType === "header" ? type.bg : "bgBlack",
      fg: infoType === "header" ? type.fg : "whiteBright",
    },
  ];
};
