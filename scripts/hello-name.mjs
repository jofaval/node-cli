import { parseArgs } from "../core/args.core.mjs";
const { name = "" } = parseArgs();
console.log(`Hello ${name}!!`);
