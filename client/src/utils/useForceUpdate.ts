import { useReducer } from 'react';

export function useForceUpdate(): () => void {
  return useReducer((state) => !state, true)[1] as () => void;
}
