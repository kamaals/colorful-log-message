import { modifier } from "../config/styles";
import { colors } from "../config/colors";
import { ANSI_BACKGROUND_OFFSET } from "../config/defaults";
import { AnsiStyles } from "../@types";

const styles: AnsiStyles = {
  modifier,
  color: colors.fg,
  bgColor: colors.bg,
} as unknown as AnsiStyles;

export const wrapAnsi16 =
  (offset = 0) =>
  (code: number) =>
    `\u001B[${code + offset}m`;

export const wrapAnsi256 =
  (offset = 0) =>
  (code: number) =>
    `\u001B[${38 + offset};5;${code}m`;

export const wrapAnsi16m =
  (offset = 0) =>
  (r: number, g: number, b: number) =>
    `\u001B[${38 + offset};2;${r};${g};${b}m`;

export function generateColors() {
  const codes = new Map();

  for (const [groupName, group] of Object.entries(styles)) {
    for (const [styleName, style] of Object.entries(group)) {
      // @ts-ignore
      styles[styleName] = {
        open: `\u001B[${style[0]}m`,
        close: `\u001B[${style[1]}m`,
      };

      // @ts-ignore
      group[styleName] = styles[styleName];

      codes.set(style[0], style[1]);
    }

    Object.defineProperty(styles, groupName, {
      value: group,
      enumerable: false,
    });
  }

  Object.defineProperty(styles, "codes", {
    value: codes,
    enumerable: false,
  });

  styles.color.close = "\u001B[39m";
  styles.bgColor.close = "\u001B[49m";

  styles.color.ansi = wrapAnsi16();
  styles.color.ansi256 = wrapAnsi256();
  styles.color.ansi16m = wrapAnsi16m();
  styles.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);

  Object.defineProperties(styles, {
    rgbToAnsi256: {
      value(red: number, green: number, blue: number) {
        // We use the extended greyscale palette here, with the exception of
        // black and white. normal palette only has 4 greyscale shades.
        if (red === green && green === blue) {
          if (red < 8) {
            return 16;
          }

          if (red > 248) {
            return 231;
          }

          return Math.round(((red - 8) / 247) * 24) + 232;
        }

        return (
          16 +
          36 * Math.round((red / 255) * 5) +
          6 * Math.round((green / 255) * 5) +
          Math.round((blue / 255) * 5)
        );
      },
      enumerable: false,
    },
    hexToRgb: {
      value(hex: string) {
        // @ts-ignore
        const matches = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex.toString(16));
        if (!matches) {
          return [0, 0, 0];
        }

        let [colorString] = matches;

        if (colorString.length === 3) {
          colorString = [...colorString]
            .map((character) => character + character)
            .join("");
        }

        const integer = Number.parseInt(colorString, 16);

        return [
          /* eslint-disable no-bitwise */
          (integer >> 16) & 0xff,
          (integer >> 8) & 0xff,
          integer & 0xff,
          /* eslint-enable no-bitwise */
        ];
      },
      enumerable: false,
    },
    hexToAnsi256: {
      value: (hex: string) => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
      enumerable: false,
    },
    ansi256ToAnsi: {
      value(code: number) {
        if (code < 8) {
          return 30 + code;
        }

        if (code < 16) {
          return 90 + (code - 8);
        }

        let red;
        let green;
        let blue;

        if (code >= 232) {
          red = ((code - 232) * 10 + 8) / 255;
          green = red;
          blue = red;
        } else {
          code -= 16;

          const remainder = code % 36;

          red = Math.floor(code / 36) / 5;
          green = Math.floor(remainder / 6) / 5;
          blue = (remainder % 6) / 5;
        }

        const value = Math.max(red, green, blue) * 2;

        if (value === 0) {
          return 30;
        }

        // eslint-disable-next-line no-bitwise
        let result =
          30 +
          ((Math.round(blue) << 2) |
            (Math.round(green) << 1) |
            Math.round(red));

        if (value === 2) {
          result += 60;
        }

        return result;
      },
      enumerable: false,
    },
    rgbToAnsi: {
      value: (red: number, green: number, blue: number) =>
        styles.ansi256ToAnsi(styles.rgbToAnsi256(red, green, blue)),
      enumerable: false,
    },
    hexToAnsi: {
      value: (hex: string) => styles.ansi256ToAnsi(styles.hexToAnsi256(hex)),
      enumerable: false,
    },
  });

  return styles;
}

const ansiStyles: AnsiStyles = generateColors();

export default ansiStyles;
