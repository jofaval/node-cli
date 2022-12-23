// Vendors
import path from "path";
import { describe, it, expect } from "vitest";
// Helpers
import { getAllFiles, joinPaths } from "../system.helpers";

describe("System utilities", () => {
  it.concurrent("should join paths", () => {
    expect(joinPaths("hello", "world", "foo", "bar")).toBe(
      "hello/world/foo/bar"
    );
  });

  it.concurrent("should get the file structure", () => {
    const mocksBasename = path.join(
      path.dirname(__dirname),
      "__mocks__",
      "system"
    );

    const filePaths = getAllFiles(
      path.join(__dirname, "../__mocks__/system")
    ).map((file) => file.replace(mocksBasename, "").slice(1));

    expect(filePaths).toEqual(
      expect.arrayContaining(
        [
          ["example", "style.css"],
          ["example", "sub-nested", "index.ts"],
          ["main.scss"],
          ["nested", "root.tsx"],
          ["root.ts"],
        ].map((candidate) => path.join(...candidate))
      )
    );
  });

  it.concurrent("should be conscious of the initial array", () => {
    expect(
      getAllFiles(path.join(__dirname, "../__mocks__/system"), [
        "first",
        "second",
      ])
    ).toHaveLength(7);

    expect(
      getAllFiles(path.join(__dirname, "../__mocks__/system"), undefined)
    ).toHaveLength(5);

    expect(
      getAllFiles(path.join(__dirname, "../__mocks__/system"), [])
    ).toHaveLength(5);
  });
});
