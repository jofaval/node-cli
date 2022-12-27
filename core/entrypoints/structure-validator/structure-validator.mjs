export const SpecialTypologyCases = {
    components: ["component", "styled", "module"],
    services: ["service", "resolver", "query"],
};
export function doesFileHaveInvalidStructure(file) {
    throw new Error("TODO: implement");
    // TODO: get the template to evaluate
    // TODO: evaluate a good nesting structure
    // TODO: detect and evaluate the typology,
    // it should have one, and of length 3 (when splitted)
    return true;
}
export function doesFileHaveInvalidFlatStructure(file, maxAllowedFlatLevel = 2) {
    throw new Error("TODO: implement");
    // TODO: implement
    return true;
}
export function checkForInvalidFiles({ files, options: { earlyStopping, flat, maxAllowedFlatLevel } = {}, }) {
    const isFileInvalid = flat
        ? (file) => doesFileHaveInvalidFlatStructure(file, maxAllowedFlatLevel)
        : doesFileHaveInvalidStructure;
    if (earlyStopping) {
        const invalidFile = files.find(isFileInvalid);
        if (invalidFile) {
            return [invalidFile];
        }
        return [];
    }
    return files.filter(isFileInvalid);
}
