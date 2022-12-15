type FetchAbort<TData = any> = {
  data: TData | null;
  onCleanup: () => void;
};

type PascalCase = {
  id: number;
};

const BASE_API_URL = "/api";

async function request<TData = any>(
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
  return request<PascalCase[]>(`${BASE_API_URL}/kebab-case/all`);
}

export async function fetchSinglePascalCase({ id }: Pick<PascalCase, "id">) {
  return request<PascalCase>(`${BASE_API_URL}/kebab-case/${id}`);
}

// ...
