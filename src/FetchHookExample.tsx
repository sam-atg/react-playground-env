import { useEffect, useState } from 'react';
import { useFetch } from './hooks/useFetch';
import { useOnMounted } from './hooks/useOnMounted';

export const CodeFrame = ({ value, className }: { value: any; className?: string }) => (
  <pre className={className}>{JSON.stringify(value, null, 2)}</pre>
);

export function FetchHookExample({ query, children }: { query: string; children?: import('react').ReactNode }) {
  const [stale, setStale] = useState(true);
  const { data, error, isLoading, runFetch } = useFetch(query);

  const fetcher = () => {
    setStale(false);
    runFetch();
  };

  useOnMounted(fetcher);

  useEffect(() => {
    return () => {
      setStale(true);
    };
  }, [query]);

  return (
    <div className="fetch-wrapper">
      {children}
      {isLoading ? (
        <code>Loading</code>
      ) : error ? (
        <CodeFrame className="error" value={error} />
      ) : (
        <CodeFrame value={data ?? 'no data received'} />
      )}
      <input type="button" style={{ margin: '1em' }} onClick={fetcher} value="Refresh" />
      <span>{stale ? '(is stale)' : ''}</span>
    </div>
  );
}
