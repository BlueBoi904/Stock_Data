// How often should we add to cache
import { Mutable, useMutable } from './Mutable';
import { Async, useAsyncValue } from './Async';

class Cache<Key extends string, Data> {
  _load: (key: Key) => Promise<Data>;
  _entries = new Map<Key, Mutable<Async<Data>>>();

  constructor({ load }: { load: (key: Key) => Promise<Data> }) {
    this._load = load;
  }

  public accessEntry = (key: Key): Mutable<Async<Data>> => {
    let entry = this._entries.get(key);
    if (entry === undefined) {
      entry = new Mutable(new Async(this._load(key)));
      this._entries.set(key, entry);
    }
    return entry;
  };

  public preload = (key: Key) => {
    let entry = this._entries.get(key);
    if (entry === undefined) {
      entry = new Mutable(new Async(this._load(key)));
      this._entries.set(key, entry);
    }
  };
}

function useCache<Key extends string, Data>(cache: Cache<Key, Data>, key: Key) {
  const entry = cache.accessEntry(key);
  return useAsyncValue(useMutable(entry));
}

export { Cache, useCache };
