import { isUnicodeSupported } from "./unicode";
import { NEW_LINE } from "../config/defaults";

export function stringReplaceAll(
  string: string,
  substring: string,
  replacer: string,
) {
  let index = string.indexOf(substring);
  if (index === -1) {
    return string;
  }

  const substringLength = substring.length;
  let endIndex = 0;
  let returnValue = "";
  do {
    returnValue += string.slice(endIndex, index) + substring + replacer;
    endIndex = index + substringLength;
    index = string.indexOf(substring, endIndex);
  } while (index !== -1);

  returnValue += string.slice(endIndex);
  return returnValue;
}

export function stringEncaseCRLFWithFirstIndex(
  string: string,
  prefix: string,
  postfix: string,
  index: number,
) {
  let endIndex = 0;
  let returnValue = "";
  do {
    const gotCR = string[index - 1] === "\r";
    returnValue +=
      string.slice(endIndex, gotCR ? index - 1 : index) +
      prefix +
      (gotCR ? "\r\n" : NEW_LINE) +
      postfix;
    endIndex = index + 1;
    index = string.indexOf(NEW_LINE, endIndex);
  } while (index !== -1);

  returnValue += string.slice(endIndex);
  return returnValue;
}

export const isNotEmpty = (obj: Record<string, unknown> | any) =>
  Object.keys(obj).length > 0;

export const getSymbol = (unicode: string, fallback = "", pad = "") => {
  return isUnicodeSupported()
    ? `${pad}${unicode}${pad}`
    : fallback
      ? `${pad}${fallback}${pad}`
      : pad;
};

export const getLines = (str: string) => str.split(/\r\n|\r|\n/);

export const getMiddleOfTheLine = (lines: Array<string>) =>
  Math.floor(lines.length / 2);

export const smallFirst = (str: string) =>
  str.charAt(0).toLowerCase() + str.slice(1);
