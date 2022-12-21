// Core
import { request, endpoint } from "core/resolvers";
// Types
import type { SecondTry } from "../types/second-try.type";

export function secondTryEndpoint(...args: (string | number)[]): string {
  return endpoint("second-try", ...args);
}

export const BASE_SECOND_TRY_ENDPOINT = secondTryEndpoint();

export async function fetchAllSecondTry() {
  return request<SecondTry[]>(secondTryEndpoint("all"));
}

export async function fetchSingleSecondTry({ id }: Pick<SecondTry, "id">) {
  return request<SecondTry>(secondTryEndpoint(id));
}

// ...
