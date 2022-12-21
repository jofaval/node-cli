import { useState, useReducer, useMemo, useCallback, useEffect } from "react";
import { useSecondTryHandlers } from "../handlers/second-try.handlers";

export type UseSecondTryProps = {
  state: boolean;
};

export type UseSecondTryResponse = {
  //
};

export const useSecondTry = ({
  state,
}: UseSecondTryProps): UseSecondTryResponse => {
  const response = {};

  const [value, setState] = useState(state);

  const { onSecondTryCleanUp, onSecondTryLoad } = useSecondTryHandlers({
    state: value,
    setState,
  });

  useEffect(() => {
    onSecondTryLoad();
    return onSecondTryCleanUp;
  }, []);

  return response;
};
