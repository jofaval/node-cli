// Vendors
import { readFileSync } from "fs";
import path from "path";
import { describe, it, expect } from "vitest";
// Helpers
import {
  replaceCasingPlaceholders,
  sanitize,
  toCamelCase,
  toKebabCase,
  toLowerCase,
  toPascalCase,
  toSerpentCase,
  toSpaceCase,
  toUpperCase,
} from "../case.helpers.mjs";

const MOCK_PATH = path.join(__dirname, "../__mocks__/case");

describe("Case utilities", () => {
  const name = "Template-name-with-spaces";

  it.concurrent("should sanitize a word", () => {
    expect(sanitize("healthy")).toBe("healthy");
  });

  it.concurrent("should replace case in file path", () => {
    expect(
      replaceCasingPlaceholders(
        "/serpent_case/kebab-case/PascalCase.component.tsx",
        "foo-bar"
      )
    ).toBe("/foo_bar/foo-bar/FooBar.component.tsx");
  });

  it.concurrent("should replace case in multiline text", () => {
    expect(
      replaceCasingPlaceholders(
        readFileSync(`${MOCK_PATH}/raw-file.case.mock.tsx`, {
          encoding: "utf-8",
        }),
        "foo-bar"
      )
    ).toBe(
      readFileSync(`${MOCK_PATH}/parsed-file.case.mock.tsx`, {
        encoding: "utf-8",
      })
    );
  });

  it.concurrent("should transform into camel casing", () => {
    expect(toCamelCase(name)).toBe("templateNameWithSpaces");
  });

  it.concurrent("should transform into kebab casing", () => {
    expect(toKebabCase(name)).toBe(name);
  });

  it.concurrent("should transform into lower casing", () => {
    expect(toLowerCase(name)).toBe("templatenamewithspaces");
  });

  it.concurrent("should transform into pascal casing", () => {
    expect(toPascalCase(name)).toBe("TemplateNameWithSpaces");
  });

  it.concurrent("should transform into serpent casing", () => {
    expect(toSerpentCase(name)).toBe("template_name_with_spaces");
  });

  it.concurrent("should transform into space casing", () => {
    expect(toSpaceCase(name)).toBe("template name with spaces");
  });

  it.concurrent("should transform into upper casing", () => {
    expect(toUpperCase(name)).toBe("TEMPLATE_NAME_WITH_SPACES");
  });
});
