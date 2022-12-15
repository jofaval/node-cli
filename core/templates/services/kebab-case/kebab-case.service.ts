export type FetchAbort<TData = any> = {
  data: TData | null;
  onCleanup: () => void;
};

export type PascalCase = {
  id: number;
};

export const BASE_API_URL = "/api";
const BASE_UPPER_CASE_ENDPOINT = [BASE_API_URL, "kebab-case"].join("/");

export async function request<TData = any>(
  url: string,
  options: RequestInit = {}
): Promise<FetchAbort<TData>> {
  const abortController = new AbortController();

  const response = await fetch(url, {
    signal: abortController.signal,
    ...options,
  });
  const data = await response.json();

  return { data, onCleanup: () => abortController.abort() };
}

export async function fetchAllPascalCase() {
  return request<PascalCase[]>(`${BASE_UPPER_CASE_ENDPOINT}/all`);
}

export async function fetchSinglePascalCase({ id }: Pick<PascalCase, "id">) {
  return request<PascalCase>(`${BASE_UPPER_CASE_ENDPOINT}/${id}`);
}

// ...
