import { ColorSupportLevel } from "../utils/color-support";
export type Theme = "minimal" | "agnostic";

export type ConvertColor = {
  rgbToAnsi256(red: number, green: number, blue: number): number;
  hexToRgb(hex: string): [red: number, green: number, blue: number];
  hexToAnsi256(hex: string): number;
  ansi256ToAnsi(code: number): number;
  rgbToAnsi(red: number, green: number, blue: number): number;
  hexToAnsi(hex: string): number;
};

export type MessageBuilderFactory<M, T> = () => MessageBuilderFunc<M, T>;

export type AnsiStyles = {
  readonly modifier: Modifier;
  readonly color: ColorBase & FG;
  readonly bgColor: ColorBase & BG;
  readonly codes: ReadonlyMap<number, number>;
} & FG &
  BG &
  Modifier &
  ConvertColor;

export interface ILogger {
  (...text: unknown[]): string;
  level: ColorSupportLevel;
  rgb: (red: number, green: number, blue: number) => this;
  hex: (color: string) => this;
  ansi256: (index: number) => this;
  bgRgb: (red: number, green: number, blue: number) => this;
  bgHex: (color: string) => this;
  bgAnsi256: (index: number) => this;

  readonly reset: this;
  readonly bold: this;
  readonly dim: this;
  readonly italic: this;
  readonly underline: this;
  readonly overline: this;
  readonly inverse: this;
  readonly hidden: this;
  readonly strikethrough: this;
  readonly visible: this;

  readonly black: this;
  readonly red: this;
  readonly green: this;
  readonly yellow: this;
  readonly blue: this;
  readonly magenta: this;
  readonly cyan: this;
  readonly white: this;
  readonly gray: this;

  /*
    Alias for `blackBright`.
    */
  readonly grey: this;
  readonly blackBright: this;
  readonly redBright: this;
  readonly greenBright: this;
  readonly yellowBright: this;
  readonly blueBright: this;
  readonly magentaBright: this;
  readonly cyanBright: this;
  readonly whiteBright: this;

  readonly bgBlack: this;
  readonly bgRed: this;
  readonly bgGreen: this;
  readonly bgYellow: this;
  readonly bgBlue: this;
  readonly bgMagenta: this;
  readonly bgCyan: this;
  readonly bgWhite: this;
  readonly bgGray: this;
  readonly bgGrey: this;

  readonly bgBlackBright: this;
  readonly bgRedBright: this;
  readonly bgGreenBright: this;
  readonly bgYellowBright: this;
  readonly bgBlueBright: this;
  readonly bgMagentaBright: this;
  readonly bgCyanBright: this;
  readonly bgWhiteBright: this;
}
import { STYLER } from "../config/defaults";

export type LogLevelKeys =
  | "success"
  | "error"
  | "warn"
  | "info"
  | "http"
  | "debug";
export type LogLevel = Record<LogLevelKeys, number>;
export type LogLabel = Record<LogLevelKeys, string>;

export type LogNamespace = "db" | "http" | "app";
export type LogName = Record<LogNamespace, LogLabel>;

export interface IOptions {
  readonly level?: ColorSupportLevel;
}

export interface ILogOptions {
  level?: ColorSupportLevel;
}

export type LoggerFunction = (...strings: string[]) => string;

export type StylerParent = {
  openAll: string;
  closeAll: string;
};

export type StylerType = Record<
  typeof STYLER,
  {
    open: string;
    close: string;
    openAll: string;
    closeAll: string;
    parent?: StylerParent;
  }
>;

export type ASCIIDOCTOR = {
  readonly open: string;
  readonly close: string;
};

export type RGBParams = [number, number, number];

export type ColorBase = {
  close: string;
  ansi(code: number): string;
  ansi256(code: number): string;
  ansi16m(red: number, green: number, blue: number): string;
};

export type Modifier = {
  readonly reset: ASCIIDOCTOR;
  readonly bold: ASCIIDOCTOR;
  readonly dim: ASCIIDOCTOR;
  readonly italic: ASCIIDOCTOR;
  readonly underline: ASCIIDOCTOR;
  readonly overline: ASCIIDOCTOR;
  readonly inverse: ASCIIDOCTOR;
  readonly hidden: ASCIIDOCTOR;
  readonly strikethrough: ASCIIDOCTOR;
};

export type FG = {
  readonly black: ASCIIDOCTOR;
  readonly red: ASCIIDOCTOR;
  readonly green: ASCIIDOCTOR;
  readonly yellow: ASCIIDOCTOR;
  readonly blue: ASCIIDOCTOR;
  readonly cyan: ASCIIDOCTOR;
  readonly magenta: ASCIIDOCTOR;
  readonly white: ASCIIDOCTOR;
  readonly gray: ASCIIDOCTOR;
  readonly grey: ASCIIDOCTOR;
  readonly blackBright: ASCIIDOCTOR;
  readonly redBright: ASCIIDOCTOR;
  readonly greenBright: ASCIIDOCTOR;
  readonly yellowBright: ASCIIDOCTOR;
  readonly blueBright: ASCIIDOCTOR;
  readonly cyanBright: ASCIIDOCTOR;
  readonly magentaBright: ASCIIDOCTOR;
  readonly whiteBright: ASCIIDOCTOR;
};

