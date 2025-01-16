import {LogLevel, LogName} from "../@types";

export const defaultLogNames: LogName = {
    app: {
        success: "App success",
        error: "App error",
        warn: "App warn",
        info: "App info",
        http: "App http",
        debug: "App debug",
    },
    db: {
        success: "Db success",
        error: "Db error",
        warn: "Db warn",
        info: "Db info",
        http: "Db http",
        debug: "Db debug",
    },
    http: {
        success: "Http success",
        error: "Http error",
        warn: "Http warn",
        info: "Http info",
        http: "Http http",
        debug: "Http debug",
    },
}

export const defaultLevels: LogLevel = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    success: 4,
    debug: 5,
};

export const ANSI_BACKGROUND_OFFSET = 10;

export const GENERATOR = Symbol('GENERATOR');
export const STYLER = Symbol('STYLER');
export const IS_EMPTY = Symbol('IS_EMPTY');

export const levelMapping = [
    'ansi',
    'ansi',
    'ansi256',
    'ansi16m',
];
