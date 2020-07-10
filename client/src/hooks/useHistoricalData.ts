import { useState, useEffect } from 'react';
import { Cache, useCache } from '../cache/Cache';
import { API } from '../api';

const HistoricalCache = new Cache<string, string[][]>({
  async load(key) {
    const data = await API.get('/historical', {
      ticker: key,
    });
    return data;
  },
});

export function useHistoricalData(ticker: string) {
  const data = useCache(HistoricalCache, ticker).get();
  const [error, setError] = useState(null);

  const isPromise = data instanceof Promise;

  useEffect(() => {
    try {
      HistoricalCache.preload(ticker);
    } catch (err) {
      setError(err);
    }
  }, []);

  return {
    data: data instanceof Promise ? undefined : data,
    loading: isPromise ? true : false,
    error,
  };
}
