import { parseArgs } from "../core/args.core.mjs";

const { name = "" } = parseArgs<{
  name: string;
}>();

console.log(`Hello ${name}!!`);
