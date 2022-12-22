// Vendors
import { describe, expect, it, vi, afterEach } from "vitest";
// Handlers
import { usePascalCaseHandlers } from "../kebab-case.handlers";

describe("space case handlers", () => {
  const params = { state: true, setState: vi.fn() };

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should ...", () => {
    const handlers = usePascalCaseHandlers(params);

    handlers.onPascalCaseLoad();

    expect(params.setState).toHaveBeenCalled();
    expect(false).toBe(true);
  });
});
