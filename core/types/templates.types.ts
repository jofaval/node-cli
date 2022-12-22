export enum Template {
  COMPONENTS = "components",
  CONTAINER = "container",
  CONTROLLER = "controller",
  MODEL = "model",
  ROUTE = "routes",
  SERVICE = "service",
  VIEW = "views",
}

export const TemplatesTargetDirs = {
  [Template.COMPONENTS]: "components",
  [Template.CONTAINER]: "container",
  [Template.CONTROLLER]: "controller",
  [Template.MODEL]: "model",
  [Template.ROUTE]: "routes",
  [Template.SERVICE]: "service",
  [Template.VIEW]: "views",
} as const;

export const CaseDictionary = {
  KEBAB_CASE: "kebab-case",
  CAMEL_CASE: "camelCase",
  SERPENT_CASE: "serpent_case",
  PASCAL_CASE: "PascalCase",
  LOWER_CASE: "lowercase",
  UPPER_CASE: "UPPER_CASE",
  SPACE_CASE: "space case",
} as const;
