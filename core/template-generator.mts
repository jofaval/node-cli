// Vendors
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from "fs";
import fsExtraPkg from "fs-extra";
import path from "path";
// Constants
import { TARGET_DIR, TEMPLATES_DIR } from "./constants/core.constants.js";
// Helpers
import { joinPaths } from "./helpers/system.helpers.js";
import { CaseDictionaryTransformer } from "./helpers/case.helpers.mjs";
// Types
import {
  CaseDictionary,
  Template,
  TemplatesTargetDirs,
} from "./types/templates.types.js";
// System
import { copyDir, getCurrentPath } from "./system.core.mjs";
// Manual import
const { moveSync } = fsExtraPkg;

export type GenerateDirsProps = {
  template: Template;
  srcDir?: string | null | undefined;
};

export type GenerateDirsResponse = {
  templateDir: string;
  targetDir: string;
};

export function generateDirs({
  template,
  srcDir = null,
}: GenerateDirsProps): GenerateDirsResponse {
  const targetFolder = TemplatesTargetDirs[template];
  const __dirname = getCurrentPath();

  const templateDir = joinPaths(__dirname, TEMPLATES_DIR, targetFolder);

  const baseDir = srcDir ?? TARGET_DIR;
  const targetDir = joinPaths(__dirname, "..", baseDir, targetFolder);

  return { templateDir, targetDir };
}

export function replaceCasingPlaceholders(
  content: string,
  name: string
): string {
  return Object.values(CaseDictionary).reduce((text, _case) => {
    return text.replaceAll(_case, CaseDictionaryTransformer[_case](name));
  }, content);
}

/**
 * @source https://coderrocketfuel.com/article/recursively-list-all-the-files-in-a-directory-using-node-js
 */
function getAllFiles(dirPath: string, arrayOfFiles: string[]): string[] {
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

export function replaceCasesInFilesAndFolders(targetDir: string, name: string) {
  const files = getAllFiles(targetDir, []);
  files.forEach((filename) => {
    const originalPath = filename;
    const newPath = replaceCasingPlaceholders(originalPath, name);

    // console.log({ originalPath, newPath });

    let content = "";
    try {
      content = readFileSync(originalPath, { encoding: "utf-8" });
      content = replaceCasingPlaceholders(content, name);
    } catch (error) {
      console.warn("Couldn't read file", newPath);
      console.error(error);
    }

    try {
      moveSync(originalPath, newPath);
    } catch (error) {
      // console.warn("It was already moved, destination exists");
    }

    try {
      // create the dir if doesn't exists
      if (!existsSync(newPath)) {
        mkdirSync(newPath);
      }

      writeFileSync(newPath, content);
    } catch (error) {
      console.warn("Couldn't write to file", newPath);
      console.error(error);
    }

    // safety measure, it should have nothing to delete, but just in case
    try {
      unlinkSync(originalPath);
    } catch (error) {
      // console.warn("Couldn't remove the original path", newPath);
      // console.error(error);
    }

    return newPath;
  });
}

type MakeFromTemplateProps = GenerateDirsProps & {
  name: string;
};

export function makeFromTemplate({
  template,
  srcDir,
  name,
}: MakeFromTemplateProps) {
  const { templateDir, targetDir } = generateDirs({ template, srcDir });

  if (!existsSync(templateDir)) {
    throw new Error(
      [
        "This template does not exist, you can create it via:",
        `mkdir ./core/templates/${template}`,
        "",
      ].join("\n")
    );
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
  } else {
    console.log("Something happened while trying to copy the directory");
  }

  console.log("Finished!!");
}
