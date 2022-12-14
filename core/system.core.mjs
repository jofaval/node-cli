import { exec, spawn } from "node:child_process";

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
      onError(data);
    }
  });

  spawned.on("close", (code) => {
    if (onClose) {
      onClose(data);
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
