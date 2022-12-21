// Vendors
import fsExtraPackage from "fs-extra";
// Helpers
import systemHelpersPackage from "../core/helpers/system.helpers.js";

const { copySync } = fsExtraPackage;
const { joinPaths } = systemHelpersPackage;

const basePath = joinPaths("examples", "copy-dir");
const dummyPath = joinPaths(basePath, "dummy");

// First iteration
copySync(joinPaths(basePath, "first-iteration"), dummyPath);

// Second iteration
copySync(joinPaths(basePath, "second-iteration"), dummyPath);

// It won't remove content, it will override it, but won't remove previous content
