import { Cache, useCache } from '../cache/Cache';
import { API } from '../api';

export const HistoricalCache = new Cache<string, string[][]>({
  async load(key) {
    const { data } = await API.get('/historical', {
      ticker: key,
    });
    return data;
  },
});

export function useHistoricalData(ticker: string) {
  const asyncValue = useCache(HistoricalCache, ticker);
  return { ...asyncValue, ticker };
}
