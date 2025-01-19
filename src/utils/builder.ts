import {
  LoggerFunction,
  IOptions,
  ILogOptions,
  StylerType,
  ASCIIDOCTOR,
  StylerParent,
  RGBParams,
  ILogger,
} from "../@types";
import ansiStyles from "./ansi";
import {
  GENERATOR,
  IS_EMPTY,
  levelMapping,
  NEW_LINE,
  STYLER,
} from "../config/defaults";
import { stringEncaseCRLFWithFirstIndex, stringReplaceAll } from "./helper";

const styles = Object.create(null);

const applyOptions = (
  object: LoggerFunction & ILogOptions,
  options: IOptions = {},
) => {
  if (
    options.level &&
    !(
      Number.isInteger(options.level) &&
      options.level >= 0 &&
      options.level <= 3
    )
  ) {
    throw new Error("The `level` option should be an integer from 0 to 3");
  }
  const colorLevel = 0;
  object.level = options.level === undefined ? colorLevel : options.level;
};

export const factory = (options: any) => {
  const logger: LoggerFunction = (...strings: Array<string>) =>
    strings.join(" ");
  applyOptions(logger, options);
  Object.setPrototypeOf(logger, logCreator.prototype);
  return logger;
};

export function logCreator(
  options: { level: number } = { level: 1 },
): LoggerFunction & ILogOptions & ILogger {
  return factory(options) as ILogger;
}

Object.setPrototypeOf(logCreator.prototype, Function.prototype);

for (const [styleName, st] of Object.entries(ansiStyles)) {
  const style = st as ASCIIDOCTOR;
  styles[styleName] = {
    get() {
      const builder = createBuilder(
        this,
        createStyler(style.open, style.close, this[STYLER] as StylerParent),
        this[IS_EMPTY],
      );
      Object.defineProperty(this, styleName, { value: builder });
      return builder;
    },
  };
}

const createStyler = (
  open: string,
  close: string,
  parent?: StylerParent,
): StylerType => {
  let openAll;
  let closeAll;
  if (parent === undefined) {
    openAll = open;
    closeAll = close;
  } else {
    openAll = parent.openAll + open;
    closeAll = close + parent.closeAll;
  }

  return {
    open,
    close,
    openAll,
    closeAll,
    parent,
  } as unknown as StylerType;
};

const proto = Object.defineProperties(() => {}, {
  ...styles,
  level: {
    enumerable: true,
    get() {
      return this[GENERATOR].level;
    },
    set(level) {
      this[GENERATOR].level = level;
    },
  },
});

const createBuilder = (self: any, _styler: StylerType, _isEmpty: any) => {
  // Single argument is hot path, implicit coercion is faster than anything
  // eslint-disable-next-line no-implicit-coercion
  const builder = (...arguments_: any) =>
    applyStyle(
      builder,
      arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "),
    );

  // We alter the prototype because we must return a function, but there is
  // no way to create a function with a different prototype
  Object.setPrototypeOf(builder, proto);

  builder[GENERATOR] = self;
  builder[STYLER] = _styler;
  builder[IS_EMPTY] = _isEmpty;

  return builder;
};

const applyStyle = (self: any, string: string) => {
  if (self.level <= 0 || !string) {
    return self[IS_EMPTY] ? "" : string;
  }

  let styler = self[STYLER];

  if (styler === undefined) {
    return string;
  }

  const { openAll, closeAll } = styler;
  if (string.includes("\u001B")) {
    while (styler !== undefined) {
      string = stringReplaceAll(string, styler.close, styler.open);
      styler = styler.parent;
    }
  }
  const lfIndex = string.indexOf(NEW_LINE);
  if (lfIndex !== -1) {
    string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
  }
  return openAll + string + closeAll;
};

for (const [styleName, st] of Object.entries(ansiStyles)) {
  const style = st as ASCIIDOCTOR;
  styles[styleName] = {
    get() {
      const builder = createBuilder(
        this,
        createStyler(style.open, style.close, this[STYLER]),
        this[IS_EMPTY],
      );
      Object.defineProperty(this, styleName, { value: builder });
      return builder;
    },
  };
}

styles.visible = {
  get() {
    const builder = createBuilder(this, this[STYLER], true);
    Object.defineProperty(this, "visible", { value: builder });
    return builder;
  },
};

const getModelAnsi = (
  model: string,
  level: string,
  type: "color" | "bgColor",
  ...arguments_: any
) => {
  if (model === "rgb") {
    if (level === "ansi16m") {
      return ansiStyles[type].ansi16m(...(arguments_ as RGBParams));
    }

    if (level === "ansi256") {
      return ansiStyles[type].ansi256(
        ansiStyles.rgbToAnsi256(...(arguments_ as RGBParams)),
      );
    }

    return ansiStyles[type].ansi(
      ansiStyles.rgbToAnsi(...(arguments_ as RGBParams)),
    );
  }

  if (model === "hex") {
    return getModelAnsi(
      "rgb",
      level,
      type,
      ...ansiStyles.hexToRgb(arguments_.at(-1) as string),
    );
  }
  // @ts-ignore
  return ansiStyles[type][model](...arguments_);
};

const usedModels = ["rgb", "hex", "ansi256"];

for (const model of usedModels) {
  styles[model] = {
    get() {
      const { level } = this;
      return function (...arguments_: any) {
        const styler = createStyler(
          getModelAnsi(model, levelMapping[level], "color", ...arguments_),
          ansiStyles.color.close,
          // @ts-ignore
          this[STYLER] as StylerParent,
        );
        // @ts-ignore
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    },
  };

  const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
  styles[bgModel] = {
    get() {
      const { level } = this;
      return function (...arguments_: any) {
        const styler = createStyler(
          getModelAnsi(model, levelMapping[level], "bgColor", ...arguments_),
          ansiStyles.bgColor.close,
          // @ts-ignore
          this[STYLER],
        );
        // @ts-ignore
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    },
  };
}

Object.defineProperties(logCreator.prototype, styles);
