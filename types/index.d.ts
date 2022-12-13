/// <reference path="../core/index.d.ts" />

declare module "../core/args.core.mjs" {
  type ParseArgsProps = { includeOrigin?: boolean };

  export declare function parseArgs(props: ParseArgsProps): Record<
    string,
    unknown
  > & {
    /** The transpiler used, usually node, might be Deno, or Bun */
    transpilerPath: string;
    /** The source file origin */
    scriptPath: string;
  };

  export function getArgs(): string[];
}
