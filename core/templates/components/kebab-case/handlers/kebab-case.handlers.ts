// Vendors
import { Dispatch, SetStateAction } from "react";

export type UsePascalCaseHandlersProps = {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
};

export type UsePascalCaseHandlersResponse = {
  onPascalCaseLoad: () => void;
  onPascalCaseCleanUp: () => void;
};

type PascalCaseLoadProps = Pick<
  UsePascalCaseHandlersProps,
  "state" | "setState"
>;

const camelCaseLoad = ({ state, setState }: PascalCaseLoadProps) => {
  //
};

type PascalCaseCleanUpProps = Pick<UsePascalCaseHandlersProps, "state">;

const camelCaseCleanUp = ({ state }: PascalCaseCleanUpProps) => {
  //
};

export const usePascalCaseHandlers = ({
  state,
  setState,
}: UsePascalCaseHandlersProps): UsePascalCaseHandlersResponse => ({
  onPascalCaseLoad: () => camelCaseLoad({ state, setState }),
  onPascalCaseCleanUp: () => camelCaseCleanUp({ state }),
});
