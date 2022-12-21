// Args
import { parseArgs } from "../core/args.core.mjs";
// System
import { getAllFiles, joinPaths } from "../core/helpers/system.helpers.js";
// Constants
import { TARGET_DIR } from "../core/constants/core.constants.js";
const { earlyStopping } = parseArgs();
// It will usually be just the target dir,
// but this is for showcasing purposes
const structureTargetDir = joinPaths(TARGET_DIR);
const files = getAllFiles(structureTargetDir);
const checkMethod = earlyStopping ? "find" : "filter";
const invalidFiles = files[checkMethod](doesFileHaveInvalidStructure);
const logInvalid = (file) => {
    console.warn(`[WARNING] "${file}" was detected as an invalid file`);
};
if (Array.isArray(invalidFiles)) {
    invalidFiles.forEach(logInvalid);
}
else if (invalidFiles) {
    logInvalid(invalidFiles);
}
else {
    console.log("Everything is up to the standard's structure. Nice job!");
}
function doesFileHaveInvalidStructure(file) {
    throw new Error("TODO: implement");
    // TODO: get the template to evaluate
    // TODO: evaluate a good nesting structure
    return true;
}
