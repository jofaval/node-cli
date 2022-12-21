// Vendors
import { Dispatch, SetStateAction } from "react";

export type UseSecondTryHandlersProps = {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
};

export type UseSecondTryHandlersResponse = {
  onSecondTryLoad: () => void;
  onSecondTryCleanUp: () => void;
};

type SecondTryLoadProps = Pick<
  UseSecondTryHandlersProps,
  "state" | "setState"
>;

const secondTryLoad = ({ state, setState }: SecondTryLoadProps) => {
  //
};

type SecondTryCleanUpProps = Pick<UseSecondTryHandlersProps, "state">;

const secondTryCleanUp = ({ state }: SecondTryCleanUpProps) => {
  //
};

export const useSecondTryHandlers = ({
  state,
  setState,
}: UseSecondTryHandlersProps): UseSecondTryHandlersResponse => ({
  onSecondTryLoad: () => secondTryLoad({ state, setState }),
  onSecondTryCleanUp: () => secondTryCleanUp({ state }),
});
