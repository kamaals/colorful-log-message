import { ColorNames, LogLevelKeys } from "../@types";

export const ANSI_BACKGROUND_OFFSET = 10;

export const GENERATOR = Symbol("GENERATOR");
export const STYLER = Symbol("STYLER");
export const IS_EMPTY = Symbol("IS_EMPTY");

export const levelMapping = ["ansi", "ansi", "ansi256", "ansi16m"];

export type SymbolWithColorType = {
  symbol: string;
  bg: ColorNames;
  fg: ColorNames;
};

export const SEGMENTSYBOLS_COLOR: Record<LogLevelKeys, SymbolWithColorType> = {
  error: {
    symbol: "✗",
    bg: "bgRed",
    fg: "whiteBright",
  },
  success: {
    symbol: "✓",
    bg: "bgGreen",
    fg: "black",
  },
  warn: {
    symbol: "⚠",
    bg: "bgYellowBright",
    fg: "black",
  },
  info: {
    symbol: "i",
    bg: "bgBlue",
    fg: "black",
  },
  http: {
    symbol: "🔗",
    bg: "bgMagenta",
    fg: "black",
  },
  debug: {
    symbol: "⚙",
    bg: "bgCyanBright",
    fg: "black",
  },
};

export const NEW_LINE = "\n";
