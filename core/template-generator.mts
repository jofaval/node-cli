import { readdirSync, readFileSync, rename, writeFileSync } from "fs";
import { DIRECTORY_SEPARATOR, TEMPLATES_DIR } from "./constants/core.constants";
import { capitalizeArray } from "./helpers/strings.helpers";
import {
  CaseDictionary,
  Template,
  TemplatesTargetDirs,
} from "./types/templates.types";

export type GenerateTargetDirProps = {
  template: Template;
  name: string;
};

export function generateTargetDir({
  template,
  name,
}: GenerateTargetDirProps): string {
  const targetFolder = TemplatesTargetDirs[template];

  const targetDir = targetFolder;
  // TODO: implement

  return targetDir;
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

export function caseReplacer(targetDir: string, name: string) {
  const files = readdirSync(targetDir);

  const newFilesMap = new Map<string, { newPath: string; content: string }>(
    files.map((file) => [
      file,
      { newPath: replaceCasingPlaceholders(file, name), content: "" },
    ])
  );

  files.forEach((file) => {
    let content = readFileSync(file, { encoding: "utf-8" });
    content = replaceCasingPlaceholders(content, name);
  });

  newFilesMap.forEach(({ newPath, content }, oldPath) => {
    rename(oldPath, newPath, () => {
      writeFileSync(newPath, content);
    });
  });
}

export function makeFromTemplate(props: GenerateTargetDirProps) {
  const originalDir = [TEMPLATES_DIR, TemplatesTargetDirs[props.template]].join(
    DIRECTORY_SEPARATOR
  );
  const targetDir = generateTargetDir(props);

  const success = copyDir(originalDir, targetDir);

  if (success) {
    caseReplacer(targetDir, props.name);

    // TODO: add element to the index.ts?
    // if so, a comment should be added at the end of the line
    // smart addition
  }
}
