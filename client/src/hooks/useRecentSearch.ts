import { Mutable, useMutable } from '../cache/Mutable';

const RecentSearches = new Mutable(new Set<string>());

export function updateRecentSearch(key: string) {
  const set = RecentSearches.get();
  if (set.has(key)) {
    return;
  }
  set.add(key);
  RecentSearches.set(new Set(set));
}

export function useRecentSearch() {
  return useMutable(RecentSearches);
}
