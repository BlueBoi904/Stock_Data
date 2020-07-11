import { useForceUpdate } from 'utils/useForceUpdate';
import { useEffect } from 'react';

enum AsyncStatus {
  Pending = 'pending',
  Resolved = 'resolved',
  Rejected = 'rejected',
}

class Async<Data> {
  private value: unknown;
  private status: AsyncStatus;

  constructor(value: Promise<Data> | Data) {
    if (value instanceof Promise) {
      this.status = AsyncStatus.Pending;
      this.value = value;
      value.then(
        (value) => {
          this.status = AsyncStatus.Resolved;
          this.value = value;
        },
        (error) => {
          this.status = AsyncStatus.Rejected;
          this.value = error;
        },
      );
    } else {
      this.status = AsyncStatus.Resolved;
      this.value = value;
    }
  }

  public isLoading(): boolean {
    return this.status === AsyncStatus.Pending;
  }

  public get(): Data | Promise<Data> {
    const asyncValue = (this as unknown) as AsyncUnion<Data>;
    switch (asyncValue.status) {
      case AsyncStatus.Pending:
        return asyncValue.value;
      case AsyncStatus.Resolved:
        return asyncValue.value;
      case AsyncStatus.Rejected:
        throw asyncValue.value;
      default: {
        const never: never = asyncValue.status;
        throw new Error(`Unexpected status: ${never}`);
      }
    }
  }
}

type AsyncUnion<Value> =
  | {
      readonly status: AsyncStatus.Pending;
      readonly value: Promise<Value>;
    }
  | {
      readonly status: AsyncStatus.Resolved;
      readonly value: Value;
    }
  | {
      readonly status: AsyncStatus.Rejected;
      readonly value: unknown;
    };

function useAsyncValue<Data>(
  mutable: Async<Data>,
): { loading: boolean; value: undefined | Data } {
  const value = useAsyncForceUpdate(mutable);

  if (value instanceof Promise) {
    return { loading: true, value: undefined };
  } else {
    return { loading: false, value };
  }
}

function useAsyncForceUpdate<Data>(mutable: Async<Data>) {
  const asyncValue = mutable.get();
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    if (!(asyncValue instanceof Promise)) {
      return;
    }
    let cancelled = false;

    function done() {
      if (!cancelled) {
        forceUpdate();
      }
    }

    asyncValue.then(done, done);

    return () => {
      cancelled = true;
    };
  }, [asyncValue, forceUpdate]);

  return asyncValue;
}

export { Async, useAsyncValue };
