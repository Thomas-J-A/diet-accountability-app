import { useState, useEffect, useMemo } from 'react';

const useMediaQuery = (query: string) => {
  const mql = useMemo(() => window.matchMedia(query), [query]);
  const [isMatching, setIsMatching] = useState(mql.matches);

  useEffect(() => {
    const handler = () => {
      setIsMatching(mql.matches);
    };

    mql.addEventListener('change', handler);

    return () => {
      mql.removeEventListener('change', handler);
    };
  }, [query, mql]);

  return isMatching;
};

export default useMediaQuery;
