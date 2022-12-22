// Vendors
import { describe, it, expect } from "vitest";
// Validators
import {
  doesFileHaveInvalidStructure,
  doesFileHaveInvalidFlatStructure,
  checkForInvalidFiles,
  CheckForInvalidFilesProps,
} from "../structure-validator.mjs";

describe("Structure validator entrypoint", () => {
  // invalid
  const invalidFiles = [
    "/nice-one/components/kebab-case.tsx",
    // TODO: More examples
  ];
  const invalidFlatFiles = [
    "/components/kebab-case.container.tsx",
    "/nice-one/components/kebab-case.tsx",
    // TODO: More examples
  ];

  // valid
  const validFiles = [
    "/nice-one/components/kebab-case.component.tsx",
    // TODO: More examples
  ];
  const validFlatFiles = [
    "/components/kebab-case.component.tsx",
    // TODO: More examples
  ];

  const params = {
    files: [
      "/components/kebab-case.component.tsx",
      "/components/kebab-case.component.tsx",
    ],
    options: {
      earlyStopping: false,
      flat: false,
    },
  } as CheckForInvalidFilesProps;

  it.concurrent("should be a valid structure file", () => {
    const result = doesFileHaveInvalidStructure(validFiles[0]);
    expect(result).toBe(false);
  });

  it.concurrent("should be an invalid structure file", () => {
    const result = doesFileHaveInvalidStructure(invalidFiles[0]);
    expect(result).toBe(true);
  });

  it.concurrent("should be a valid flat structure file", () => {
    const result = doesFileHaveInvalidFlatStructure(validFlatFiles[0]);
    expect(result).toBe(false);
  });

  it.concurrent("should be a valid flat structure file", () => {
    const result = doesFileHaveInvalidFlatStructure(invalidFlatFiles[0]);
    expect(result).toBe(true);
  });

  const byString = (file: string): boolean => typeof file !== "string";

  it.concurrent("should check for valid files structure", () => {
    const result = checkForInvalidFiles({ ...params, files: validFiles });

    expect(result).not.toBe(undefined);
    // expects an array of strings
    expect(result.filter(byString)).toHaveLength(result.length);
    expect(result).toHaveLength(0);
  });

  it.concurrent("should check for invalid files structure", () => {
    const result = checkForInvalidFiles({ ...params, files: invalidFiles });

    expect(result).not.toBe(undefined);
    // expects an array of strings
    expect(result.filter(byString)).toHaveLength(result.length);
    expect(result.length).toBeGreaterThan(0);
  });

  it.concurrent(
    "should check for valid files structure with early stopping",
    () => {
      const result = checkForInvalidFiles({
        files: validFiles,
        options: { ...params.options, earlyStopping: true },
      });

      expect(result).not.toBe(undefined);
      // expects an array of strings
      expect(result.filter(byString)).toHaveLength(result.length);
      expect(result.length).toHaveLength(0);
    }
  );

  it.concurrent(
    "should check for invalid files structure with early stopping",
    () => {
      const result = checkForInvalidFiles({
        files: invalidFiles,
        options: { ...params.options, earlyStopping: true },
      });

      expect(result).not.toBe(undefined);
      // expects an array of strings
      expect(result.filter(byString)).toHaveLength(result.length);
      expect(result.length).toBeGreaterThan(0);
    }
  );

  it.concurrent("should check for valid files flat structure", () => {
    const result = checkForInvalidFiles({
      files: validFlatFiles,
      options: { ...params.options, flat: true },
    });

    expect(result).not.toBe(undefined);
    // expects an array of strings
    expect(result.filter(byString)).toHaveLength(result.length);
    expect(result.length).toHaveLength(0);
  });

  it.concurrent("should check for invalid files flat structure", () => {
    const result = checkForInvalidFiles({
      files: invalidFlatFiles,
      options: { ...params.options, flat: true },
    });

    expect(result).not.toBe(undefined);
    // expects an array of strings
    expect(result.filter(byString)).toHaveLength(result.length);
    expect(result.length).toBeGreaterThan(0);
  });

  it.concurrent(
    "should check for valid files flat structure with early stopping",
    () => {
      const result = checkForInvalidFiles({
        files: validFlatFiles,
        options: { ...params.options, earlyStopping: true, flat: true },
      });

      expect(result).not.toBe(undefined);
      // expects an array of strings
      expect(result.filter(byString)).toHaveLength(result.length);
      expect(result.length).toHaveLength(0);
    }
  );

  it.concurrent(
    "should check for invalid files flat structure with early stopping",
    () => {
      const result = checkForInvalidFiles({
        files: invalidFlatFiles,
        options: { ...params.options, earlyStopping: true, flat: true },
      });

      expect(result).not.toBe(undefined);
      // expects an array of strings
      expect(result.filter(byString)).toHaveLength(result.length);
      expect(result.length).toBeGreaterThan(0);
    }
  );
});
