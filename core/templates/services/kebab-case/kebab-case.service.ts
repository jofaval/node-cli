// Core
import { request, endpoint } from "core/resolvers";

export type PascalCase = {
  id: number;
};

export function camelCaseEndpoint(...args: (string | number)[]): string {
  return endpoint("kebab-case", ...args);
}

export const BASE_UPPER_CASE_ENDPOINT = camelCaseEndpoint();

export async function fetchAllPascalCase() {
  return request<PascalCase[]>(camelCaseEndpoint("all"));
}

export async function fetchSinglePascalCase({ id }: Pick<PascalCase, "id">) {
  return request<PascalCase>(camelCaseEndpoint(id));
}

// ...
