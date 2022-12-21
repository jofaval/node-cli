// Vendors
import { readdirSync, statSync } from "fs-extra";
import path from "path";
// Constants
import { DIRECTORY_SEPARATOR } from "../constants/core.constants.js";

export function joinPaths(...paths: string[]): string {
  return [...paths].join(DIRECTORY_SEPARATOR);
}

/**
 * @source https://coderrocketfuel.com/article/recursively-list-all-the-files-in-a-directory-using-node-js
 */
export function getAllFiles(
  dirPath: string,
  arrayOfFiles: string[] = []
): string[] {
  const files = readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach((file) => {
    const newPathName = path.join(dirPath, "/", file);
    if (statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(newPathName, arrayOfFiles);
    } else {
      arrayOfFiles.push(newPathName);
    }
  });

  return arrayOfFiles;
}

export default { joinPaths };
