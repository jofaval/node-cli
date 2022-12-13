import { parseArgs } from "../core/args.core.mjs";
const parsed = parseArgs();
// Type-safe arg
parsed.baseRoute;
console.log(parsed.baseRoute);
