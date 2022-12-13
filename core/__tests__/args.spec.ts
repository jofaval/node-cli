import { describe, beforeEach, afterEach, it, expect } from "vitest";
import { parseArgs } from "../args.core.mjs";
import { getArgs } from "../args.core.mjs";

describe("first", () => {
  let originalArgv: string[];

  beforeEach(() => {
    originalArgv = process.argv;
  });

  afterEach(() => {
    process.argv = originalArgv;
  });

  it("should get all the args", () => {
    expect(getArgs()).toBe(process.argv);
    expect(getArgs()).toHaveLength(process.argv.length);
    process.argv = ["test", "fully", "working"];
    expect(getArgs()).toBe(process.argv);
    expect(getArgs()).toHaveLength(process.argv.length);
  });

  it("should parse the origin args", () => {
    const parsedArgs = parseArgs({ includeOrigin: true });

    expect(parsedArgs.scriptPath).toBeTypeOf("string");
    expect(parsedArgs.transpilerPath).toBeTypeOf("string");
  });

  it("should return the origin args when the include is set to false", () => {
    const parsedArgs = parseArgs({ includeOrigin: false });

    expect(parsedArgs.scriptPath).toBeUndefined();
    expect(parsedArgs.transpilerPath).toBeUndefined();
  });

  it("should parse all the args that are passed", () => {
    process.argv = [...process.argv, "test", "foo", "bar"];
    const parsedArgs = parseArgs({ includeOrigin: false });

    expect(Object.values(parsedArgs)).toHaveLength(3);
  });

  it("should parse a special arg", () => {
    process.argv = [...process.argv, "--key=value"];
    const parsedArgs = parseArgs({ includeOrigin: false });

    expect(parsedArgs["key"]).not.toBeUndefined();
    expect(parsedArgs["key"]).toBe("value");
  });

  it("should parse all the special args that are passed", () => {
    process.argv = [
      ...process.argv,
      "--key=value",
      "--foo=bar",
      "--nevergonna=giveyouup",
    ];
    const parsedArgs = parseArgs({ includeOrigin: false });

    expect(parsedArgs["key"]).not.toBeUndefined();
    expect(parsedArgs["key"]).toBe("value");

    expect(parsedArgs["foo"]).not.toBeUndefined();
    expect(parsedArgs["foo"]).toBe("bar");

    expect(parsedArgs["nevergonna"]).not.toBeUndefined();
    expect(parsedArgs["nevergonna"]).toBe("giveyouup");
  });

  it("should parse a special arg with spaces", () => {
    process.argv = [...process.argv, "--key=value with spaces"];
    const parsedArgs = parseArgs({ includeOrigin: false });

    expect(parsedArgs["key"]).not.toBeUndefined();
    expect(parsedArgs["key"]).toBe("value with spaces");
  });

  it("should parse all special args with spaces", () => {
    process.argv = [
      ...process.argv,
      "--key=value with spaces",
      "--foo=special bar",
    ];
    const parsedArgs = parseArgs({ includeOrigin: false });

    expect(parsedArgs["key"]).not.toBeUndefined();
    expect(parsedArgs["key"]).toBe("value with spaces");

    expect(parsedArgs["foo"]).not.toBeUndefined();
    expect(parsedArgs["foo"]).toBe("special bar");
  });

  it("should override a property if a newer one was passed", () => {
    process.argv = [
      ...process.argv,
      "--foo=value with spaces",
      "--foo=special bar",
    ];
    const parsedArgs = parseArgs({ includeOrigin: false });

    expect(parsedArgs["foo"]).not.toBeUndefined();
    expect(parsedArgs["foo"]).not.toBe("value with spaces");
    expect(parsedArgs["foo"]).toBe("special bar");
  });

  it("should properly detect special args as flags", () => {
    process.argv = [...process.argv, "--noEmit"];
    const parsedArgs = parseArgs({ includeOrigin: false });

    expect(parsedArgs["noEmit"]).not.toBeUndefined();
    expect(parsedArgs["noEmit"]).toBe(true);
  });
});
