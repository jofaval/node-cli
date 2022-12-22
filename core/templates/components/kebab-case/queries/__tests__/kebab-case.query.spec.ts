// Vendors
import { describe, expect, it } from "vitest";
// Query
import {
  useFetchAllPascalCase,
  useFetchSinglePascalCase,
} from "../kebab-case.query";

describe("PascalCase queries", () => {
  it("should ...", () => {
    const query = useFetchAllPascalCase();

    expect(false).toBe(true);
  });

  it("should ...", () => {
    const query = useFetchSinglePascalCase({ id: 1 });

    expect(false).toBe(true);
  });
});
