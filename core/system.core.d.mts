type CmdOptions = {
  /** Use it if you want to process the output */
  callable?: (output: string) => void;
  /** Flag indicate if it should log the error */
  logError?: boolean;
  /** Flag indicate if it should log the output */
  logOutput?: boolean;
};

/**
 * Executes the given command
 */
declare function cmd(command: string, options?: CmdOptions): void;
