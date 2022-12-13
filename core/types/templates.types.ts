export enum Template {
  COMPONENTS = "components",
  CONTAINER = "container",
  CONTROLLER = "controller",
  MODEL = "model",
  SERVICE = "service",
}

export const TemplatesTargetDirs = {
  [Template.COMPONENTS]: "components",
  [Template.CONTAINER]: "container",
  [Template.CONTROLLER]: "controller",
  [Template.MODEL]: "model",
  [Template.SERVICE]: "service",
} as const;

export const CaseDictionary = {
  KEBAB_CASE: "kebab-case",
  CAMEL_CASE: "camelCase",
  SERPENT_CASE: "serpent_case",
  PASCAL_CASE: "PascalCase",
  LOWER_CASE: "lowercase",
  UPPER_CASE: "UPPER_CASE",
} as const;