export type BG = {
  readonly bgBlack: ASCIIDOCTOR;
  readonly bgRed: ASCIIDOCTOR;
  readonly bgGreen: ASCIIDOCTOR;
  readonly bgYellow: ASCIIDOCTOR;
  readonly bgBlue: ASCIIDOCTOR;
  readonly bgCyan: ASCIIDOCTOR;
  readonly bgMagenta: ASCIIDOCTOR;
  readonly bgWhite: ASCIIDOCTOR;
  readonly bgGray: ASCIIDOCTOR;
  readonly bgGrey: ASCIIDOCTOR;
  readonly bgBlackBright: ASCIIDOCTOR;
  readonly bgRedBright: ASCIIDOCTOR;
  readonly bgGreenBright: ASCIIDOCTOR;
  readonly bgYellowBright: ASCIIDOCTOR;
  readonly bgBlueBright: ASCIIDOCTOR;
  readonly bgCyanBright: ASCIIDOCTOR;
  readonly bgMagentaBright: ASCIIDOCTOR;
  readonly bgWhiteBright: ASCIIDOCTOR;
};

export interface ILogger {
  (...text: unknown[]): string;
  level: ColorSupportLevel;
  rgb: (red: number, green: number, blue: number) => this;
  hex: (color: string) => this;
  ansi256: (index: number) => this;
  bgRgb: (red: number, green: number, blue: number) => this;
  bgHex: (color: string) => this;
  bgAnsi256: (index: number) => this;

  readonly reset: this;
  readonly bold: this;
  readonly dim: this;
  readonly italic: this;
  readonly underline: this;
  readonly overline: this;
  readonly inverse: this;
  readonly hidden: this;
  readonly strikethrough: this;
  readonly visible: this;

  readonly black: this;
  readonly red: this;
  readonly green: this;
  readonly yellow: this;
  readonly blue: this;
  readonly magenta: this;
  readonly cyan: this;
  readonly white: this;
  readonly gray: this;

  /*
    Alias for `blackBright`.
    */
  readonly grey: this;
  readonly blackBright: this;
  readonly redBright: this;
  readonly greenBright: this;
  readonly yellowBright: this;
  readonly blueBright: this;
  readonly magentaBright: this;
  readonly cyanBright: this;
  readonly whiteBright: this;

  readonly bgBlack: this;
  readonly bgRed: this;
  readonly bgGreen: this;
  readonly bgYellow: this;
  readonly bgBlue: this;
  readonly bgMagenta: this;
  readonly bgCyan: this;
  readonly bgWhite: this;
  readonly bgGray: this;
  readonly bgGrey: this;

  readonly bgBlackBright: this;
  readonly bgRedBright: this;
  readonly bgGreenBright: this;
  readonly bgYellowBright: this;
  readonly bgBlueBright: this;
  readonly bgMagentaBright: this;
  readonly bgCyanBright: this;
  readonly bgWhiteBright: this;
}

export type IncomingMessageType = {
  timestamp?: number;
  message: string | Record<string, unknown> | Error;
  level: LogLevelKeys;
  subtitle?: string;
};

export type MessageBuilderFunc<M, T> = (message: M, pad?: string) => T;

export type SegmentFunc<M, T> = (
  segment: ILogger,
  title: ILogger,
) => MessageBuilderFunc<M, T>;

export type SegmentFuncMinimal<M, T> = (
  segment: ILogger,
) => MessageBuilderFunc<M, T>;

export type ColorBuilderFunc<M, T, K> = (
  titleBuilder: MessageBuilderFunc<M, T>,
  segmentBuilder: MessageBuilderFunc<M, T>,

  theme?: Theme,
) => (message: K) => string;

export interface IMessageStripe {
  dateTime?: string;
  timeZone?: string;
  level: LogLevelKeys;
  title: string;
  description?: string;
}

export type UseSegmentToGetMessageBuilderFunc<M, T> = (
  logger: ILogger,
  printer: ILogger,
  edge?: ILogger,
) => MessageBuilderFunc<M, T>;

export type ColorArgs = { fg: ILogger; bg: ILogger; textColor: ILogger };
export type ColorNames = keyof ILogger;

export type SegmentType = { text: string; bg: ColorNames; fg: ColorNames };
export type SegmentBuilderType = {
  text: string;
  bg: ColorNames;
  fg: ColorNames;
  pad: {
    leading: string;
    trailing: string;
  };
  next: boolean;
  first: boolean;
  arrow: {
    fg: ColorNames;
    bg: ColorNames;
  };
};
