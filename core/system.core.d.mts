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

type SpawnCmdOptions = {
  /** On output success */
  onStdout?: (data: any) => void;
  /** On output error */
  onStderr?: (data: any) => void;
  /** On general error */
  onError?: (error: Error) => void;
  /** Return code if any */
  onClose?: (code: number | null) => void;
};

declare function spawnCmd(
  command: string,
  args?: string[],
  options?: SpawnCmdOptions
): void;

/**
 * Recursively copies one dir to another
 */
declare function copyDir(origin: string, target: string): boolean;

/**
 * Replaces content in a file
 */
declare function replace(
  filepath: string,
  haystack: String,
  needle: string
): void;
