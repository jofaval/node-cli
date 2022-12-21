import { DIRECTORY_SEPARATOR } from "../constants/core.constants.js";

export function joinPaths(...paths: string[]): string {
  return [...paths].join(DIRECTORY_SEPARATOR);
}

export default { joinPaths };
