import { useState, useReducer, useMemo, useCallback, useEffect } from "react";
import { usePascalCaseHandlers } from "../handlers/kebab-case.handlers";

export type UsePascalCaseProps = {
  state: boolean;
};

export type UsePascalCaseResponse = {
  //
};

export const usePascalCase = ({
  state,
}: UsePascalCaseProps): UsePascalCaseResponse => {
  const response = {};

  const [value, setState] = useState(state);

  const { onPascalCaseCleanUp, onPascalCaseLoad } = usePascalCaseHandlers({
    state: value,
    setState,
  });

  useEffect(() => {
    onPascalCaseLoad();
    return onPascalCaseCleanUp;
  }, []);

  return response;
};
