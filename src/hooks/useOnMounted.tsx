import { useEffect } from 'react';

export function useOnMounted(callback: Parameters<typeof useEffect>[0]) {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
