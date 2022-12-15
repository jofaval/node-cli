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
export const useFetch = <TData = any>(fetcher: () => FetchAbort<TData>) => {
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState(false);

  const mutate = (data: TData) => setData(data);

  useEffect(() => {
    setIsLoading(true);

    const { getData, onCleanup } = fetcher();

    getData()
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));

    return () => {
      onCleanup();
    };
  }, [fetcher]);

  return { data, error, isLoading, mutate };
};

export const useFetchAllPascalCase = () => {
  return useFetch(fetchAllPascalCase);
};

export const useFetchSinglePascalCase = (props: Pick<PascalCase, "id">) => {
  return useFetch(() => fetchSinglePascalCase(props));
};
