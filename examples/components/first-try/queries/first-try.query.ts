// Core
import { useFetch } from "core/resolvers";
// Services
import {
  fetchAllFirstTry,
  fetchSingleFirstTry,
} from "../services/first-try.service";
// Types
import type { FirstTry } from "../types/first-try.type";

export const useFetchAllFirstTry = () => {
  return useFetch(fetchAllFirstTry);
};

export const useFetchSingleFirstTry = (props: Pick<FirstTry, "id">) => {
  return useFetch(() => fetchSingleFirstTry(props));
};

// ...
