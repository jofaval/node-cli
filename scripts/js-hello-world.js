const { exec } = require("node:child_process");

/**
 * @param {string} command
 */
function cmd(command) {
  exec(command, (err, output) => {
    // once the command has completed, the callback function is called
    if (err) {
      // log and return if we encounter an error
      console.error("could not execute command: ", err);
      return;
    }
    // log the output received from the command
    console.log(output);
  });
}

cmd("echo Hello World!");
