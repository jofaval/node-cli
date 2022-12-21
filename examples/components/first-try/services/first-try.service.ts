// Core
import { request, endpoint } from "core/resolvers";
// Types
import type { FirstTry } from "../types/first-try.type";

export function firstTryEndpoint(...args: (string | number)[]): string {
  return endpoint("first-try", ...args);
}

export const BASE_FIRST_TRY_ENDPOINT = firstTryEndpoint();

export async function fetchAllFirstTry() {
  return request<FirstTry[]>(firstTryEndpoint("all"));
}

export async function fetchSingleFirstTry({ id }: Pick<FirstTry, "id">) {
  return request<FirstTry>(firstTryEndpoint(id));
}

// ...
