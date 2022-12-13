import { parseArgs } from "../core/args.core.mjs";

type Args = {
  /** The transpiler used, usually node, might be Deno, or Bun */
  transpilerPath: string;
  /** The source file origin */
  scriptPath: string;

  /** The route from which to start processing */
  baseRoute: string;
};

const parsed: Args = parseArgs();

// Type-safe arg
parsed.baseRoute;
