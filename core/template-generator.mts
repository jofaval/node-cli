// Vendors
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  statSync,
  writeFileSync,
} from "fs";
import path from "path";
// Constants
import {
  DIRECTORY_SEPARATOR,
  TARGET_DIR,
  TEMPLATES_DIR,
} from "./constants/core.constants.js";
// Helpers
import { capitalizeArray } from "./helpers/strings.helpers.js";
// Types
import {
  CaseDictionary,
  Template,
  TemplatesTargetDirs,
} from "./types/templates.types.js";
// System
import { copyDir, getCurrentPath } from "./system.core.mjs";

export type GenerateDirsProps = {
  template: Template;
  srcDir?: string | null | undefined;
};

export type GenerateDirsResponse = {
  templateDir: string;
  targetDir: string;
};

export function joinPaths(...paths: string[]): string {
  return [...paths].join(DIRECTORY_SEPARATOR);
}

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

const WORD_SEPARATOR = "-";

export function toCamelCase(name: string): string {
  return capitalizeArray(name.split(WORD_SEPARATOR))
    .split("")
    .map((character, index) => {
      if (index == 0) character.toLocaleLowerCase();
      return character;
    })
    .join("");
}

export function toKebabCase(name: string): string {
  // this one should be the default naming
  return name;
}

export function toLowerCase(name: string): string {
  return name.split(WORD_SEPARATOR).join("").toLocaleLowerCase();
}

export function toPascalCase(name: string): string {
  return capitalizeArray(name.split(WORD_SEPARATOR));
}

export function toSerpentCase(name: string): string {
  return name.split(WORD_SEPARATOR).join("_").toLocaleLowerCase();
}

export function toUpperCase(name: string): string {
  return name.split(WORD_SEPARATOR).join("_").toLocaleUpperCase();
}

const CaseDictionaryTransformer = {
  [CaseDictionary.CAMEL_CASE]: toCamelCase,
  [CaseDictionary.KEBAB_CASE]: toKebabCase,
  [CaseDictionary.LOWER_CASE]: toLowerCase,
  [CaseDictionary.PASCAL_CASE]: toPascalCase,
  [CaseDictionary.SERPENT_CASE]: toSerpentCase,
  [CaseDictionary.UPPER_CASE]: toUpperCase,
} as const;

export function sanitize(name: string): string {
  return encodeURI(name);
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
      renameSync(originalPath, newPath);
    } catch (error) {
      console.warn("It was already moved, destination exists");
    }

    try {
      if (!existsSync(newPath)) {
        mkdirSync(newPath);
      }

      writeFileSync(newPath, content);
    } catch (error) {
      console.log("Couldn't write to file", newPath);
      console.error(error);
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

  const success = copyDir(templateDir, targetDir);

  if (success) {
    replaceCasesInFilesAndFolders(targetDir, name);

    // TODO: add element to the index.ts?
    // if so, a comment should be added at the end of the line
    // smart addition
  }
}
