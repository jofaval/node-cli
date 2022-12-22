// Core
import { useFetch } from "core/resolvers";
// Services
import {
  fetchAllPascalCase,
  fetchSinglePascalCase,
  PascalCase,
} from "services/kebab-case";

export const useFetchAllPascalCase = () => {
  return useFetch(fetchAllPascalCase);
};

export const useFetchSinglePascalCase = (props: Pick<PascalCase, "id">) => {
  return useFetch(() => fetchSinglePascalCase(props));
};

// ...
