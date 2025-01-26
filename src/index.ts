import { createColored } from "./utils/builder";
import { getLogger } from "./utils/message-builder";

export * from "./@types";
const colored = createColored();
export { getLogger, colored };
