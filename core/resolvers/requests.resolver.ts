export type FetchAbort<TData = any> = {
  getData: () => Promise<TData | null>;
  onCleanup: () => void;
};

export const BASE_API_URL = "/api";

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

export function requestJoiner(...args: (string | number)[]) {
  return args.join("/");
}

export function endpoint(...args: (string | number)[]): string {
  return requestJoiner(BASE_API_URL, ...args);
}

export function microservice(name: string, ...args: (string | number)[]) {
  return requestJoiner(name, ...args);
}
