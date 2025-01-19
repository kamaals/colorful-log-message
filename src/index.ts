import { logCreator } from "./utils/builder";
import { getLogger } from "./utils/message-builder";

export * from "./@types";
const logger = logCreator();
export { getLogger, logger };
