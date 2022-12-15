// Vendors
import { useEffect, useState } from "react";
// Core - Could also be Architecture, Helpers
import { FetchAbort } from "core/requests";
// Services
import {
  fetchAllPascalCase,
  fetchSinglePascalCase,
  PascalCase,
} from "services/kebab-case";

// useQuery-like wrapper, use React(TanStack) Query better
export const useFetch = <TData = any>(
  fetcher: () => Promise<FetchAbort<TData>>
) => {
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState(false);

  const mutate = (data: TData) => setData(data);

  useEffect(() => {
    let cleanup = () => {};
    setIsLoading(false);

    fetcher()
      .then(({ data, onCleanup }) => {
        setData(data);
        cleanup = onCleanup;
      })
      .catch(setError)
      .finally(() => setIsLoading(true));

    return () => cleanup();
  }, [fetcher]);

  return { data, error, isLoading, mutate };
};

export const useFetchAllPascalCase = () => {
  return useFetch(fetchAllPascalCase);
};

export const useFetchSinglePascalCase = (props: Pick<PascalCase, "id">) => {
  return useFetch(() => fetchSinglePascalCase(props));
};
