// Vendors
import { Dispatch, SetStateAction } from "react";

export type UseFirstTryHandlersProps = {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
};

export type UseFirstTryHandlersResponse = {
  onFirstTryLoad: () => void;
  onFirstTryCleanUp: () => void;
};

type FirstTryLoadProps = Pick<
  UseFirstTryHandlersProps,
  "state" | "setState"
>;

const FirstTryLoad = ({ state, setState }: FirstTryLoadProps) => {
  //
};

type FirstTryCleanUpProps = Pick<UseFirstTryHandlersProps, "state">;

const FirstTryCleanUp = ({ state }: FirstTryCleanUpProps) => {
  //
};

export const useFirstTryHandlers = ({
  state,
  setState,
}: UseFirstTryHandlersProps): UseFirstTryHandlersResponse => ({
  onFirstTryLoad: () => FirstTryLoad({ state, setState }),
  onFirstTryCleanUp: () => FirstTryCleanUp({ state }),
});
