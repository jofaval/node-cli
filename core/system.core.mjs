import { exec } from "node:child_process";

/**
 * Executes the given command in the shell, a callback can be passed to process the output
 *
 * @param {string} command
 * @param {function?} callable
 * @param {{
 *  logError?: boolean
 *  logOutput?: boolean
 * }} options
 *
 * @returns {void}
 */
export function cmd(command, callable, { logError, logOutput } = {}) {
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
