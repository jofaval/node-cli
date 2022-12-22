// Helpers
import { capitalizeArray } from "./strings.helpers.js";
// Types
import { CaseDictionary } from "../types/templates.types.js";
export const WORD_SEPARATOR = "-";
export function toCamelCase(name) {
    const pascalCase = capitalizeArray(name.split(WORD_SEPARATOR));
    return (pascalCase[0]?.toLocaleLowerCase() ?? "") + pascalCase.slice(1);
}
export function toKebabCase(name) {
    // this one should be the default naming
    return name;
}
export function toLowerCase(name) {
    return name.split(WORD_SEPARATOR).join("").toLocaleLowerCase();
}
export function toPascalCase(name) {
    return capitalizeArray(name.split(WORD_SEPARATOR));
}
export function toSerpentCase(name) {
    return name.split(WORD_SEPARATOR).join("_").toLocaleLowerCase();
}
export function toUpperCase(name) {
    return name.split(WORD_SEPARATOR).join("_").toLocaleUpperCase();
}
export function toSpaceCase(name) {
    return name.split(WORD_SEPARATOR).join(" ").toLocaleLowerCase();
}
export const CaseDictionaryTransformer = {
    [CaseDictionary.CAMEL_CASE]: toCamelCase,
    [CaseDictionary.KEBAB_CASE]: toKebabCase,
    [CaseDictionary.LOWER_CASE]: toLowerCase,
    [CaseDictionary.PASCAL_CASE]: toPascalCase,
    [CaseDictionary.SERPENT_CASE]: toSerpentCase,
    [CaseDictionary.UPPER_CASE]: toUpperCase,
    [CaseDictionary.SPACE_CASE]: toSpaceCase,
};
export function sanitize(name) {
    return encodeURI(name);
}
export function replaceCasingPlaceholders(content, name) {
    return Object.values(CaseDictionary).reduce((text, _case) => {
        return text.replaceAll(_case, CaseDictionaryTransformer[_case](name));
    }, content);
}
