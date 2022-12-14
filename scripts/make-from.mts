import { parseArgs } from "../core/args.core.mjs";
import { makeFromTemplate } from "../core/template-generator.mjs";

type MakeFromArgs = {
  template: string;
  name: string;
};

const { template, name } = parseArgs<MakeFromArgs>({ includeOrigin: false });

if (!template || !name) {
  throw new Error("Args [template] and [name] are required");
}

// @ts-ignore
makeFromTemplate({ template, name });
