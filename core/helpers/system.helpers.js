import { DIRECTORY_SEPARATOR } from "../constants/core.constants.js";
export function joinPaths(...paths) {
    return [...paths].join(DIRECTORY_SEPARATOR);
}
