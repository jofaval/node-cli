export const SpecialTypologyCases = {
  components: ["component", "styled", "module"],
  services: ["service", "resolver", "query"],
} as const;

export function doesFileHaveInvalidStructure(file: string): boolean {
  throw new Error("TODO: implement");
  // TODO: get the template to evaluate
  // TODO: evaluate a good nesting structure
  // TODO: detect and evaluate the typology,
  // it should have one, and of length 3 (when splitted)
  return true;
}

export function doesFileHaveInvalidFlatStructure(file: string): boolean {
  throw new Error("TODO: implement");
  // TODO: implement
  return true;
}

type CheckForInvalidFilesOptions = {
  earlyStopping?: boolean | undefined;
  flat?: boolean | undefined;
};

type CheckForInvalidFilesProps = {
  files: string[];
  options?: CheckForInvalidFilesOptions;
};

export function checkForInvalidFiles({
  files,
  options: { earlyStopping, flat } = {},
}: CheckForInvalidFilesProps): string[] {
  const isFileInvalid = flat
    ? doesFileHaveInvalidFlatStructure
    : doesFileHaveInvalidStructure;

  if (earlyStopping) {
    const invalidFile = files.find(isFileInvalid);
    if (invalidFile) {
      return [invalidFile];
    }

    return [];
  }

  return files.filter(isFileInvalid);
}
