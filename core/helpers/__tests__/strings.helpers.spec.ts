// Vendors
import { describe, it, expect } from "vitest";
// Helpers
import { capitalize, capitalizeArray } from "../strings.helpers";

describe("String utilities", () => {
  it.concurrent("should capitalize a word", () => {
    expect(capitalize("tRICKY")).toBe("Tricky");
  });

  it.concurrent("should capitalize a multi-word", () => {
    expect(capitalizeArray(["tRICKY", "oNE"])).toBe("TrickyOne");
  });
});
