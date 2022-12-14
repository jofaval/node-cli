type ParseArgsProps = {
  /** Indicates if it should include `transpilerPath` and `scriptPath` */
  includeOrigin?: boolean;
};

declare type OriginArgs = {
  /** The transpiler used, usually node, might be Deno, or Bun */
  transpilerPath?: string;
  /** The source file origin */
  scriptPath?: string;
};

// It'd be cool that if props.includeOrigin is set to false, OriginArgs wasn't added
export function parseArgs<TArgs = Record<string, unknown>>(
  props?: ParseArgsProps
): OriginArgs & Partial<TArgs>;

export function getArgs(): string[];
