// Vendors
import { existsSync, mkdirSync, writeFileSync } from "fs";
// Args
import { parseArgs } from "../core/args.core.mjs";
// Constants
import { TEMPLATES_DIR } from "../core/constants/core.constants.js";
// Core
import { getCurrentPath } from "../core/system.core.mjs";
import { joinPaths } from "../core/helpers/system.helpers.js";

type Args = {
  template: string;
};

const { template } = parseArgs<Args>();

if (!template) {
  throw new Error(
    'No template was provided, please provide one: "--template=..."'
  );
}

const templatePath = joinPaths(getCurrentPath(), TEMPLATES_DIR, template);

console.log("Attempting to create template:", template);

if (existsSync(templatePath)) {
  console.log("Template already exists");
} else {
  const innerTemplatePath = joinPaths(templatePath, "kebab-case");

  mkdirSync(templatePath);
  mkdirSync(innerTemplatePath);

  writeFileSync(
    joinPaths(innerTemplatePath, `kebab-case.${template}.ts`),
    "export default {};\n",
    {
      encoding: "utf-8",
    }
  );

  console.log(templatePath, "was created successfully!");
}
