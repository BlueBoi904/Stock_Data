import { useState, useEffect } from 'react';

type Subscriber = () => void;

class Mutable<Data> {
  _value: Data;
  _subcribers = new Set<Subscriber>();

  constructor(value: Data) {
    this._value = value;
  }

  public get = (): Data => {
    return this._value;
  };

  public set = (data: Data) => {
    this._value = data;
    this.notify();
  };

  private notify = () => {
    if (this._subcribers.size > 0) {
      this._subcribers.forEach((sub) => {
        sub();
      });
    }
  };

  public listen = (sub: Subscriber): (() => void) => {
    this._subcribers.add(sub);
    return () => this._subcribers.delete(sub);
  };
}

function identity<T>(x: T): T {
  return x;
}

function useMutable<Value>(mutable: Mutable<Value>): Value {
  return useMutableSelect(mutable, identity);
}

function useMutableSelect<Data, DataSelection>(
  mutable: Mutable<Data>,
  select: (value: Data) => DataSelection,
) {
  const [value, setValue] = useState(select(mutable.get()));

  useEffect(() => {
    if (!(value instanceof Promise)) {
      return;
    }
    let cancelled = false;

    function done() {
      if (!cancelled) {
        setValue(select(mutable.get()));
        cancelled = true;
      }
    }
    value.then(done, done);
    return mutable.listen(() => setValue(select(mutable.get())));
  }, [mutable]);

  return value;
}

export { Mutable, useMutable };
