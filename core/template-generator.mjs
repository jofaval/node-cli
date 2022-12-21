// Vendors
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, unlinkSync, writeFileSync, } from "fs";
import fsExtraPkg from "fs-extra";
import path from "path";
// Constants
import { DIRECTORY_SEPARATOR, TARGET_DIR, TEMPLATES_DIR, } from "./constants/core.constants.js";
// Helpers
import { capitalizeArray } from "./helpers/strings.helpers.js";
// Types
import { CaseDictionary, TemplatesTargetDirs, } from "./types/templates.types.js";
// System
import { copyDir, getCurrentPath } from "./system.core.mjs";
// Manual import
const { moveSync } = fsExtraPkg;
export function joinPaths(...paths) {
    return [...paths].join(DIRECTORY_SEPARATOR);
}
export function generateDirs({ template, srcDir = null, }) {
    const targetFolder = TemplatesTargetDirs[template];
    const __dirname = getCurrentPath();
    const templateDir = joinPaths(__dirname, TEMPLATES_DIR, targetFolder);
    const baseDir = srcDir ?? TARGET_DIR;
    const targetDir = joinPaths(__dirname, "..", baseDir, targetFolder);
    return { templateDir, targetDir };
}
const WORD_SEPARATOR = "-";
export function toCamelCase(name) {
    const pascalCase = capitalizeArray(name.split(WORD_SEPARATOR));
    return (pascalCase[0]?.toLocaleLowerCase() ?? "") + pascalCase.slice(1);
}
export function toKebabCase(name) {
    // this one should be the default naming
    return name;
}
export function toLowerCase(name) {
    return name.split(WORD_SEPARATOR).join("").toLocaleLowerCase();
}
export function toPascalCase(name) {
    return capitalizeArray(name.split(WORD_SEPARATOR));
}
export function toSerpentCase(name) {
    return name.split(WORD_SEPARATOR).join("_").toLocaleLowerCase();
}
export function toUpperCase(name) {
    return name.split(WORD_SEPARATOR).join("_").toLocaleUpperCase();
}
const CaseDictionaryTransformer = {
    [CaseDictionary.CAMEL_CASE]: toCamelCase,
    [CaseDictionary.KEBAB_CASE]: toKebabCase,
    [CaseDictionary.LOWER_CASE]: toLowerCase,
    [CaseDictionary.PASCAL_CASE]: toPascalCase,
    [CaseDictionary.SERPENT_CASE]: toSerpentCase,
    [CaseDictionary.UPPER_CASE]: toUpperCase,
};
export function sanitize(name) {
    return encodeURI(name);
}
export function replaceCasingPlaceholders(content, name) {
    return Object.values(CaseDictionary).reduce((text, _case) => {
        return text.replaceAll(_case, CaseDictionaryTransformer[_case](name));
    }, content);
}
/**
 * @source https://coderrocketfuel.com/article/recursively-list-all-the-files-in-a-directory-using-node-js
 */
function getAllFiles(dirPath, arrayOfFiles) {
    const files = readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach((file) => {
        const newPathName = path.join(dirPath, "/", file);
        if (statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(newPathName, arrayOfFiles);
        }
        else {
            arrayOfFiles.push(newPathName);
        }
    });
    return arrayOfFiles;
}
export function replaceCasesInFilesAndFolders(targetDir, name) {
    const files = getAllFiles(targetDir, []);
    files.forEach((filename) => {
        const originalPath = filename;
        const newPath = replaceCasingPlaceholders(originalPath, name);
        // console.log({ originalPath, newPath });
        let content = "";
        try {
            content = readFileSync(originalPath, { encoding: "utf-8" });
            content = replaceCasingPlaceholders(content, name);
        }
        catch (error) {
            console.warn("Couldn't read file", newPath);
            console.error(error);
        }
        try {
            moveSync(originalPath, newPath);
        }
        catch (error) {
            // console.warn("It was already moved, destination exists");
        }
        try {
            // create the dir if doesn't exists
            if (!existsSync(newPath)) {
                mkdirSync(newPath);
            }
            writeFileSync(newPath, content);
        }
        catch (error) {
            console.warn("Couldn't write to file", newPath);
            console.error(error);
        }
        // safety measure, it should have nothing to delete, but just in case
        try {
            unlinkSync(originalPath);
        }
        catch (error) {
            // console.warn("Couldn't remove the original path", newPath);
            // console.error(error);
        }
        return newPath;
    });
}
export function makeFromTemplate({ template, srcDir, name, }) {
    const { templateDir, targetDir } = generateDirs({ template, srcDir });
    const success = copyDir(templateDir, targetDir);
    if (success) {
        replaceCasesInFilesAndFolders(targetDir, name);
        // TODO: add element to the index.ts?
        // if so, a comment should be added at the end of the line
        // smart addition
    }
    console.log();
    if (success) {
        console.log("Properly copied the directory");
    }
    else {
        console.log("Something happened while trying to copy the directory");
    }
    console.log("Finished!!");
}
