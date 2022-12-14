import { parseArgs } from "../core/args.core.mjs";
import { makeFromTemplate } from "../core/template-generator.mjs";
const { template, name } = parseArgs({ includeOrigin: false });
if (!template || !name) {
    throw new Error("Args [template] and [name] are required");
}
// @ts-ignore
makeFromTemplate({ template, name });
