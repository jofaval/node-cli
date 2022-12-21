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

const firstTryLoad = ({ state, setState }: FirstTryLoadProps) => {
  //
};

type FirstTryCleanUpProps = Pick<UseFirstTryHandlersProps, "state">;

const firstTryCleanUp = ({ state }: FirstTryCleanUpProps) => {
  //
};

export const useFirstTryHandlers = ({
  state,
  setState,
}: UseFirstTryHandlersProps): UseFirstTryHandlersResponse => ({
  onFirstTryLoad: () => firstTryLoad({ state, setState }),
  onFirstTryCleanUp: () => firstTryCleanUp({ state }),
});
