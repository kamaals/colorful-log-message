import { isUnicodeSupported } from "./unicode";

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
      (gotCR ? "\r\n" : "\n") +
      postfix;
    endIndex = index + 1;
    index = string.indexOf("\n", endIndex);
  } while (index !== -1);

  returnValue += string.slice(endIndex);
  return returnValue;
}

export function fillWithPad(withString: string, length = 11, pad = " ") {
  const total = withString.length;
  const remaining = length > total + 1 ? length - total : 1;
  const rightSpace = pad.repeat(remaining);
  return `${withString}${rightSpace}`;
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
