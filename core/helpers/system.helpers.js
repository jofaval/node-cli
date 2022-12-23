// Vendors
import fileExtraPackage from "fs-extra";
import path from "path";
// Constants
import { DIRECTORY_SEPARATOR } from "../constants/core.constants.js";
// Safe import for CommonJS packages
const { readdirSync, statSync } = fileExtraPackage;
export function joinPaths(...paths) {
    return [...paths].join(DIRECTORY_SEPARATOR);
}
/**
 * @source https://coderrocketfuel.com/article/recursively-list-all-the-files-in-a-directory-using-node-js
 */
export function getAllFiles(dirPath, arrayOfFiles) {
    const files = readdirSync(dirPath);
    let array = arrayOfFiles ?? [];
    files.forEach((file) => {
        const newPathName = path.join(dirPath, "/", file);
        if (statSync(dirPath + "/" + file).isDirectory()) {
            array = getAllFiles(newPathName, array);
        }
        else {
            array.push(newPathName);
        }
    });
    return array;
}
export default { joinPaths };
