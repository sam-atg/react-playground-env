import { useCallback, useState } from 'react';

export type FetchParams = Parameters<typeof fetch>;

export function useFetch<TData = any, TError = any>(reqInfo: FetchParams[0], reqInit?: FetchParams[1], initialData?: TData) {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState<TError | null>(null);
  const [isLoading, setLoading] = useState(false);

  const runFetch = useCallback(() => {
    const fetcher = async () => {
      try {
        const response = await fetch(reqInfo, reqInit);
        if (!response.ok) setError(await response.json());
        else setData(await response.json());
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    setLoading(true);
    setError(null);
    void fetcher();
  }, [reqInfo, reqInit]);

  return { data, isLoading, error, runFetch };
}
