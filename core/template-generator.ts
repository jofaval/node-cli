import { DIRECTORY_SEPARATOR, TEMPLATES_DIR } from "./constants/core.constants";
import {
  CaseDictionary,
  Template,
  TemplatesTargetDirs,
} from "./types/templates.types";

type GenerateTargetDirProps = {
  template: Template;
  name: string;
};

function generateTargetDir({ template, name }: GenerateTargetDirProps): string {
  const targetFolder = TemplatesTargetDirs[template];

  const targetDir = targetFolder;

  return targetDir;
}

export function caseReplacer(targetDir: string) {
  Object.values(CaseDictionary).forEach((candidateCase) => {
    // TODO: replace content in all files
    // TODO: replace name in all filenames
  });
}

export function createTemplate(props: GenerateTargetDirProps) {
  const originalDir = [TEMPLATES_DIR, TemplatesTargetDirs[props.template]].join(
    DIRECTORY_SEPARATOR
  );
  const targetDir = generateTargetDir(props);

  const success = copyDir(originalDir, targetDir);

  if (success) {
    caseReplacer(targetDir);

    // TODO: add element to the index.ts?
    // if so, a comment should be added at the end of the line
    // smart addition
  }
}
