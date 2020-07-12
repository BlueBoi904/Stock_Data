import { Cache, useCache } from '../cache/Cache';
import { API } from '../api';

export const StatisticalCache = new Cache<string, { [key: string]: string }>({
  async load(key) {
    const data = await API.get('/statistical', {
      ticker: key,
    });
    return data;
  },
});

export function useStatisticalData(ticker: string) {
  const asyncValue = useCache(StatisticalCache, ticker);
  return { ...asyncValue, ticker };
}
