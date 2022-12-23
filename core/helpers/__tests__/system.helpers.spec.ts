// Vendors
import path from "path";
import { describe, it, expect } from "vitest";
// Helpers
import { getAllFiles, joinPaths } from "../system.helpers";

describe("System utilities", () => {
  it("should join paths", () => {
    expect(joinPaths("hello", "world", "foo", "bar")).toBe(
      "hello/world/foo/bar"
    );
  });

  it("should get the file structure", () => {
    const mocksBasename = path.join(
      path.dirname(path.dirname(__dirname)),
      "__mocks__"
    );

    const filePaths = getAllFiles(
      path.join(__dirname, "../__mocks__/system")
    ).map((file) => file.replace(mocksBasename, ""));

    expect(filePaths).toEqual(
      expect.arrayContaining([
        "example/style.css",
        "example/sub-nested/index.ts",
        "main.scss",
        "nested/root.tsx",
        "root.ts",
      ])
    );
  });
});
