export type FetchAbort<TData = any> = {
  getData: () => Promise<TData | null>;
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

  const responsePromise = fetch(url, {
    signal: abortController.signal,
    ...options,
  });

  return {
    getData: async () => {
      const response = await responsePromise;
      return await response.json();
    },
    onCleanup: () => abortController.abort(),
  };
}

export async function fetchAllPascalCase() {
  return request<PascalCase[]>(`${BASE_UPPER_CASE_ENDPOINT}/all`);
}

export async function fetchSinglePascalCase({ id }: Pick<PascalCase, "id">) {
  return request<PascalCase>(`${BASE_UPPER_CASE_ENDPOINT}/${id}`);
}

// ...
