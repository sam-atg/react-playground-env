import { useState } from 'react';
import { CodeFrame, FetchHookExample } from '../FetchHookExample';
import { useFetch } from '../hooks/useFetch';
import { useMountLogger } from '../hooks/useMountLogger';
import { useOnMounted } from '../hooks/useOnMounted';

const getUrl = (url: string, params?: any) => (params ? `${url}?${new URLSearchParams(params)}` : url);

export default function Index() {
  const { data, runFetch } = useFetch(getUrl('api/hello', { msg: `fetched from ${Index.name}` }));
  const [query, setQuery] = useState(2);
  const [forceError, setForceError] = useState(false);

  useMountLogger();
  useOnMounted(runFetch);

  return (
    <div className="container">
      <div className="fetch-wrapper">
        <CodeFrame value={data} />
      </div>

      <FetchHookExample query={getUrl(`api/hello`, { test: 'hello', msg: `fetched from first child` })} />

      <FetchHookExample query={getUrl(`api/hello`, { delay: query * 1000, forceError, msg: `fetched from second child` })}>
        <label>
          Force error?
          <input type="checkbox" checked={forceError} onChange={ev => setForceError(ev.target.checked)} />
        </label>
        <label>
          {`Set delay (${query}s)`}
          <input type="range" min="0" max="10" value={query} onChange={ev => setQuery(parseInt(ev.target.value ?? '2'))} />
        </label>
      </FetchHookExample>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
            Helvetica Neue, sans-serif;
          background: #aab9c0;
          font-size: 1.1rem;
        }

        * {
          box-sizing: border-box;
        }

        input {
          margin: 0.5em;
          font-size: 1.1rem;
        }

        .container {
          padding: 3rem 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .fetch-wrapper {
          display: flex;
          margin: 0.5rem;
          padding: 0.5rem 5rem;
          flex: 1;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border: 1px solid #546e7a;
          border-radius: 5px;
          background: #9999994d;
        }

        code,
        pre {
          background: #6f8d9b;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          line-height: 1.5rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New,
            monospace;
        }

        code.error,
        pre.error {
          background: #f8bbd0;
        }
      `}</style>
    </div>
  );
}
