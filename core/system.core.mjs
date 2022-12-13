import { exec } from "node:child_process";

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
export function cmd(command, callable, { logError, logOutput, callable } = {}) {
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
 * @param {string} origin
 * @param {string} target
 * @returns {boolean}
 */
export function copyDir(origin, target) {
  try {
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
  // TODO: implement
}
