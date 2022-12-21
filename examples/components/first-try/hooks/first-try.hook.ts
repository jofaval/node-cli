import { useState, useReducer, useMemo, useCallback, useEffect } from "react";
import { useFirstTryHandlers } from "../handlers/first-try.handlers";

export type UseFirstTryProps = {
  state: boolean;
};

export type UseFirstTryResponse = {
  //
};

export const useFirstTry = ({
  state,
}: UseFirstTryProps): UseFirstTryResponse => {
  const response = {};

  const [value, setState] = useState(state);

  const { onFirstTryCleanUp, onFirstTryLoad } = useFirstTryHandlers({
    state: value,
    setState,
  });

  useEffect(() => {
    onFirstTryLoad();
    return onFirstTryCleanUp;
  }, []);

  return response;
};
