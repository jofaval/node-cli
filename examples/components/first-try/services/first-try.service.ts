// Core
import { request, endpoint } from "core/resolvers";
// Types
import type { FirstTry } from "../types/first-try.type";

export function FirstTryEndpoint(...args: (string | number)[]): string {
  return endpoint("first-try", ...args);
}

export const BASE_FIRST_TRY_ENDPOINT = FirstTryEndpoint();

export async function fetchAllFirstTry() {
  return request<FirstTry[]>(FirstTryEndpoint("all"));
}

export async function fetchSingleFirstTry({ id }: Pick<FirstTry, "id">) {
  return request<FirstTry>(FirstTryEndpoint(id));
}

// ...
