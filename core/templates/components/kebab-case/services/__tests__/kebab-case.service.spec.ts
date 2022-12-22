// Vendors
import { describe, expect, it } from "vitest";
// Services
import {
  fetchAllPascalCase,
  fetchSinglePascalCase,
} from "../kebab-case.service";

describe("space case services", () => {
  it("should ...", () => {
    const service = fetchAllPascalCase();

    expect(false).toBe(true);
  });

  it("should ...", () => {
    const service = fetchSinglePascalCase({ id: 1 });

    expect(false).toBe(true);
  });
});
