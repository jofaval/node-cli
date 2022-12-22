// Vendors
import { describe, expect, it, vi, afterEach } from "vitest";
// Hooks
import { usePascalCase } from "../kebab-case.hook";

describe("space case hooks", () => {
  const params = { state: true };

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should ...", () => {
    const hook = usePascalCase(params);

    expect(false).toBe(true);
  });
});
