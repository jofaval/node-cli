// Vendors
import { exec, spawn } from "node:child_process";
import { writeFileSync, readFileSync } from "fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
// fs-extra, safe import
import pkg from "fs-extra";
const { copySync } = pkg;

/**
 * Executes the given command in the shell, a callback can be passed to process the output
 *
 * @param {string} command
 * @param {{
 *  callable?: function
 *  logError?: boolean
 *  logOutput?: boolean
 * }} options
 *
 * @returns {void}
 */
export function cmd(command, { logError, logOutput, callable } = {}) {
  exec(command, (error, output) => {
    if (error) {
      if (logError) {
        console.error("could not execute command:", error);
      }

      return;
    }

    if (logOutput) {
      console.log(output);
    }

    if (callable) {
      callable(output);
    }
  });
}

/**
 *
 * @param {string} command
 * @param {?string[]} args
 * @param {?{
 *  onStdout?: function(data: any): void,
 *  onStderr?: function(data: any): void,
 *  onError?: function(error: Error): void,
 *  onClose?: function(code: number | null): void,
 * }} options
 * @returns {void}
 */
export function spawnCmd(
  command,
  args,
  { onStdout, onStderr, onError, onClose } = {}
) {
  const spawned = spawn(command, args ?? []);

  spawned.stdout.on("data", (data) => {
    if (onStdout) {
      onStdout(data);
    }
  });

  spawned.stderr.on("data", (data) => {
    if (onStderr) {
      onStderr(data);
    }
  });

  spawned.on("error", (error) => {
    if (onError) {
      onError(error);
    }
  });

  spawned.on("close", (code) => {
    if (onClose) {
      onClose(code);
    }
  });
}

/**
 * @param {string} origin
 * @param {string} target
 * @returns {boolean}
 */
export function copyDir(origin, target) {
  try {
    copySync(origin, target, { overwrite: true | false });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

/**
 * @param {string} filepath
 * @param {String} haystack
 * @param {string} needle
 * @returns {void}
 */
export function replace(filepath, haystack, needle) {
  const content = readFileSync(filepath, { encoding: "utf-8" })
    .toString()
    .replaceAll(haystack, needle);

  writeFileSync(filepath, content, { encoding: "utf-8" });
}

/**
 * @returns {string}
 */
export function getCurrentPath() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  return __dirname;
}
