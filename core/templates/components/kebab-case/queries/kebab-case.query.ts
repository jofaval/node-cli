// Core
import { useFetch } from "core/resolvers";
// Services
import {
  fetchAllPascalCase,
  fetchSinglePascalCase,
} from "../services/kebab-case.service";
// Types
import type { PascalCase } from "../types/kebab-case.type";

export const useFetchAllPascalCase = () => {
  return useFetch(fetchAllPascalCase);
};

export const useFetchSinglePascalCase = (props: Pick<PascalCase, "id">) => {
  return useFetch(() => fetchSinglePascalCase(props));
};

// ...
