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

function useMutable<Data>(mutable: Mutable<Data>) {
  const [value, setValue] = useState(mutable.get());
  useEffect(() => {
    if (!(value instanceof Promise)) {
      return;
    }
    const cancelled = false;

    function done() {
      if (!cancelled) {
        setValue(mutable.get());
      }
    }
    value.then(done, done);
    return mutable.listen(() => setValue(mutable.get()));
  }, [mutable]);
  return value;
}

export { Mutable, useMutable };
