import { parseArgs } from "../core/args.core.mjs";

type Args = {
  /** The route from which to start processing */
  baseRoute: string;
};

const parsed = parseArgs<Args>();

// Type-safe arg
parsed.baseRoute;

console.log(parsed.baseRoute);
