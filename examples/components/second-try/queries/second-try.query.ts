// Core
import { useFetch } from "core/resolvers";
// Services
import {
  fetchAllSecondTry,
  fetchSingleSecondTry,
} from "../services/second-try.service";
// Types
import type { SecondTry } from "../types/second-try.type";

export const useFetchAllSecondTry = () => {
  return useFetch(fetchAllSecondTry);
};

export const useFetchSingleSecondTry = (props: Pick<SecondTry, "id">) => {
  return useFetch(() => fetchSingleSecondTry(props));
};

// ...
