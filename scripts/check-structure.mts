// Args
import { parseArgs } from "../core/args.core.mjs";
// System
import { getAllFiles, joinPaths } from "../core/helpers/system.helpers.js";
// Constants
import { TARGET_DIR } from "../core/constants/core.constants.js";

const SpecialTypologyCases = {
  components: ["component", "styled", "module"],
  services: ["service", "resolver", "query"],
} as const;

type Args = {
  /** Similar to the machine learning concept */
  earlyStopping: boolean;
};

const { earlyStopping } = parseArgs<Args>();

// It will usually be just the target dir,
// but this is for showcasing purposes
const structureTargetDir = joinPaths(TARGET_DIR);

const files = getAllFiles(structureTargetDir);

const checkMethod = earlyStopping ? "find" : "filter";
type TInvalidFiles = string | string[] | undefined;
const invalidFiles: TInvalidFiles = files[checkMethod](
  doesFileHaveInvalidStructure
);
const logInvalid = (file: string): void => {
  console.warn(`[WARNING] "${file}" was detected as an invalid file`);
};

(() => {
  if (!invalidFiles) {
    console.log("Everything is up to the standard's structure. Nice job!");
    return;
  }

  if (Array.isArray(invalidFiles)) {
    invalidFiles.forEach(logInvalid);
  } else {
    logInvalid(invalidFiles);
  }

  throw new Error(
    "Some file(s) were dismissed as not following the correct structure, please check the output above for more details"
  );
})();

function doesFileHaveInvalidStructure(file: string): boolean {
  throw new Error("TODO: implement");
  // TODO: get the template to evaluate
  // TODO: evaluate a good nesting structure
  // TODO: detect and evaluate the typology,
  // it should have one, and of length 3 (when splitted)
  return true;
}
