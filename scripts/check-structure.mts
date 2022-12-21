// Args
import { parseArgs } from "../core/args.core.mjs";
// System
import { getAllFiles, joinPaths } from "../core/helpers/system.helpers.js";
// Constants
import { TARGET_DIR } from "../core/constants/core.constants.js";
// Core
import { checkForInvalidFiles } from "../core/structure-validator.mjs";

type Args = {
  /** Similar to the machine learning concept */
  earlyStopping: boolean;
  /**
   * At root level
   * ```
   * - components
   * - containers
   * - helpers
   * - pages
   * - routes
   * - services
   * ```
   */
  flat: boolean;
};

const { earlyStopping, flat } = parseArgs<Args>();

// It will usually be just the target dir,
// but this is for showcasing purposes
const structureTargetDir = joinPaths(TARGET_DIR);

const files = getAllFiles(structureTargetDir);
const invalidFiles = checkForInvalidFiles({
  files,
  options: { earlyStopping, flat },
});

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
