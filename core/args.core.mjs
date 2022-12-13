/**
 * @returns {string[]}
 */
export function getArgs() {
  return process.argv;
}

/**
 * Any argument passed starting with the following,
 * will be considered a special parseable arg
 *
 * In example: `--baseRoute=./`
 */
const SPECIAL_ARG_STARTER = "--";

/**
 * Combines with the `SPECIAL_ARG_STARTER` literal
 *
 * In example: `"--baseRoute`**`=`**`./"`
 */
const KEY_VALUE_SEPARATOR = "=";

/**
 * @param {{
 *  includeOrigin?: boolean
 * }} options
 * @returns {Object}
 */
export function parseArgs({ includeOrigin } = {}) {
  const cliArgs = getArgs();

  const [transpilerPath, scriptPath, ...args] = cliArgs;
  const parsedArgs = {
    ...(includeOrigin ? { transpilerPath, scriptPath } : {}),
  };

  let actualIndex = 0;
  for (const arg of args) {
    if (!arg.startsWith(SPECIAL_ARG_STARTER)) {
      parsedArgs[actualIndex] = arg;
      actualIndex++;
      continue;
    }

    // --[name]=[value] will be parsed to key:value, could be overwritteable
    const [name, value] = arg
      // only the first instance should be replaced, it may appear in the value
      .replace(SPECIAL_ARG_STARTER, "")
      .split(KEY_VALUE_SEPARATOR);

    // in case no value was provided, it will assume it was a boolean flag
    parsedArgs[name] = value ?? true;
  }

  return parsedArgs;
}
