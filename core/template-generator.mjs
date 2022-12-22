// Vendors
import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync, } from "fs";
import fsExtraPkg from "fs-extra";
// Constants
import { TARGET_DIR, TEMPLATES_DIR } from "./constants/core.constants.js";
// Helpers
import { getAllFiles, joinPaths } from "./helpers/system.helpers.js";
import { replaceCasingPlaceholders } from "./helpers/case.helpers.mjs";
// Types
import { TemplatesTargetDirs } from "./types/templates.types.js";
// System
import { copyDir, getCurrentPath } from "./system.core.mjs";
// Manual import
const { moveSync } = fsExtraPkg;
export function generateDirs({ template, srcDir = null, }) {
    const targetFolder = TemplatesTargetDirs[template];
    const __dirname = getCurrentPath();
    const templateDir = joinPaths(__dirname, TEMPLATES_DIR, targetFolder);
    const baseDir = srcDir ?? TARGET_DIR;
    const targetDir = joinPaths(__dirname, "..", baseDir, targetFolder);
    return { templateDir, targetDir };
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
    if (!existsSync(templateDir)) {
        throw new Error([
            "This template does not exist, you can create it via:",
            `mkdir ./core/templates/${template}`,
            "",
        ].join("\n"));
    }
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
