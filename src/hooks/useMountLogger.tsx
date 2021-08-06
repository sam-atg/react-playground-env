import { useEffect } from 'react';

export function useMountLogger() {
  return useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('Mounted!');
    return () => {
      // eslint-disable-next-line no-console
      console.log('Unmounted');
    };
  }, []);
}
